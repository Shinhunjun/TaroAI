import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/session';

export async function DELETE() {
  try {
    await clearSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session reset error:', error);
    return NextResponse.json(
      { error: 'Failed to reset session.' },
      { status: 500 }
    );
  }
}
