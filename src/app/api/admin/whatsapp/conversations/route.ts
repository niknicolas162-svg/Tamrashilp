import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { maskPhoneNumber } from '@/lib/whatsapp/config';

/**
 * GET /api/admin/whatsapp/conversations
 * Lists customer conversations with status filtering and phone number masking
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all'; // all, unassigned, waiting, mine, resolved
    const agent = searchParams.get('agent') || 'Master Artisan Concierge';

    let whereClause: any = {};

    if (filter === 'unassigned') {
      whereClause.assignedAgent = null;
      whereClause.status = { not: 'RESOLVED' };
    } else if (filter === 'waiting') {
      whereClause.status = 'WAITING_HUMAN';
    } else if (filter === 'mine') {
      whereClause.assignedAgent = agent;
    } else if (filter === 'resolved') {
      whereClause.status = 'RESOLVED';
    }

    const conversations = await prisma.whatsAppConversation.findMany({
      where: whereClause,
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Mask phone numbers for data privacy under DPDP Act
    const sanitized = conversations.map((conv) => {
      const elapsedHours = (Date.now() - new Date(conv.lastCustomerMessageAt).getTime()) / (1000 * 60 * 60);
      const isWithin24hWindow = elapsedHours <= 24.0;
      const hoursRemaining = Math.max(0, 24.0 - elapsedHours);

      return {
        ...conv,
        customerPhoneMasked: maskPhoneNumber(conv.customerPhone),
        customerPhoneRaw: conv.customerPhone, // Available for authorised admin session
        isWithin24hWindow,
        hoursRemaining: Math.round(hoursRemaining * 10) / 10,
      };
    });

    return NextResponse.json({ success: true, conversations: sanitized });
  } catch (error: any) {
    console.error('[Admin WhatsApp API GET Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/whatsapp/conversations
 * Updates conversation status, agent assignment, or internal notes
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, status, assignedAgent, notes } = body;

    if (!conversationId) {
      return NextResponse.json({ error: 'conversationId is required' }, { status: 400 });
    }

    const updated = await prisma.whatsAppConversation.update({
      where: { id: conversationId },
      data: {
        ...(status && { status }),
        ...(assignedAgent !== undefined && { assignedAgent }),
        ...(notes !== undefined && { notes }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, conversation: updated });
  } catch (error: any) {
    console.error('[Admin WhatsApp API PATCH Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

