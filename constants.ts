export const ROUNDS_PER_GAME = 10;
export const YEAR_TOLERANCE = 5; // Guesses within this many years are correct
export const TIMELINE_START_YEAR = 987;
export const TIMELINE_END_YEAR = 2025;
export const ROUND_DURATION_SECONDS = 30;

export const HISTORICAL_PERIODS = [
  { name: 'Capetian', start: 987, end: 1328, color: 'bg-blue-900/50', textColor: 'text-blue-300', borderColor: 'border-blue-700', hoverBorder: 'hover:border-blue-700', timelineColor: 'bg-blue-600' },
  { name: 'Valois', start: 1328, end: 1589, color: 'bg-red-900/50', textColor: 'text-red-300', borderColor: 'border-red-700', hoverBorder: 'hover:border-red-700', timelineColor: 'bg-red-600' },
  { name: 'Bourbon', start: 1589, end: 1792, color: 'bg-amber-900/50', textColor: 'text-amber-300', borderColor: 'border-amber-700', hoverBorder: 'hover:border-amber-700', timelineColor: 'bg-amber-600' },
  { name: 'Empires & Restoration', start: 1792, end: 1870, color: 'bg-indigo-900/50', textColor: 'text-indigo-300', borderColor: 'border-indigo-700', hoverBorder: 'hover:border-indigo-700', timelineColor: 'bg-indigo-600' },
  { name: 'Republics', start: 1870, end: 2025, color: 'bg-green-900/50', textColor: 'text-green-300', borderColor: 'border-green-700', hoverBorder: 'hover:border-green-700', timelineColor: 'bg-green-600' },
];