import { NextResponse } from 'next/server';
import { getGeminiResponse } from '@/lib/vertexai';

export async function GET() {
  try {
    const testPrompt = 'Say "Hello from Vertex AI Gemini!" in one sentence.';
    const response = await getGeminiResponse(testPrompt);

    return NextResponse.json({
      success: true,
      message: 'Vertex AI is connected!',
      response: response
    });
  } catch (error) {
    console.error('Vertex AI test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
