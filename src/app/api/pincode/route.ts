import { NextResponse } from 'next/server';
import { PINCODES } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pin = searchParams.get('pincode')?.trim();

  if (!pin) {
    return NextResponse.json({ success: false, message: 'Pincode required' }, { status: 400 });
  }

  if (PINCODES[pin]) {
    return NextResponse.json({
      success: true,
      serviceable: true,
      ...PINCODES[pin],
    });
  }

  if (pin.length === 6 && /^\d+$/.test(pin)) {
    return NextResponse.json({
      success: true,
      serviceable: true,
      city: 'Verified Postal Zone',
      state: 'India',
      cod: true,
      days: 4,
    });
  }

  return NextResponse.json({
    success: false,
    serviceable: false,
    message: 'Invalid or non-serviceable Indian Pincode',
  });
}

