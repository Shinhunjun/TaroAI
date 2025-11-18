'use client';

import Image from 'next/image';
import { TarotCard as TarotCardType } from '@/types/tarot';

interface TarotCardProps {
  card: TarotCardType | null;
  position: 'past' | 'present' | 'future';
  onDraw: () => void;
  disabled: boolean;
  loading?: boolean;
}

export default function TarotCard({ card, position, onDraw, disabled, loading }: TarotCardProps) {
  const positionLabels = {
    past: 'Past',
    present: 'Present',
    future: 'Future',
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800/60 rounded-xl shadow-xl">
      {card ? (
        <>
          <Image
            src={`/cards/${card.img}`}
            alt={card.name}
            width={200}
            height={350}
            className="rounded-lg shadow-lg mb-4"
          />
          <p className="text-xl font-semibold text-yellow-400">{card.name}</p>
        </>
      ) : (
        <>
          <Image
            src="/taro.jpg"
            alt="Card back"
            width={200}
            height={350}
            className="rounded-lg shadow-lg mb-4"
          />
          <button
            onClick={onDraw}
            disabled={disabled || loading}
            className="px-6 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
          >
            {loading ? 'Drawing...' : `Draw ${positionLabels[position]} Card`}
          </button>
        </>
      )}
    </div>
  );
}
