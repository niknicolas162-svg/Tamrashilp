import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PRODUCTS } from '@/lib/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const finish = searchParams.get('finish');

    // Attempt DB query; fallback to in-memory mock data
    let items = await prisma.product.findMany({
      include: {
        category: true,
        artisan: true,
        variants: true,
      },
    });

    if (!items || items.length === 0) {
      return NextResponse.json({ success: true, count: PRODUCTS.length, products: PRODUCTS });
    }

    if (category) {
      items = items.filter((p) => p.categoryId === category);
    }
    if (finish) {
      items = items.filter((p) => p.finish === finish);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.titleHi.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: items.length, products: items });
  } catch (error: any) {
    return NextResponse.json({ success: true, count: PRODUCTS.length, products: PRODUCTS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        title: body.title,
        titleHi: body.titleHi || body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description || '',
        descriptionHi: body.descriptionHi || '',
        categoryId: body.categoryId || 'water-bottles-jugs',
        artisanId: body.artisanId,
        basePrice: parseFloat(body.basePrice),
        comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
        finish: body.finish || 'HAMMERED',
        capacity: body.capacity || '',
        weightGrams: parseInt(body.weightGrams) || 500,
        dimensions: body.dimensions || 'Standard',
        makingTimeDays: parseInt(body.makingTimeDays) || 3,
        stock: parseInt(body.stock) || 10,
        images: JSON.stringify(body.images || []),
        careInstructions: body.careInstructions || 'Wash gently with lemon and salt.',
        safetyNotice: 'Store drinking water only. Avoid acidic foods in plain copper.',
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

