export interface OccasionCollection {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  image: string;
  curatedCategorySlugs: string[];
  suggestedBlessing: string;
  suggestedBlessingHi: string;
}

export const OCCASION_COLLECTIONS: OccasionCollection[] = [
  {
    id: 'griha-pravesh',
    slug: 'griha-pravesh',
    name: 'Griha Pravesh (Housewarming)',
    nameHi: 'गृह प्रवेश एवं नवीन गृह प्रतिष्ठा',
    tagline: 'Blessings of abundance for the new hearth.',
    taglineHi: 'नवीन गृह के लिए समृद्धि एवं आरोग्यता का आशीष।',
    description: 'In Kumaoni tradition, pure copper is the first metal to cross the threshold. Hand-beaten water vessels and ceremonial kalash usher in vitality and purity.',
    descriptionHi: 'कुमाऊंनी परंपरा में तांबा गृह प्रवेश की पहली धातु है। यह घर में आरोग्य, पवित्रता और पीढ़ियों का सुख लेकर आता है।',
    image: '/images/tamta/product-03.jpg',
    curatedCategorySlugs: ['water-bottles-jugs', 'pooja-items', 'lotas-glasses'],
    suggestedBlessing: 'सदा गृहं कल्याणयुक्तं भवतु — May this home forever brim with peace and vitality.',
    suggestedBlessingHi: 'सदा गृहं कल्याणयुक्तं भवतु — आपके नवीन गृह में सुख-समृद्धि का वास हो।',
  },
  {
    id: 'wedding',
    slug: 'wedding',
    name: 'Wedding & Heirloom Trousseau',
    nameHi: 'विवाह एवं कुल परंपरा उपहार',
    tagline: 'Gifts of metal designed to outlive the century.',
    taglineHi: 'एक शताब्दी से अधिक समय तक चलने वाले विवाह उपहार।',
    description: 'Generational heirloom sets for the bridal hearth: heavy pure tin-lined culinary kadhais, serving platters, and engraved water carafes.',
    descriptionHi: 'विवाह की थाली और रसोई के लिए भारी कलाई (टिनिंग) युक्त कड़ाही, हांडी और सुंदर जल सुराही का पावन उपहार।',
    image: '/images/tamta/intro-04.jpg',
    curatedCategorySlugs: ['cookware', 'serveware', 'gift-sets'],
    suggestedBlessing: 'अक्षत जीवनं दीर्घा प्रतिष्ठा — May your bond endure like hand-forged copper.',
    suggestedBlessingHi: 'अक्षत जीवनं दीर्घा प्रतिष्ठा — दांपत्य जीवन तांबे की भांति अविनाशी रहे।',
  },
  {
    id: 'pooja',
    slug: 'pooja',
    name: 'Pooja & Spiritual Sanctum',
    nameHi: 'पूजा एवं देव-मंदिर प्रतिष्ठान',
    tagline: 'Pure non-magnetic copper for Vedic invocations.',
    taglineHi: 'वैदिक अनुष्ठानों के लिए शुद्ध, चुंबकीयता-रहित ताम्रपात्र।',
    description: 'Masterfully chiseled with lotus petals and mountain suns. Every kalash and aarti lamp is raised over iron stakes without modern chemical coatings.',
    descriptionHi: 'कमल पंखुड़ियों और सूर्य चिह्नों से नक्काशीदार कलश और दीप। बिना किसी रासायनिक लेप के पूर्णतः शुद्ध।',
    image: '/images/tamta/intro-05.jpg',
    curatedCategorySlugs: ['pooja-items', 'lotas-glasses'],
    suggestedBlessing: 'ॐ ताम्रपात्रे जलं शीतलं पवित्रं च — Sacred water in holy copper sanctifies all.',
    suggestedBlessingHi: 'ॐ ताम्रपात्रे जलं शीतलं पवित्रं च — ताम्रपात्र का जल पावन और कल्याणकारी है।',
  },
  {
    id: 'newborn',
    slug: 'newborn',
    name: 'Newborn & Annaprashan',
    nameHi: 'नवजात शिशु एवं अन्नप्राशन',
    tagline: 'Gentle first sips from unblemished mountain copper.',
    taglineHi: 'अन्नप्राशन एवं शिशु के प्रथम जल-स्पर्श हेतु शुद्ध पात्र।',
    description: 'Food-grade pure tin-lined small katoris and round-rimmed tumblers crafted with soft contours, ideal for a child’s first cereal or dawn water ritual.',
    descriptionHi: 'नवजात शिशु के अन्नप्राशन संस्कार के लिए शुद्ध रांगा (टिन) लगी छोटी कटोरी और चिकने किनारों वाला गिलास।',
    image: '/images/tamta/intro-01.jpg',
    curatedCategorySlugs: ['lotas-glasses', 'cookware'],
    suggestedBlessing: 'आयुर्बलं यशो वर्धताम् — May the child grow in health, strength, and brilliance.',
    suggestedBlessingHi: 'आयुर्बलं यशो वर्धताम् — शिशु दीर्घायु और आरोग्य से युक्त हो।',
  },
  {
    id: 'anniversary',
    slug: 'anniversary',
    name: 'Anniversary & Milestones',
    nameHi: 'वर्षगांठ एवं जीवन उत्सव',
    tagline: 'Seven-year traditional copper anniversary pieces.',
    taglineHi: 'सातवें विवाह वर्ष के लिए पारंपरिक तांबे के विशेष उपहार।',
    description: 'Seventh anniversary gifts of hand-hammered carafes, chalices, and bespoke debossed initials commemorating shared devotion through time.',
    descriptionHi: 'सातवीं वर्षगांठ के पारंपरिक ताम्र उपहार, सुंदर नक्काशी और युगल के नाम की विशेष छेनी नक्काशी के साथ।',
    image: '/images/tamta/product-02.jpg',
    curatedCategorySlugs: ['water-bottles-jugs', 'serveware', 'gift-sets'],
    suggestedBlessing: 'सप्तपदी सहधर्मिणी — Seven steps, countless shared dawns.',
    suggestedBlessingHi: 'सप्तपदी सहधर्मिणी — जीवन के प्रत्येक वर्ष में प्रेम का प्रकाश बना रहे।',
  },
  {
    id: 'corporate',
    slug: 'corporate',
    name: 'Bespoke Corporate Gifts',
    nameHi: 'संस्थागत एवं कॉपोरेट उपहार',
    tagline: 'Elevated executive gifting with ancestral pedigree.',
    taglineHi: 'अल्मोड़ा शिल्पियों द्वारा निर्मित विशिष्ट कॉरपोरेट सम्मान।',
    description: 'Laser and hand-chiseled organizational crests on luxury hammered bottles and carafes. Encased in archival honeycomb cartons with numbered provenance certificates.',
    descriptionHi: 'संस्था के लोगो एवं सम्मान संदेश के साथ हस्तनिर्मित बोतल और जग के विशिष्ट उपहार सेट।',
    image: '/images/tamta/product-03.jpg',
    curatedCategorySlugs: ['gift-sets', 'water-bottles-jugs', 'serveware'],
    suggestedBlessing: 'कर्मण्येवाधिकारस्ते — Honouring diligence and master craft.',
    suggestedBlessingHi: 'कर्मण्येवाधिकारस्ते — निष्ठा और शिल्प कौशल का आदर।',
  },
];

