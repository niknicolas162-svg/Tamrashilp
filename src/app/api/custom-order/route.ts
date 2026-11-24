import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customOrder = await prisma.customOrder.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        utensilType: body.utensilType,
        specifications: body.notes || 'Custom Handcrafted Specification',
        engravingText: body.engravingText || null,
        quantity: parseInt(body.quantity) || 1,
        budgetRange: body.budgetRange || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, customOrder });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

