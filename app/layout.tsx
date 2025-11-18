import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Tarot Reading',
  description: 'Discover your future and destiny through tarot cards. Professional tarot reading service.',
  openGraph: {
    title: 'Tarot Reading',
    description: 'Discover your future and destiny through tarot cards.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6885920070996702" />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} font-sans`}>{children}</body>
    </html>
  );
}
