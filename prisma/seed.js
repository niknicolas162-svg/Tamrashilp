const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Tamtashilp database...');

  // 1. Clear existing
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.artisanProfile.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.customOrder.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.pincodeService.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Tamtashilp Curator Admin',
      email: 'curator@tamtashilp.in',
      phone: '+91 94120 00001',
      role: 'ADMIN',
      language: 'en',
    },
  });

  const sellerUser = await prisma.user.create({
    data: {
      name: 'Harish Tamta',
      email: 'harish@tamtashilp.in',
      phone: '+91 94120 54321',
      role: 'SELLER',
      language: 'hi',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      name: 'Aaditya Rawat',
      email: 'aaditya@example.com',
      phone: '+91 98765 43210',
      role: 'CUSTOMER',
      language: 'en',
    },
  });

  // 3. Create Artisan Profile
  const artisanProfile1 = await prisma.artisanProfile.create({
    data: {
      userId: sellerUser.id,
      workshopName: 'Shree Tamreshwar Shilp Kendra',
      workshopNameHi: 'श्री ताम्रेश्वर शिल्प केंद्र',
      story: '4th generation master coppersmith carrying forward the 500-year-old Kumaoni hammer technique in Tamta Mohalla, Almora.',
      storyHi: '500 साल पुरानी कुमाऊंनी हथौड़ी तकनीक को आगे बढ़ाने वाले चौथी पीढ़ी के मास्टर ताम्रशिल्पी।',
      craftCluster: 'Tamta Mohalla, Almora, Uttarakhand',
      craftClusterHi: 'टम्टा मोहल्ला, अल्मोड़ा, उत्तराखण्ड',
      yearsOfExperience: 34,
      certificationUrl: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=500',
      pan: 'ABCDE1234F',
      gstin: '05ABCDE1234F1Z5',
      bankAccount: '123456789012',
      bankIfsc: 'SBIN0000001',
      bankName: 'State Bank of India Almora Main Branch',
      commissionRate: 12.0,
      isApproved: true,
      rating: 4.95,
      totalSalesCount: 1420,
      totalEarnings: 840000,
    },
  });

  // 4. Create Categories
  const categoriesData = [
    {
      id: 'water-bottles-jugs',
      name: 'Water Bottles & Jugs',
      nameHi: 'पानी की बोतलें और जग',
      slug: 'water-bottles-jugs',
      description: 'Ayurvedic water storage bottles, carafes, and hammered jugs designed for daily natural wellness.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80',
      order: 1,
    },
    {
      id: 'lotas-glasses',
      name: 'Lotas & Glasses',
      nameHi: 'लोटा और गिलास',
      slug: 'lotas-glasses',
      description: 'Traditional drinkware, water tumblers, and sacred lotas with hand-hammered indentations.',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
      order: 2,
    },
    {
      id: 'cookware',
      name: 'Cookware (Kadhai, Handi, Tope)',
      nameHi: 'कुकवेयर (कड़ाही, हांडी, तोप)',
      slug: 'cookware',
      description: 'Heavy-gauge culinary copper vessels with pure tin (kalai) lining for uniform heating and slow cooking.',
      image: 'https://images.unsplash.com/photo-1584990347449-a29486c8f9aa?w=800&auto=format&fit=crop&q=80',
      order: 3,
    },
    {
      id: 'serveware',
      name: 'Serveware & Tableware',
      nameHi: 'सर्ववेयर और टेबलवेयर',
      slug: 'serveware',
      description: 'Impressive hand-crafted platters, mule mugs, bowls, and ladles that elevate royal dining.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      order: 4,
    },
    {
      id: 'pooja-items',
      name: 'Pooja Items & Kalash',
      nameHi: 'पूजा सामग्री और कलश',
      slug: 'pooja-items',
      description: 'Sacred temple thalis, sanctified kalash, diyas, and panchapatra engraved by master artisans.',
      image: 'https://images.unsplash.com/photo-1606744888344-498238f01037?w=800&auto=format&fit=crop&q=80',
      order: 5,
    },
    {
      id: 'gift-sets',
      name: 'Heritage Gift Sets',
      nameHi: 'हेरिटेज उपहार सेट',
      slug: 'gift-sets',
      description: 'Luxuriously boxed gift collections with natural copper cleaning essentials, ideal for weddings and festivities.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      order: 6,
    },
    {
      id: 'custom-engraved',
      name: 'Custom & Engraved Pieces',
      nameHi: 'कस्टम एवं नक्काशीदार पात्र',
      slug: 'custom-engraved',
      description: 'Bespoke hand-hammered flasks, monogrammed carafes, and commissioned heritage metalware.',
      image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop&q=80',
      order: 7,
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.create({ data: cat });
  }

  // 5. Create 12 Products
  const products = [
    {
      id: 'tamta-p1',
      title: 'Royal Almora Hammered Copper Water Bottle (1000ml)',
      titleHi: 'रॉयल अल्मोड़ा हथौड़ा-तराशी कॉपर पानी की बोतल (1000ml)',
      slug: 'royal-almora-hammered-copper-water-bottle-1000ml',
      categoryId: 'water-bottles-jugs',
      artisanId: artisanProfile1.id,
      basePrice: 1699,
      comparePrice: 2299,
      purityRating: '99.2% Lab-Certified Pure Copper (Grade A)',
      finish: 'HAMMERED',
      capacity: '1000ml',
      weightGrams: 360,
      dimensions: '27cm Height x 7.5cm Diameter',
      makingTimeDays: 3,
      stock: 28,
      isFeatured: true,
      isBestseller: true,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1000&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=1000&auto=format&fit=crop&q=85',
      ]),
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-craftsman-hammering-a-hot-metal-piece-42995-large.mp4',
      description: 'Every Royal Almora bottle is raised from a single sheet of certified 99.2% pure virgin copper. Master craftsman Harish Tamta shapes each piece by hand using traditional horn-anvil techniques unchanged for 500 years in Uttarakhand.',
      descriptionHi: 'प्रत्येक रॉयल अल्मोड़ा बोतल 99.2% शुद्ध तांबे की एक ही चादर से हस्तनिर्मित है। मास्टर शिल्पी हरीश टम्टा पारंपरिक तकनीक से इसे आकार देते हैं।',
      careInstructions: 'Clean exterior gently with lemon juice and salt or Pitambari powder. Dry with soft cotton cloth.',
      safetyNotice: 'Traditionally used in Ayurveda for storing drinking water. Store only plain drinking water. Avoid acidic liquids, juices, milk, or curd.',
      customOrderAvailable: true,
    },
    {
      id: 'tamta-p2',
      title: 'Bageshwar Heritage Hand-Carved Copper Jug with Brass Handle (1500ml)',
      titleHi: 'बागेश्वर हेरिटेज नक्काशीदार तांबे का जग (1500ml)',
      slug: 'bageshwar-heritage-hand-carved-copper-jug-1500ml',
      categoryId: 'water-bottles-jugs',
      artisanId: artisanProfile1.id,
      basePrice: 2499,
      comparePrice: 3299,
      purityRating: '99.2% Lab-Certified Pure Copper (Grade A)',
      finish: 'ENGRAVED',
      capacity: '1500ml',
      weightGrams: 580,
      dimensions: '22cm Height x 14cm Belly Width',
      makingTimeDays: 5,
      stock: 16,
      isFeatured: true,
      isBestseller: false,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&auto=format&fit=crop&q=85',
      ]),
      description: 'Masterfully etched by Ganga Devi with sacred paisley & Himalayan flora motifs. Features an ergonomic solid cast brass scroll handle.',
      descriptionHi: 'गंगा देवी द्वारा पवित्र पैस्ले और हिमालयी पुष्प रूपांकनों से उत्कीर्ण। ठोस पीतल के हैंडल के साथ।',
      careInstructions: 'Hand wash only with soft cloth and lemon/salt or tamarind water.',
      safetyNotice: 'Store plain water only. Do not store acidic drinks or milk products in plain copper.',
      customOrderAvailable: true,
    },
    {
      id: 'tamta-p3',
      title: 'Traditional Kumaoni Heavy Gauge Copper Kadhai with Pure Tin (Kalai) Lining (2.5L)',
      titleHi: 'पारंपरिक कुमाऊंनी भारी तांबे की कड़ाही - शुद्ध कलाई युक्त (2.5L)',
      slug: 'traditional-kumaoni-heavy-copper-kadhai-kalai-2-5l',
      categoryId: 'cookware',
      artisanId: artisanProfile1.id,
      basePrice: 3899,
      comparePrice: 4899,
      purityRating: '3.2mm Heavy Copper with 99.9% Food-Grade Tin Kalai',
      finish: 'HAMMERED',
      capacity: '2.5 Litres',
      weightGrams: 1650,
      dimensions: '28cm Diameter x 10cm Depth',
      makingTimeDays: 7,
      stock: 11,
      isFeatured: true,
      isBestseller: true,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1584990347449-a29486c8f9aa?w=1000&auto=format&fit=crop&q=85',
      ]),
      description: '3.2mm thick heavy bottom forged by Mohan Lal Tamta. Hand-coated with pure virgin tin (kalai) for safe Indian cooking of all gravies.',
      descriptionHi: 'मोहन लाल टम्टा द्वारा निर्मित 3.2mm भारी तली। भारतीय व्यंजनों को सुरक्षित पकाने के लिए शुद्ध कलाई (टिन) से आच्छादित।',
      careInstructions: 'Cook on low to medium flame. Always use wooden or silicone spatulas.',
      safetyNotice: 'Food-grade tin lining allows safe cooking of all foods including curds and tomatoes.',
      customOrderAvailable: false,
    },
    {
      id: 'tamta-p4',
      title: 'Ayurvedic Pure Copper Water Dispenser / Matka with Brass Tap (5 Litres)',
      titleHi: 'आयुर्वेदिक शुद्ध तांबे का जल पात्र / मटका पीतल के नल सहित (5L)',
      slug: 'ayurvedic-pure-copper-water-dispenser-matka-brass-tap-5l',
      categoryId: 'water-bottles-jugs',
      artisanId: artisanProfile1.id,
      basePrice: 3499,
      comparePrice: 4499,
      purityRating: '99.2% Lab-Certified Pure Copper (Grade A)',
      finish: 'HAMMERED',
      capacity: '5 Litres',
      weightGrams: 1450,
      dimensions: '32cm Height x 22cm Diameter',
      makingTimeDays: 6,
      stock: 14,
      isFeatured: true,
      isBestseller: true,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&auto=format&fit=crop&q=85',
      ]),
      description: 'Traditional spherical matka pot with a high-flow leakproof brass spigot. Natural copper ionization for the whole family.',
      descriptionHi: 'उच्च गुणवत्ता वाले पीतल के नल के साथ पारंपरिक मटका। पूरे परिवार के प्राकृतिक स्वास्थ्य के लिए।',
      careInstructions: 'Clean once a week with fresh lemon juice and salt or tamarind paste.',
      safetyNotice: 'Store drinking water only. Not for carbonated or acidic liquids.',
      customOrderAvailable: true,
    },
  ];

  for (const prod of products) {
    await prisma.product.create({ data: prod });
  }

  // 6. Coupons
  await prisma.coupon.create({
    data: {
      code: 'HERITAGE10',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderValue: 1499,
      maxDiscount: 500,
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'TAMTAFREE',
      discountType: 'FLAT',
      discountValue: 150,
      minOrderValue: 1999,
    },
  });

  // 7. Pincodes
  const pinData = [
    { pincode: '263601', city: 'Almora', state: 'Uttarakhand', codAvailable: true, deliveryDays: 2 },
    { pincode: '263642', city: 'Bageshwar', state: 'Uttarakhand', codAvailable: true, deliveryDays: 2 },
    { pincode: '110001', city: 'New Delhi', state: 'Delhi NCR', codAvailable: true, deliveryDays: 3 },
    { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', codAvailable: true, deliveryDays: 4 },
    { pincode: '560001', city: 'Bengaluru', state: 'Karnataka', codAvailable: true, deliveryDays: 4 },
  ];

  for (const pin of pinData) {
    await prisma.pincodeService.create({ data: pin });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

