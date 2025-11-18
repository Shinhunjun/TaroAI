import { VertexAI } from '@google-cloud/vertexai';

let vertexAIInstance: VertexAI | null = null;

export function getVertexAI(): VertexAI {
  if (vertexAIInstance) {
    return vertexAIInstance;
  }

  const project = process.env.GCP_PROJECT_ID;
  const location = process.env.GCP_LOCATION || 'us-central1';

  if (!project) {
    throw new Error('GCP_PROJECT_ID environment variable is not set');
  }

  // Set Google Cloud credentials from environment variable if available
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    // For Vercel deployment: credentials are stored as JSON string in env var
    process.env.GOOGLE_APPLICATION_CREDENTIALS = 'temp-credentials.json';
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

    // Write credentials to temp file (serverless functions have /tmp access)
    const fs = require('fs');
    const tmpPath = '/tmp/gcp-credentials.json';
    fs.writeFileSync(tmpPath, JSON.stringify(credentials));
    process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpPath;
  }

  vertexAIInstance = new VertexAI({ project, location });
  return vertexAIInstance;
}

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const vertexAI = getVertexAI();
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
    });

    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    };

    const result = await generativeModel.generateContent(request);
    const response = result.response;

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('No response from Gemini');
    }

    const text = response.candidates[0].content.parts[0].text;
    return text || '';
  } catch (error) {
    console.error('Vertex AI Error:', error);
    throw new Error(`Failed to get AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
