
export interface Monarch {
  id: number;
  name: string;
  nameFr?: string;
  nameJa?: string;
  nameZh?: string;
  nameEs?: string;
  nameHi?: string;
  nameAr?: string;
  house: string;
  reignStart: number;
  reignEnd: number | null; // Can be null for the current monarch
  context: string;
  contextFr?: string;
  contextJa?: string;
  contextZh?: string;
  contextEs?: string;
  contextHi?: string;
  contextAr?: string;
  title: string;
  titleFr?: string;
  titleJa?: string;
  titleZh?: string;
  titleEs?: string;
  titleHi?: string;
  titleAr?: string;
  imageUrl?: string;
  coatOfArmsUrl?: string;
}

export type GameState = 'start' | 'playing' | 'feedback' | 'end' | 'review';

export type GameMode = 'year' | 'monarch' | 'ruler';

export interface Score {
  name: string;
  score: number;
  timeLeft: number;
  mode: GameMode;
  date: string;
}

export interface LastYearGuess {
  type: 'year';
  isCorrect: boolean;
  guessedYear: number;
  correctYear: number;
  timedOut?: boolean;
}

export interface LastMonarchGuess {
  type: 'monarch';
  isCorrect: boolean;
  guessedMonarchId: number;
  correctMonarchId: number;
  timedOut?: boolean;
}

export interface LastRulerGuess {
  type: 'ruler';
  isCorrect: boolean;
  guessedMonarchId: number;
  correctMonarchId: number;
  timedOut?: boolean;
}

export type AnyLastGuess = LastYearGuess | LastMonarchGuess | LastRulerGuess;
