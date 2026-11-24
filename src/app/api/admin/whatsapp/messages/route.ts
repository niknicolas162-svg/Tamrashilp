import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendWhatsAppMessage } from '@/lib/whatsapp/service';

/**
 * POST /api/admin/whatsapp/messages
 * Sends an agent reply or approved Meta template to the customer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, text, templateName, templateParameters, productSlug, orderId } = body;

    if (!conversationId) {
      return NextResponse.json({ error: 'conversationId is required' }, { status: 400 });
    }

    const conversation = await prisma.whatsAppConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    let messageToSend = text;

    // Attach product card or payment link if requested
    if (productSlug) {
      messageToSend = `${messageToSend ? messageToSend + '\n\n' : ''}Craft Vessel Recommendation: https://tamtashilp.in/product/${productSlug}`;
    }
    if (orderId) {
      messageToSend = `${messageToSend ? messageToSend + '\n\n' : ''}Order & Settlement Folio: https://tamtashilp.in/order/${orderId}`;
    }

    const result = await sendWhatsAppMessage({
      to: conversation.customerPhone,
      text: messageToSend,
      templateName,
      templateParameters,
      conversationId: conversation.id,
      linkedOrderId: conversation.linkedOrderId || undefined,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    // Update conversation state to ASSIGNED / in progress
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: {
        status: conversation.status === 'WAITING_HUMAN' ? 'ASSIGNED' : conversation.status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error: any) {
    console.error('[Admin WhatsApp Message Send Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

