import { cookies } from 'next/headers';
import { SessionData } from '@/types/tarot';

const SESSION_COOKIE_NAME = 'tarot_session';

export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return {
      question: '',
      cardNames: {
        past: null,
        present: null,
        future: null,
      },
      reversed: {
        past: false,
        present: false,
        future: false,
      },
    };
  }

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return {
      question: '',
      cardNames: {
        past: null,
        present: null,
        future: null,
      },
      reversed: {
        past: false,
        present: false,
        future: false,
      },
    };
  }
}

export async function setSession(session: SessionData): Promise<void> {
  const cookieStore = await cookies();
  const sessionJson = JSON.stringify(session);

  console.log('Setting session, size:', sessionJson.length, 'bytes', session);

  cookieStore.set(SESSION_COOKIE_NAME, sessionJson, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
