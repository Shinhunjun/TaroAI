'use client';

import { TarotCard as TarotCardType } from '@/types/tarot';
import TarotCard from './TarotCard';

interface CardSelectorProps {
  cards: {
    past: TarotCardType | null;
    present: TarotCardType | null;
    future: TarotCardType | null;
  };
  onDrawCard: (position: 'past' | 'present' | 'future') => void;
  disabled: boolean;
  loading: { past: boolean; present: boolean; future: boolean };
}

export default function CardSelector({ cards, onDrawCard, disabled, loading }: CardSelectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">🃏 Select Tarot Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TarotCard
          card={cards.past}
          position="past"
          onDraw={() => onDrawCard('past')}
          disabled={disabled || !!cards.past}
          loading={loading.past}
        />
        <TarotCard
          card={cards.present}
          position="present"
          onDraw={() => onDrawCard('present')}
          disabled={disabled || !!cards.present}
          loading={loading.present}
        />
        <TarotCard
          card={cards.future}
          position="future"
          onDraw={() => onDrawCard('future')}
          disabled={disabled || !!cards.future}
          loading={loading.future}
        />
      </div>
    </div>
  );
}
