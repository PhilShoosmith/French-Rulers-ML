
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
export type Timeframe = 'week' | 'month' | 'all';

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

export interface SpouseData {
  name: string;
  nameFr?: string;
  marriageYear?: string | number;
  origin?: string;
  notes?: string;
}

export interface ChildData {
  name: string;
  nameFr?: string;
  birthDeath?: string;
  title?: string;
  becameMonarch?: boolean;
  monarchId?: number; // References Monarch.id if they are in allMonarchs
  notes?: string;
}

export interface SpouseUnion {
  spouse: SpouseData;
  children: ChildData[];
}

export interface CareerStage {
  yearStart: number;
  yearEnd?: number;
  role: string;
  roleFr?: string;
  organization?: string;
  organizationFr?: string;
  type: 'education' | 'military' | 'civil' | 'political';
  description?: string;
  descriptionFr?: string;
}

export interface PresidentCareer {
  monarchId: number;
  educationSummary?: string;
  educationSummaryFr?: string;
  stages: CareerStage[];
}

export interface MonarchGenealogy {
  monarchId?: number;
  monarchName: string;
  house: string;
  parents?: {
    father?: { name: string; monarchId?: number; title?: string };
    mother?: { name: string; title?: string };
  };
  unions: SpouseUnion[];
  otherChildren?: ChildData[];
  bioSummary?: string;
}
