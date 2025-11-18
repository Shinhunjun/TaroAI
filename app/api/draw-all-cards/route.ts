import { NextResponse } from 'next/server';
import { getRandomCard } from '@/lib/tarot-data';
import { getSession, setSession } from '@/lib/session';

export async function POST() {
  try {
    const session = await getSession();

    // Check if cards already drawn
    if (session.cardNames.past || session.cardNames.present || session.cardNames.future) {
      return NextResponse.json(
        { error: 'Cards already drawn. Please reset to draw again.' },
        { status: 400 }
      );
    }

    // Draw 3 unique cards
    const pastCard = getRandomCard([]);
    if (!pastCard) {
      return NextResponse.json(
        { error: 'Failed to draw past card.' },
        { status: 500 }
      );
    }

    const presentCard = getRandomCard([pastCard.name]);
    if (!presentCard) {
      return NextResponse.json(
        { error: 'Failed to draw present card.' },
        { status: 500 }
      );
    }

    const futureCard = getRandomCard([pastCard.name, presentCard.name]);
    if (!futureCard) {
      return NextResponse.json(
        { error: 'Failed to draw future card.' },
        { status: 500 }
      );
    }

    // Randomly determine card orientations (50% chance of reversed)
    const pastReversed = Math.random() < 0.5;
    const presentReversed = Math.random() < 0.5;
    const futureReversed = Math.random() < 0.5;

    // Update session with card names and orientations
    session.cardNames.past = pastCard.name;
    session.cardNames.present = presentCard.name;
    session.cardNames.future = futureCard.name;
    session.reversed.past = pastReversed;
    session.reversed.present = presentReversed;
    session.reversed.future = futureReversed;

    await setSession(session);

    console.log('Drew all 3 cards:', {
      past: pastCard.name,
      present: presentCard.name,
      future: futureCard.name,
      reversed: { past: pastReversed, present: presentReversed, future: futureReversed }
    });

    return NextResponse.json({
      cards: {
        past: { ...pastCard, reversed: pastReversed },
        present: { ...presentCard, reversed: presentReversed },
        future: { ...futureCard, reversed: futureReversed },
      },
    });
  } catch (error) {
    console.error('Draw all cards error:', error);
    return NextResponse.json(
      { error: 'Failed to draw cards.' },
      { status: 500 }
    );
  }
}
