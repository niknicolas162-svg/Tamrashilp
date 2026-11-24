import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { getWhatsAppConfig } from './config';

/**
 * Message Templates definitions (prepared for Meta review & approval)
 */
export interface WhatsAppTemplate {
  name: string;
  category: 'UTILITY' | 'MARKETING';
  languages: ('en' | 'hi')[];
  description: string;
  bodyEn: string;
  bodyHi: string;
}

export const META_WHATSAPP_TEMPLATES: Record<string, WhatsAppTemplate> = {
  order_confirmed: {
    name: 'order_confirmed',
    category: 'UTILITY',
    languages: ['en', 'hi'],
    description: 'Sent immediately when an order is confirmed and scheduled for anvil forging or dispatch.',
    bodyEn:
      'Namaskar {{1}}, your Tamrashilp order #{{2}} for {{3}} has been confirmed. Our Almora coppersmith workshop has commenced inspection and packing. Track anytime: {{4}}',
    bodyHi:
      'प्रणाम {{1}}, ताम्रशिल्प पर आपका ऑर्डर #{{2}} (मूल्य {{3}}) स्वीकार कर लिया गया है। अल्मोड़ा कार्यशाला में आपके पात्र की जांच व सुरक्षित पैकिंग प्रारंभ हो चुकी है। ऑर्डर देखें: {{4}}',
  },
  order_shipped: {
    name: 'order_shipped',
    category: 'UTILITY',
    languages: ['en', 'hi'],
    description: 'Triggered when the courier collects the insured shipment from Almora.',
    bodyEn:
      'Namaskar {{1}}, your handcrafted copper heirloom (Order #{{2}}) is in insured transit via {{3}}. Tracking Airway Bill: {{4}}. Follow transit: {{5}}',
    bodyHi:
      'प्रणाम {{1}}, आपका हस्तनिर्मित ताम्रपात्र (ऑर्डर #{{2}}) {{3}} द्वारा बीमित परिवहन में प्रस्थान कर चुका है। ट्रैकिंग संख्या: {{4}}। लाइव स्थिति देखें: {{5}}',
  },
  out_for_delivery: {
    name: 'out_for_delivery',
    category: 'UTILITY',
    languages: ['en', 'hi'],
    description: 'Triggered on the day of delivery.',
    bodyEn:
      'Namaskar {{1}}, your Tamrashilp vessel from order #{{2}} is out for delivery today. Please inspect the seal upon handover.',
    bodyHi:
      'प्रणाम {{1}}, ऑर्डर #{{2}} का आपका टम्टा ताम्रपात्र आज आपके पते पर वितरित किया जा रहा है। कृपया डिलीवरी के समय सुरक्षा सील की जांच अवश्य करें।',
  },
  delivered: {
    name: 'delivered',
    category: 'UTILITY',
    languages: ['en', 'hi'],
    description: 'Sent after successful delivery with traditional care instructions and review request.',
    bodyEn:
      'Namaskar {{1}}, your handcrafted copper piece from order #{{2}} has been delivered. May it grace your hearth for generations. Read our care guide or share your appraisal: {{3}}',
    bodyHi:
      'प्रणाम {{1}}, ऑर्डर #{{2}} का आपका शुद्ध ताम्रपात्र सफलतापूर्वक पहुंच चुका है। यह आपके घर में पीढ़ियों तक बना रहे। देखभाल निर्देश पढ़ें अथवा अपनी समीक्षा साझा करें: {{3}}',
  },
  payment_failed: {
    name: 'payment_failed',
    category: 'UTILITY',
    languages: ['en', 'hi'],
    description: 'Alerts patron if bank gateway fails during settlement.',
    bodyEn:
      'Namaskar {{1}}, we noticed your payment for Tamrashilp order #{{2}} could not be completed. Your handcrafted pieces are reserved for 2 hours. Retry safely: {{3}}',
    bodyHi:
      'प्रणाम {{1}}, ऑर्डर #{{2}} का भुगतान पूरा नहीं हो सका। आपके चुने हुए पात्र 2 घंटे के लिए सुरक्षित हैं। पुनः प्रयास करें: {{3}}',
  },
  back_in_stock: {
    name: 'back_in_stock',
    category: 'UTILITY',
    languages: ['en', 'hi'],
    description: 'Sent when a previously out-of-stock item finishes annealing and enters inventory.',
    bodyEn:
      'Namaskar {{1}}, {{2}} is back in stock at our Almora atelier following its recent anvil annealing. View collection: {{3}}',
    bodyHi:
      'प्रणाम {{1}}, अल्मोड़ा कार्यशाला में निहाई पर तैयार होने के पश्चात {{2}} पुनः उपलब्ध है। संग्रह देखें: {{3}}',
  },
  custom_order_quote_ready: {
    name: 'custom_order_quote_ready',
    category: 'UTILITY',
    languages: ['en', 'hi'],
    description: 'Sent when the master artisan completes the bespoke quote and sketch appraisal.',
    bodyEn:
      'Namaskar {{1}}, our lead artisan has prepared the appraisal and forging timeline for your custom commission (Ref: {{2}}). Review quote: {{3}}',
    bodyHi:
      'प्रणाम {{1}}, आपके कस्टम ऑर्डर (संदर्भ: {{2}}) के लिए शिल्प विवरण एवं अनुमानित लागत तैयार है। विवरण देखें: {{3}}',
  },
  abandoned_cart: {
    name: 'abandoned_cart',
    category: 'MARKETING',
    languages: ['en', 'hi'],
    description: 'Maximum one gentle reminder for opted-in patrons with items left in their cart.',
    bodyEn:
      'Namaskar {{1}}, you left {{2}} in your Tamrashilp collection. Would you like assistance from our coppersmith atelier? Return to cart: {{3}} (Reply STOP to unsubscribe)',
    bodyHi:
      'प्रणाम {{1}}, आपकी ताम्रशिल्प कार्ट में {{2}} सुरक्षित है। क्या आप शिल्प परामर्श चाहते हैं? कार्ट देखें: {{3}} (अलर्ट बंद करने हेतु STOP लिखें)',
  },
};

/**
 * Verifies X-Hub-Signature-256 header using HMAC-SHA256
 */
export function verifyMetaSignature(rawBody: string, signatureHeader: string | null): boolean {
  const { appSecret } = getWhatsAppConfig();
  if (!appSecret) {
    // In local dev without secret configured, log warning but allow request
    if (process.env.NODE_ENV !== 'production') {
      console.warn('WHATSAPP_APP_SECRET not set; skipping HMAC verification in dev mode.');
      return true;
    }
    return false;
  }

  if (!signatureHeader) return false;

  const parts = signatureHeader.split('=');
  if (parts.length !== 2 || parts[0] !== 'sha256') {
    return false;
  }

  const expectedSignature = parts[1];
  const computedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf-8'),
    Buffer.from(computedSignature, 'utf-8')
  );
}

/**
 * Checks whether an outbound message is within Meta's 24-hour customer service window.
 * Free-form replies are allowed ONLY within 24 hours of customer's last inbound message.
 * Outside 24h, an approved template is strictly required.
 */
export async function checkCustomerServiceWindow(
  customerPhone: string
): Promise<{ isWithinWindow: boolean; hoursRemaining: number }> {
  try {
    const cleanPhone = customerPhone.replace(/[^\d]/g, '');
    const conversation = await prisma.whatsAppConversation.findFirst({
      where: {
        customerPhone: {
          contains: cleanPhone.slice(-10),
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    if (!conversation || !conversation.lastCustomerMessageAt) {
      return { isWithinWindow: false, hoursRemaining: 0 };
    }

    const elapsedMs = Date.now() - new Date(conversation.lastCustomerMessageAt).getTime();
    const elapsedHours = elapsedMs / (1000 * 60 * 60);

    const isWithinWindow = elapsedHours <= 24.0;
    const hoursRemaining = Math.max(0, 24.0 - elapsedHours);

    return { isWithinWindow, hoursRemaining };
  } catch (err) {
    console.error('Error checking 24h window:', err);
    return { isWithinWindow: false, hoursRemaining: 0 };
  }
}

/**
 * Parameters for sending WhatsApp messages
 */
export interface SendWhatsAppParams {
  to: string; // recipient phone e.g. "+919876543210" or "919876543210"
  text?: string; // free-form text (allowed within 24h window)
  templateName?: string; // approved template name
  templateLanguage?: 'en' | 'hi';
  templateParameters?: string[]; // strings to substitute for {{1}}, {{2}}...
  conversationId?: string;
  linkedOrderId?: string;
}

/**
 * Sends a WhatsApp message via Meta Cloud API with:
 * - 24-hour customer service window enforcement
 * - Exponential backoff retry logic (up to 3 attempts)
 * - Message persistence in database
 */
export async function sendWhatsAppMessage(params: SendWhatsAppParams): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
  isMock?: boolean;
}> {
  const config = getWhatsAppConfig();
  const cleanTo = params.to.replace(/[^\d]/g, '');

  // 1. Enforce 24-Hour Customer Service Window Rule
  if (params.text && !params.templateName) {
    const { isWithinWindow, hoursRemaining } = await checkCustomerServiceWindow(cleanTo);
    if (!isWithinWindow) {
      const errMsg =
        'Meta Policy Violation: Free-form messages are forbidden outside the 24-hour customer service window. An approved template message is required.';
      console.warn(`[WhatsApp API Guard] ${errMsg} Recipient: ${cleanTo}`);
      return {
        success: false,
        error: errMsg,
      };
    }
  }

  // 2. Prepare payload
  let payload: Record<string, unknown> = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: cleanTo,
  };

  if (params.templateName) {
    const templateDef = META_WHATSAPP_TEMPLATES[params.templateName];
    const lang = params.templateLanguage || 'en';

    const components = [];
    if (params.templateParameters && params.templateParameters.length > 0) {
      components.push({
        type: 'body',
        parameters: params.templateParameters.map((param) => ({
          type: 'text',
          text: String(param),
        })),
      });
    }

    payload.type = 'template';
    payload.template = {
      name: params.templateName,
      language: {
        code: lang === 'hi' ? 'hi' : 'en_US',
      },
      components,
    };
  } else if (params.text) {
    payload.type = 'text';
    payload.text = {
      preview_url: true,
      body: params.text,
    };
  }

  // 3. Mock send in development if credentials are not filled yet
  if (!config.accessToken || !config.phoneNumberId) {
    console.log(
      `[WhatsApp Cloud API Mock Send] To: +${cleanTo} Type: ${payload.type} Content:`,
      JSON.stringify(payload, null, 2)
    );

    const mockMessageId = `wamid.MOCK_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Store in DB for audit & UI testing
    await recordOutboundMessage({
      customerPhone: cleanTo,
      body: params.text || `[Template: ${params.templateName}]`,
      templateName: params.templateName,
      waMessageId: mockMessageId,
      conversationId: params.conversationId,
      linkedOrderId: params.linkedOrderId,
    });

    return {
      success: true,
      messageId: mockMessageId,
      isMock: true,
    };
  }

  // 4. Live dispatch with exponential backoff (1s, 2s, 4s)
  const maxRetries = 3;
  let attempt = 0;
  let lastError = '';

  while (attempt < maxRetries) {
    try {
      const url = `https://graph.facebook.com/v21.0/${config.phoneNumberId}/messages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || `HTTP ${response.status}`);
      }

      const waMessageId = data?.messages?.[0]?.id;

      await recordOutboundMessage({
        customerPhone: cleanTo,
        body: params.text || `[Template: ${params.templateName}]`,
        templateName: params.templateName,
        waMessageId,
        conversationId: params.conversationId,
        linkedOrderId: params.linkedOrderId,
      });

      return {
        success: true,
        messageId: waMessageId,
      };
    } catch (err: unknown) {
      attempt++;
      lastError = err instanceof Error ? err.message : String(err);
      console.error(`WhatsApp send attempt ${attempt} failed:`, lastError);

      if (attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  return {
    success: false,
    error: `Failed after ${maxRetries} attempts: ${lastError}`,
  };
}

/**
 * Persists outbound message to Prisma
 */
async function recordOutboundMessage({
  customerPhone,
  body,
  templateName,
  waMessageId,
  conversationId,
  linkedOrderId,
}: {
  customerPhone: string;
  body: string;
  templateName?: string;
  waMessageId?: string;
  conversationId?: string;
  linkedOrderId?: string;
}) {
  try {
    let convId = conversationId;
    if (!convId) {
      let conv = await prisma.whatsAppConversation.findFirst({
        where: { customerPhone },
      });
      if (!conv) {
        conv = await prisma.whatsAppConversation.create({
          data: {
            customerPhone,
            linkedOrderId,
            status: 'OPEN',
          },
        });
      }
      convId = conv.id;
    }

    await prisma.whatsAppMessage.create({
      data: {
        conversationId: convId,
        direction: 'OUTBOUND',
        messageType: templateName ? 'TEMPLATE' : 'TEXT',
        body,
        templateName,
        waMessageId,
        status: 'SENT',
      },
    });

    await prisma.whatsAppConversation.update({
      where: { id: convId },
      data: { updatedAt: new Date() },
    });
  } catch (dbErr) {
    console.error('Failed to record outbound WhatsApp message:', dbErr);
  }
}

/**
 * Dispatches an automated WhatsApp order status alert
 * Checks if the customer opted-in before sending.
 */
export async function sendOrderWhatsAppAlert({
  orderNumber,
  event,
  trackingNumber,
  carrier,
}: {
  orderNumber: string;
  event: 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'payment_failed';
  trackingNumber?: string;
  carrier?: string;
}): Promise<{ sent: boolean; reason?: string }> {
  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { user: true },
    });

    if (!order) {
      return { sent: false, reason: 'Order not found' };
    }

    // Strict Opt-in verification: Never message without explicit consent
    const isOptedIn = order.whatsappOptIn || order.user?.whatsappOptIn;
    if (!isOptedIn) {
      return { sent: false, reason: 'Customer has not opted into WhatsApp alerts' };
    }

    const phone = order.guestPhone || order.user?.phone;
    if (!phone) {
      return { sent: false, reason: 'No phone number available on order' };
    }

    const customerName = order.user?.name || 'Patron';
    const totalFormatted = `₹${order.totalAmount.toLocaleString('en-IN')}`;
    const orderUrl = `https://tamtashilp.in/order/${order.orderNumber}`;

    let templateName = 'order_confirmed';
    let params: string[] = [];

    switch (event) {
      case 'confirmed':
        templateName = 'order_confirmed';
        params = [customerName, order.orderNumber, totalFormatted, orderUrl];
        break;

      case 'shipped':
        templateName = 'order_shipped';
        params = [
          customerName,
          order.orderNumber,
          carrier || 'Shiprocket (BlueDart Express)',
          trackingNumber || 'Pending AWB',
          orderUrl,
        ];
        break;

      case 'out_for_delivery':
        templateName = 'out_for_delivery';
        params = [customerName, order.orderNumber];
        break;

      case 'delivered':
        templateName = 'delivered';
        params = [customerName, order.orderNumber, `https://tamtashilp.in/order/${order.orderNumber}#review`];
        break;

      case 'payment_failed':
        templateName = 'payment_failed';
        params = [customerName, order.orderNumber, `https://tamtashilp.in/checkout?retry=${order.orderNumber}`];
        break;
    }

    const result = await sendWhatsAppMessage({
      to: phone,
      templateName,
      templateParameters: params,
      linkedOrderId: order.id,
    });

    return { sent: result.success, reason: result.error };
  } catch (err) {
    console.error('Error in sendOrderWhatsAppAlert:', err);
    return { sent: false, reason: String(err) };
  }
}

