import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getWhatsAppConfig } from '@/lib/whatsapp/config';
import { verifyMetaSignature, sendWhatsAppMessage } from '@/lib/whatsapp/service';
import { processIncomingMessage } from '@/lib/whatsapp/assistant';

/**
 * GET /api/whatsapp/webhook
 * Meta Webhook Verification Challenge
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const config = getWhatsAppConfig();

  if (mode === 'subscribe' && token === config.verifyToken) {
    console.log('[WhatsApp Webhook] Challenge verified successfully');
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  console.warn('[WhatsApp Webhook] Verification failed. Token mismatch.');
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

/**
 * POST /api/whatsapp/webhook
 * Receives incoming messages and message delivery statuses from Meta Cloud API
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // 1. Verify Meta HMAC-SHA256 Signature
    const isValidSignature = verifyMetaSignature(rawBody, signature);
    if (!isValidSignature) {
      console.warn('[WhatsApp Webhook] Invalid X-Hub-Signature-256 signature rejected.');
      return NextResponse.json({ error: 'Unauthorized signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Meta Webhook structure: entry[].changes[].value
    if (payload?.object !== 'whatsapp_business_account' || !payload.entry) {
      return NextResponse.json({ received: true });
    }

    for (const entry of payload.entry) {
      for (const change of entry.changes || []) {
        if (change.field !== 'messages') continue;
        const value = change.value;

        // A. Handle Status Updates (sent, delivered, read, failed)
        if (value.statuses && Array.isArray(value.statuses)) {
          for (const statusObj of value.statuses) {
            const waMessageId = statusObj.id;
            const status = statusObj.status?.toUpperCase(); // DELIVERED, READ, FAILED, SENT
            const recipientId = statusObj.recipient_id;

            try {
              await prisma.whatsAppMessage.updateMany({
                where: { waMessageId },
                data: {
                  status,
                  errorMessage: statusObj.errors?.[0]?.message || null,
                },
              });
            } catch (err) {
              console.error('[WhatsApp Status Update Error]', err);
            }
          }
        }

        // B. Handle Inbound Customer Messages
        if (value.messages && Array.isArray(value.messages)) {
          for (const msg of value.messages) {
            const senderPhone = msg.from; // e.g. "919876543210"
            const waMessageId = msg.id;
            const messageType = msg.type; // text, button, interactive

            let messageBody = '';
            if (messageType === 'text') {
              messageBody = msg.text?.body || '';
            } else if (messageType === 'button') {
              messageBody = msg.button?.text || msg.button?.payload || '';
            } else if (messageType === 'interactive') {
              messageBody =
                msg.interactive?.button_reply?.title ||
                msg.interactive?.list_reply?.title ||
                msg.interactive?.button_reply?.id ||
                '';
            }

            // Find or create conversation
            let conversation = await prisma.whatsAppConversation.findUnique({
              where: { customerPhone: senderPhone },
            });

            if (!conversation) {
              const customerProfile = value.contacts?.[0]?.profile?.name || null;
              conversation = await prisma.whatsAppConversation.create({
                data: {
                  customerPhone: senderPhone,
                  customerName: customerProfile,
                  lastCustomerMessageAt: new Date(),
                  status: 'OPEN',
                },
              });
            } else {
              conversation = await prisma.whatsAppConversation.update({
                where: { id: conversation.id },
                data: {
                  lastCustomerMessageAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            }

            // Save inbound message
            await prisma.whatsAppMessage.create({
              data: {
                conversationId: conversation.id,
                direction: 'INBOUND',
                messageType: messageType.toUpperCase(),
                body: messageBody,
                waMessageId,
                status: 'DELIVERED',
                rawPayload: JSON.stringify(msg),
              },
            });

            // Handle Opt-Out keywords: STOP, UNSUBSCRIBE, CANCEL
            const trimmedUpper = messageBody.trim().toUpperCase();
            if (
              trimmedUpper === 'STOP' ||
              trimmedUpper === 'UNSUBSCRIBE' ||
              trimmedUpper === 'CANCEL' ||
              trimmedUpper === 'बंद करें'
            ) {
              await prisma.whatsAppConversation.update({
                where: { id: conversation.id },
                data: {
                  optedIn: false,
                  optOutAt: new Date(),
                },
              });

              // Update any matching user or order
              await prisma.user.updateMany({
                where: { phone: { contains: senderPhone.slice(-10) } },
                data: { whatsappOptIn: false },
              });

              await prisma.order.updateMany({
                where: { guestPhone: { contains: senderPhone.slice(-10) } },
                data: { whatsappOptIn: false },
              });

              // Acknowledge opt-out
              await sendWhatsAppMessage({
                to: senderPhone,
                text: 'You have unsubscribed from Tamrashilp WhatsApp updates. You will not receive further alerts. Reply START or visit your account profile anytime to re-enable.',
                conversationId: conversation.id,
              });

              continue;
            }

            // Handle Opt-In / Re-subscribe
            if (trimmedUpper === 'START' || trimmedUpper === 'SUBSCRIBE' || trimmedUpper === 'शुरू करें') {
              await prisma.whatsAppConversation.update({
                where: { id: conversation.id },
                data: {
                  optedIn: true,
                  optedInAt: new Date(),
                },
              });

              await sendWhatsAppMessage({
                to: senderPhone,
                text: 'Welcome back to Tamrashilp! Your WhatsApp order updates and artisan alerts are now active.',
                conversationId: conversation.id,
              });

              continue;
            }

            // Delegate to Assistant / Human Queue Processor
            await processIncomingMessage({
              senderPhone,
              messageText: messageBody,
              conversation,
            });
          }
        }
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('[WhatsApp Webhook POST Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

