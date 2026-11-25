/**
 * Tamrashilp Site Settings
 * Centralized, editable site configuration.
 * Allows the artisan name, lineage, announcement bar, and feature flags to be modified
 * without code changes or hard-coding.
 */

export interface SiteSettings {
  artisan_name: string;
  artisan_name_hi: string;
  artisan_lineage: string;
  artisan_lineage_hi: string;
  artisan_region: string;
  artisan_region_hi: string;
  artisan_workshop: string;
  artisan_workshop_hi: string;
  has_photo_consent: boolean;
  photo_credit: string;
  photo_url: string;
  free_shipping_threshold: number;
  announcement_text_en: string;
  announcement_text_hi: string;
  announcement_enabled: boolean;
  enable_multi_seller: boolean;
  kalai_base_price: number;
  engraving_char_price: number;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  artisan_name: 'Devendra Kumar Tamta',
  artisan_name_hi: 'देवेन्द्र कुमार टम्टा',
  artisan_lineage: 'Tamta coppersmith lineage',
  artisan_lineage_hi: 'टम्टा ताम्रशिल्प वंश परंपरा',
  artisan_region: 'Uttarakhand',
  artisan_region_hi: 'उत्तराखण्ड',
  artisan_workshop: 'Shree Tamreshwar Atelier, Tamta Mohalla, Almora',
  artisan_workshop_hi: 'श्री ताम्रेश्वर शिल्प कार्यशाला, टम्टा मोहल्ला, अल्मोड़ा',
  has_photo_consent: true,
  photo_credit: 'Studio archival portrait of Devendra Kumar Tamta, Almora atelier',
  photo_url: '/images/devendra-kumar-tamta.jpg',
  free_shipping_threshold: 1999,
  announcement_text_en: 'Complimentary Insured Delivery Across India on Orders Above ₹1,999 | Handcrafted in Uttarakhand',
  announcement_text_hi: '₹1,999 से अधिक के ऑर्डर पर पूरे भारत में बीमित डिलीवरी | उत्तराखण्ड में हस्तनिर्मित',
  announcement_enabled: true,
  enable_multi_seller: false,
  kalai_base_price: 450,
  engraving_char_price: 15,
};

const STORAGE_KEY = 'tamtashilp_site_settings';

export const getSiteSettings = (): SiteSettings => {
  if (typeof window === 'undefined') {
    return DEFAULT_SITE_SETTINGS;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to parse site settings from localStorage', e);
  }
  return DEFAULT_SITE_SETTINGS;
};

export const saveSiteSettings = (settings: Partial<SiteSettings>): SiteSettings => {
  if (typeof window === 'undefined') return DEFAULT_SITE_SETTINGS;
  const current = getSiteSettings();
  const updated = { ...current, ...settings };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('tamtashilp:settings_updated'));
  } catch (e) {
    console.error('Failed to save site settings', e);
  }
  return updated;
};

export const formatArtisanProvenance = (settings?: SiteSettings, lang: 'en' | 'hi' = 'en'): string => {
  const s = settings || DEFAULT_SITE_SETTINGS;
  if (lang === 'hi') {
    return `हस्तनिर्मित: ${s.artisan_name_hi}, ${s.artisan_lineage_hi}, ${s.artisan_region_hi}`;
  }
  return `Handcrafted by ${s.artisan_name}, ${s.artisan_lineage}, ${s.artisan_region}.`;
};

