import { TarotCard } from '@/types/tarot';
import fs from 'fs';
import path from 'path';

let tarotCards: TarotCard[] | null = null;

export function loadTarotCards(): TarotCard[] {
  if (tarotCards) {
    return tarotCards;
  }

  const filePath = path.join(process.cwd(), 'public', 'tarot-images.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  tarotCards = data.cards;
  return tarotCards || [];
}

export function getRandomCard(excludeNames: string[] = []): TarotCard | null {
  const cards = loadTarotCards();
  const availableCards = cards.filter(card => !excludeNames.includes(card.name));

  if (availableCards.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableCards.length);
  return availableCards[randomIndex];
}

export function getCardByName(name: string): TarotCard | null {
  const cards = loadTarotCards();
  return cards.find(card => card.name === name) || null;
}

export function getRandomMeaning(card: TarotCard): { type: 'light' | 'shadow'; meaning: string } {
  const type = Math.random() < 0.5 ? 'light' : 'shadow';
  const meanings = card.meanings[type] || [];

  if (meanings.length === 0) {
    return { type: 'light', meaning: 'No meaning found.' };
  }

  const randomMeaning = meanings[Math.floor(Math.random() * meanings.length)];
  return { type, meaning: randomMeaning };
}

export function getMeaningByOrientation(card: TarotCard, reversed: boolean): { type: 'light' | 'shadow'; meaning: string } {
  // Reversed cards use shadow meanings, upright cards use light meanings
  const type = reversed ? 'shadow' : 'light';
  const meanings = card.meanings[type] || [];

  if (meanings.length === 0) {
    // Fallback to opposite meaning if none found
    const fallbackType = reversed ? 'light' : 'shadow';
    const fallbackMeanings = card.meanings[fallbackType] || [];
    if (fallbackMeanings.length > 0) {
      const randomMeaning = fallbackMeanings[Math.floor(Math.random() * fallbackMeanings.length)];
      return { type: fallbackType, meaning: randomMeaning };
    }
    return { type: 'light', meaning: 'No meaning found.' };
  }

  const randomMeaning = meanings[Math.floor(Math.random() * meanings.length)];
  return { type, meaning: randomMeaning };
}
