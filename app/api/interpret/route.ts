import { NextRequest, NextResponse } from 'next/server';
import { getSession, setSession } from '@/lib/session';
import { getGeminiResponse } from '@/lib/vertexai';
import { getMeaningByOrientation, getCardByName } from '@/lib/tarot-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question || question.trim() === '') {
      return NextResponse.json(
        { error: 'Question is required.' },
        { status: 400 }
      );
    }

    // Get session data
    const session = await getSession();

    // Add detailed logging for debugging
    console.log('Interpret endpoint - Session state:', {
      hasPast: !!session.cardNames.past,
      hasPresent: !!session.cardNames.present,
      hasFuture: !!session.cardNames.future,
      pastCard: session.cardNames.past || 'null',
      presentCard: session.cardNames.present || 'null',
      futureCard: session.cardNames.future || 'null',
    });

    // Check if all cards are drawn
    if (!session.cardNames.past || !session.cardNames.present || !session.cardNames.future) {
      console.error('Missing cards detected:', session.cardNames);
      return NextResponse.json(
        { error: 'All three cards must be drawn before interpretation.' },
        { status: 400 }
      );
    }

    // Load cards from names
    const pastCard = getCardByName(session.cardNames.past);
    const presentCard = getCardByName(session.cardNames.present);
    const futureCard = getCardByName(session.cardNames.future);

    if (!pastCard || !presentCard || !futureCard) {
      console.error('Failed to load cards from names');
      return NextResponse.json(
        { error: 'Failed to load card data.' },
        { status: 500 }
      );
    }

    // Update question in session
    session.question = question.trim();
    await setSession(session);

    // Get meanings based on card orientation (reversed uses shadow, upright uses light)
    const pastMeaning = getMeaningByOrientation(pastCard, session.reversed.past);
    const presentMeaning = getMeaningByOrientation(presentCard, session.reversed.present);
    const futureMeaning = getMeaningByOrientation(futureCard, session.reversed.future);

    // Build prompt for Gemini
    const prompt = `[User Question] ${question}

[Tarot Cards]
Past Card: ${pastCard.name} ${session.reversed.past ? '(Reversed)' : '(Upright)'}
Past Card Meaning: "${pastMeaning.meaning}"

Present Card: ${presentCard.name} ${session.reversed.present ? '(Reversed)' : '(Upright)'}
Present Card Meaning: "${presentMeaning.meaning}"

Future Card: ${futureCard.name} ${session.reversed.future ? '(Reversed)' : '(Upright)'}
Future Card Meaning: "${futureMeaning.meaning}"

[Instructions]
- Provide a natural, conversational response in 3 paragraphs or less
- Create an integrated interpretation connecting past/present/future cards
- Include practical action plans
- Minimize mystical expressions
- Reversed cards indicate challenges, obstacles, or internalized energy`;

    // Call Vertex AI Gemini
    const interpretation = await getGeminiResponse(prompt);

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Interpretation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate interpretation.' },
      { status: 500 }
    );
  }
}
