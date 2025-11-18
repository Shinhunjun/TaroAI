export interface TarotCard {
  name: string;
  img: string;
  fortune_telling: string[];
  keywords: string[];
  meanings: {
    light: string[];
    shadow: string[];
  };
  Archetype?: string;
  'Hebrew Alphabet'?: string;
  'Numerology'?: string;
  'Elemental'?: string;
  'Mythical/Spiritual'?: string;
  Questions?: string[];
  Affirmation?: string;
}

export interface CardState {
  past: TarotCard | null;
  present: TarotCard | null;
  future: TarotCard | null;
}

export interface CardWithOrientation extends TarotCard {
  reversed: boolean;
}

export interface SessionData {
  question: string;
  cardNames: {
    past: string | null;
    present: string | null;
    future: string | null;
  };
  reversed: {
    past: boolean;
    present: boolean;
    future: boolean;
  };
}

export interface InterpretationResponse {
  interpretation?: string;
  error?: string;
}

export interface DrawCardResponse {
  card?: TarotCard;
  error?: string;
}
