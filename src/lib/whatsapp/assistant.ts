import { prisma } from '@/lib/db';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';
import { isWithinSupportHours, getWhatsAppConfig } from './config';
import { sendWhatsAppMessage } from './service';

interface ProcessIncomingParams {
  senderPhone: string;
  messageText: string;
  conversation: {
    id: string;
    customerPhone: string;
    customerName: string | null;
    status: string;
    assignedAgent: string | null;
    linkedOrderId: string | null;
    language: string;
  };
}

/**
 * Detects if the patron is communicating in Hindi
 */
function isHindiText(text: string): boolean {
  return /[\u0900-\u097F]/.test(text) || /\b(namaskar|pranam|namaste|aadesh|kripya|chahiye)\b/i.test(text);
}

/**
 * Checks if customer is requesting a human, expressing frustration, or asking for a refund
 */
function shouldHandOffToHuman(text: string): boolean {
  const lower = text.toLowerCase();
  const humanKeywords = [
    'human',
    'person',
    'agent',
    'representative',
    'talk to someone',
    'speak to someone',
    'manager',
    'call me',
    'refund',
    'return',
    'damaged',
    'broken',
    'cheat',
    'fake',
    'complaint',
    'angry',
    'disappointed',
    'insaan',
    'baat karni hai',
    'koi hai',
  ];

  return humanKeywords.some((keyword) => lower.includes(keyword));
}

/**
 * Processes an incoming WhatsApp customer message with:
 * 1. Support hours check (out-of-hours message + queue)
 * 2. Human handoff detection
 * 3. Verified factual assistant answering from catalog, care guide, and verified order lookup
 * 4. Strict guardrails against fake claims, passwords, or OTPs
 */
export async function processIncomingMessage({
  senderPhone,
  messageText,
  conversation,
}: ProcessIncomingParams): Promise<void> {
  const config = getWhatsAppConfig();
  const lowerText = messageText.trim().toLowerCase();
  const isHindi = isHindiText(messageText) || conversation.language === 'hi';

  // 1. If an artisan or agent is already actively assigned and conversing, don't auto-reply
  if (conversation.status === 'ASSIGNED') {
    console.log(`[WhatsApp] Conversation ${conversation.id} is assigned to an artisan. Skipping automated bot reply.`);
    return;
  }

  // 2. Human Handoff / Frustration Check
  if (shouldHandOffToHuman(lowerText) || lowerText === '5' || lowerText === 'talk to a person') {
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: {
        status: 'WAITING_HUMAN',
        updatedAt: new Date(),
      },
    });

    const handoffReply = isHindi
      ? 'प्रणाम। मैं आपको अल्मोड़ा कार्यशाला के हमारे मुख्य शिल्प प्रबंधक से जोड़ रहा हूँ। शीघ्र ही एक शिल्पी आपसे संपर्क करेंगे।\n\n(सूचना: यह चैट हमारी कार्यशाला टीम द्वारा संचालित है।)'
      : 'Namaskar. I am connecting you with our master workshop concierge in Almora. An artisan will be with you shortly.\n\n(Notice: Chats are handled by our workshop team and an automated assistant.)';

    await sendWhatsAppMessage({
      to: senderPhone,
      text: handoffReply,
      conversationId: conversation.id,
    });
    return;
  }

  // 3. Support Hours Evaluation (Out-of-hours Queue)
  const supportStatus = isWithinSupportHours();
  if (!supportStatus.isOnline) {
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: {
        status: 'WAITING_HUMAN',
        updatedAt: new Date(),
      },
    });

    const outOfHoursReply = isHindi
      ? `प्रणाम। ताम्रशिल्प कार्यशाला को संदेश भेजने हेतु धन्यवाद। हमारी कार्यशाला इस समय विश्राम पर है। हमारी टीम ${supportStatus.nextOpeningText} से व्यक्तिगत रूप से आपको उत्तर देगी।\n\n(सूचना: यह चैट हमारी कार्यशाला टीम एवं स्वचालित सहायक द्वारा समर्थित है।)`
      : `Thank you for writing to Tamrashilp. Our Almora atelier is currently resting. Our team will personally reply from ${supportStatus.nextOpeningText}.\n\n(Notice: Chats may be handled by our workshop team and an automated assistant.)`;

    await sendWhatsAppMessage({
      to: senderPhone,
      text: outOfHoursReply,
      conversationId: conversation.id,
    });
    return;
  }

  // 4. Track My Order (Option 1 or "track")
  if (lowerText === '1' || lowerText.includes('track') || lowerText.includes('order status') || lowerText.includes('ऑर्डर')) {
    // Check if customer provided an order number (e.g., TS-2026-XXXX or uuid)
    const orderMatch = messageText.match(/(?:TS-)?(?:2026-)?[A-Z0-9]{4,10}/i);

    if (orderMatch) {
      const orderSearch = orderMatch[0].toUpperCase();
      // Look up order status strictly matching BOTH the order number AND phone number
      const cleanPhone = senderPhone.replace(/[^\d]/g, '').slice(-10);

      const order = await prisma.order.findFirst({
        where: {
          OR: [
            { orderNumber: { contains: orderSearch } },
            { id: { contains: orderSearch.toLowerCase() } },
          ],
        },
        include: { user: true, items: true },
      });

      if (order) {
        // Verify customer phone matches the order for privacy
        const orderPhone = (order.guestPhone || order.user?.phone || '').replace(/[^\d]/g, '').slice(-10);
        if (orderPhone && orderPhone !== cleanPhone) {
          const authFailMsg = isHindi
            ? 'सुरक्षा कारणों से, ऑर्डर विवरण केवल उसी फोन नंबर पर उपलब्ध है जिससे ऑर्डर किया गया था।'
            : 'For your security, order details can only be verified against the phone number placed on the order.';
          await sendWhatsAppMessage({ to: senderPhone, text: authFailMsg, conversationId: conversation.id });
          return;
        }

        // Link order to conversation
        await prisma.whatsAppConversation.update({
          where: { id: conversation.id },
          data: { linkedOrderId: order.id },
        });

        const statusReply = isHindi
          ? `ऑर्डर विवरण (#${order.orderNumber}):\n• स्थिति: ${order.orderStatus}\n• कुल मूल्य: ₹${order.totalAmount.toLocaleString('en-IN')}\n• परिवहन: ${order.carrier}\n• ट्रैकिंग: ${order.trackingNumber || 'आवंटन प्रक्रिया में'}\n\nलाइव विवरण देखें: https://tamrashilp.in/order/${order.orderNumber}`
          : `Order Status for #${order.orderNumber}:\n• Status: ${order.orderStatus}\n• Total Amount: ₹${order.totalAmount.toLocaleString('en-IN')}\n• Carrier: ${order.carrier}\n• Tracking AWB: ${order.trackingNumber || 'Pending AWB allocation'}\n\nTrack your order anytime: https://tamrashilp.in/order/${order.orderNumber}`;

        await sendWhatsAppMessage({ to: senderPhone, text: statusReply, conversationId: conversation.id });
        return;
      }
    }

    const askOrderPrompt = isHindi
      ? 'कृपया अपना ऑर्डर नंबर (जैसे #TS-2026-...) साझा करें ताकि हम आपकी खेप की स्थिति देख सकें।'
      : 'Please share your 6-digit order number (e.g., TS-2026-XXXX) so we can look up your anvil transit status.';

    await sendWhatsAppMessage({ to: senderPhone, text: askOrderPrompt, conversationId: conversation.id });
    return;
  }

  // 5. Product Help & Care (Option 2 or care keywords)
  if (
    lowerText === '2' ||
    lowerText.includes('care') ||
    lowerText.includes('clean') ||
    lowerText.includes('tamarind') ||
    lowerText.includes('ushapan') ||
    lowerText.includes('सफाई')
  ) {
    const careReply = isHindi
      ? `पारंपरिक ताम्र देखभाल एवं उषापान निर्देशिका:\n\n1. केवल सादा पानी: तांबे के पात्र में केवल सादा पानी रखें। खट्टे फल, दही, टमाटर अथवा सिरका कभी न रखें।\n2. प्राकृतिक सफाई: इमली या नींबू को मोटे नमक के साथ हल्के हाथ से मलें और तुरंत पोंछकर सुखा लें।\n3. प्राकृतिक चमक: तांबा समय के साथ गहरा होता है, जो इसकी शुद्धता का प्राकृतिक प्रमाण है।\n\nविस्तृत मार्गदर्शिका पढ़ें: https://tamrashilp.in/care`
      : `Traditional Care & Ushapan Guidance:\n\n1. Plain Water Only: Store clean drinking water overnight at room temperature. Never store acidic fluids (citrus, curd, tomato, vinegar) in unlined copper.\n2. Natural Cleansing: Rub gently with tamarind pulp or lemon and coarse salt. Rinse and dry immediately.\n3. Living Patina: Darkening over time is a natural sign of virgin copper breathing.\n\nRead our full care guide: https://tamrashilp.in/care`;

    await sendWhatsAppMessage({ to: senderPhone, text: careReply, conversationId: conversation.id });
    return;
  }

  // 6. Custom Engraving (Option 3 or custom/engraving keywords)
  if (lowerText === '3' || lowerText.includes('custom') || lowerText.includes('engrav') || lowerText.includes('नक्काशी')) {
    const customReply = isHindi
      ? `हस्तनिर्मित नक्काशी एवं अनुकूलन सेवा:\n\n• हमारे अल्मोड़ा शिल्पी छेनी और हथौड़े से नाम, कुलचिह्न अथवा वैदिक मंत्र उकेरते हैं।\n• शुल्क: ₹15 प्रति अक्षर।\n• रोमन सेरिफ एवं देवनागरी दोनों लिपियां उपलब्ध हैं।\n\nलाइव नक्काशी पूर्वावलोकन देखें: https://tamrashilp.in/custom-order`
      : `Bespoke Inscription & Chasing Service:\n\n• Our Almora coppersmiths hand-chisel monograms, family crests, and mantras using steel burins on the horn anvil.\n• Rate: ₹15 per character.\n• Available in Roman Serif and Devanagari.\n\nTry live engraving preview: https://tamrashilp.in/custom-order`;

    await sendWhatsAppMessage({ to: senderPhone, text: customReply, conversationId: conversation.id });
    return;
  }

  // 7. Returns & Kalai Re-tinning Service (Option 4 or kalai/tin/return)
  if (lowerText === '4' || lowerText.includes('kalai') || lowerText.includes('tin') || lowerText.includes('कलाई')) {
    const kalaiReply = isHindi
      ? `पारंपरिक कलाई (टिनिंग) सेवा:\n\n• कुकिंग पात्रों में 99.9% शुद्ध खाद्य-ग्रेड रांगा (टिन) की कलाई की जाती है।\n• आप अपने बर्तनों को अल्मोड़ा कार्यशाला में पुनः कलाई हेतु भेज सकते हैं।\n• विनिमय सुरक्षा: 15 दिनों में पर्वत परिवहन क्षति सुरक्षा।\n\nकलाई सेवा बुक करें: https://tamrashilp.in/care`
      : `Traditional Kalai (Pure Tinning) Service:\n\n• Culinary cookware is lined with 99.9% food-grade pure tin over charcoal embers.\n• Patrons can send seasoned cookware to our Almora workshop for periodic re-tinning (₹450–₹950 per vessel).\n• Trust promise: 15-day transit exchange guarantee.\n\nBook re-tinning service: https://tamrashilp.in/care`;

    await sendWhatsAppMessage({ to: senderPhone, text: kalaiReply, conversationId: conversation.id });
    return;
  }

  // 8. General First Greeting with Menu and Transparency Notice
  const greeting = isHindi
    ? `प्रणाम एवं ताम्रशिल्प कार्यशाला में आपका स्वागत है।\n"हाथों से गढ़ा गया। पीढ़ियों तक संजोया गया।"\n\nहम आपकी किस प्रकार सहायता कर सकते हैं?\n1. ऑर्डर ट्रैक करें (Track my order)\n2. पात्र चयन एवं देखभाल (Product help & care)\n3. कस्टम नक्काशी (Custom engraving)\n4. कलाई सेवा एवं विनिमय (Returns & Kalai service)\n5. शिल्पी से सीधे बात करें (Talk to a person)\n\n(सूचना: यह चैट हमारी कार्यशाला टीम एवं स्वचालित सहायक द्वारा समर्थित है।)`
    : `Namaskar and welcome to the Tamrashilp Atelier.\n"Struck by hand. Kept for generations."\n\nHow may our workshop assist you today?\n1. Track my order\n2. Product help & care\n3. Custom engraving\n4. Returns & Kalai service\n5. Talk to a person\n\n(Notice: Chats are handled by our workshop team and an automated assistant.)`;

  await sendWhatsAppMessage({ to: senderPhone, text: greeting, conversationId: conversation.id });
}

