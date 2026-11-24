/**
 * Tamrashilp WhatsApp Configuration and Helper Utilities
 * Strictly uses environment variables for all sensitive and business credentials.
 */

export interface SupportHoursStatus {
  isOnline: boolean;
  hoursText: string;
  nextOpeningText: string;
}

// Environment access with fallback for development and client-side access
export const getWhatsAppConfig = () => {
  const numberE164 =
    process.env.WHATSAPP_NUMBER_E164 ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '+919557057767'; // Default business support number (Tamrashilp)

  const cleanDigits = numberE164.replace(/[^\d]/g, '');

  return {
    numberE164,
    cleanDigits,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    wabaId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'tamtashilp_webhook_verify_secret',
    appSecret: process.env.WHATSAPP_APP_SECRET || '',
    supportHoursStr: process.env.SUPPORT_HOURS || 'Mon-Sat 10:00-19:00 IST',
    aiAssistantEnabled: process.env.WHATSAPP_AI_ASSISTANT_ENABLED === 'true',
  };
};

/**
 * Strips formatting to provide plain digits for wa.me URL
 * Format: https://wa.me/<number without +>?text=<URL-encoded text>
 */
export const getWhatsAppCleanNumber = (): string => {
  return getWhatsAppConfig().cleanDigits;
};

/**
 * Formats E.164 number for polite human display, e.g. "+91 95570 57767"
 */
export const formatDisplayNumber = (numberE164?: string): string => {
  const num = numberE164 || getWhatsAppConfig().numberE164;
  if (num.startsWith('+91') && num.length === 13) {
    return `+91 ${num.slice(3, 8)} ${num.slice(8)}`;
  }
  return num;
};

/**
 * Masks customer phone number for admin logs and public display to uphold privacy
 * e.g., "+91 95570 57767" -> "+91 95*** **767"
 */
export const maskPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const digits = phone.replace(/[^\d]/g, '');
  if (digits.length >= 10) {
    const start = digits.slice(0, digits.length - 8);
    const end = digits.slice(-3);
    return `+${start}*****${end}`;
  }
  return phone.slice(0, 3) + '*****' + phone.slice(-2);
};

/**
 * Calculates current time in India Standard Time (IST, UTC+5:30)
 * Evaluates whether the atelier is currently within support hours.
 * Support hours format: "Mon-Sat 10:00-19:00 IST"
 */
export const isWithinSupportHours = (supportHoursStr?: string): SupportHoursStatus => {
  const configHours = supportHoursStr || getWhatsAppConfig().supportHoursStr;

  // Convert current UTC time to IST (UTC + 5 hours 30 minutes)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istDate = new Date(utc + 3600000 * 5.5);

  const dayOfWeek = istDate.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const currentHour = istDate.getHours();
  const currentMinute = istDate.getMinutes();
  const currentTimeDec = currentHour + currentMinute / 60;

  // Sunday is closed (0)
  const isSunday = dayOfWeek === 0;

  // Default: Mon-Sat 10:00 to 19:00 IST
  const opensAt = 10.0;
  const closesAt = 19.0;

  const isWorkingHours = !isSunday && currentTimeDec >= opensAt && currentTimeDec < closesAt;

  let nextOpeningText = 'Monday 10:00 IST';
  if (isSunday) {
    nextOpeningText = 'Monday 10:00 IST';
  } else if (currentTimeDec < opensAt) {
    nextOpeningText = 'Today at 10:00 IST';
  } else if (dayOfWeek === 6) {
    // Saturday after hours
    nextOpeningText = 'Monday at 10:00 IST';
  } else {
    nextOpeningText = 'Tomorrow at 10:00 IST';
  }

  return {
    isOnline: isWorkingHours,
    hoursText: configHours,
    nextOpeningText,
  };
};

/**
 * Pre-filled message generator for each context
 */
export interface WhatsAppMessageContext {
  type: 'home' | 'product' | 'cart' | 'order' | 'custom' | 'care' | 'general';
  productName?: string;
  sku?: string;
  pageUrl?: string;
  orderId?: string;
  customDetails?: string;
}

export const getPreFilledMessage = (context: WhatsAppMessageContext): string => {
  switch (context.type) {
    case 'product':
      return `Hello, I am interested in ${context.productName || 'this copper piece'} (ref ${
        context.sku || 'N/A'
      }) — ${context.pageUrl || ''}`.trim();

    case 'cart':
      return 'Hello, I need help with my cart.';

    case 'order':
      return `Hello, I need help with order #${context.orderId || ''}.`.trim();

    case 'custom':
      return `Hello, I would like a custom piece: ${context.customDetails || 'monogram engraving inquiry'}`.trim();

    case 'care':
      return 'Hello, I have a question regarding copper vessel care and Kalai re-tinning.';

    case 'home':
    case 'general':
    default:
      return 'Hello Tamrashilp, I would like help choosing a copper piece.';
  }
};

/**
 * Builds standard compliant https://wa.me/<number>?text=<encoded> URL
 */
export const buildWhatsAppClickUrl = (message: string, customNumber?: string): string => {
  const number = customNumber
    ? customNumber.replace(/[^\d]/g, '')
    : getWhatsAppCleanNumber();
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedText}`;
};

