import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendOrderWhatsAppAlert } from '@/lib/whatsapp/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderNumber = `TS-${Math.floor(100000 + Math.random() * 900000)}`;
    const isOptedIn = Boolean(body.whatsappOptIn);

    const order = await prisma.order.create({
      data: {
        orderNumber,
        guestEmail: body.guestEmail,
        guestPhone: body.guestPhone,
        shippingAddress: JSON.stringify(body.shippingAddress),
        subtotal: parseFloat(body.subtotal),
        shippingFee: parseFloat(body.shippingFee || 0),
        discount: parseFloat(body.discount || 0),
        giftWrapFee: parseFloat(body.giftWrapFee || 0),
        isGift: Boolean(body.isGift),
        giftMessage: body.giftMessage || null,
        totalAmount: parseFloat(body.totalAmount),
        paymentMethod: body.paymentMethod || 'RAZORPAY',
        paymentStatus: body.paymentMethod === 'RAZORPAY' ? 'PAID' : 'PENDING',
        paymentId: body.paymentId || null,
        orderStatus: 'CONFIRMED',
        carrier: 'Shiprocket (BlueDart Express)',
        trackingNumber: `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`,
        whatsappOptIn: isOptedIn,
        whatsappOptInAt: isOptedIn ? new Date() : null,
      },
    });

    // If opted into WhatsApp notifications, trigger the order_confirmed template alert
    if (isOptedIn) {
      sendOrderWhatsAppAlert({
        orderNumber: order.orderNumber,
        event: 'confirmed',
      }).catch((err) => console.error('Failed to dispatch initial order confirmation alert on WhatsApp:', err));
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


