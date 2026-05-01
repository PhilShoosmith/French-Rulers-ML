
import React, { useState, useMemo } from 'react';
import { Monarch } from '../types';
import { useTranslation } from 'react-i18next';

interface NextMonarchGuesserProps {
  monarchs: Monarch[];
  onSubmit: (monarchId: number) => void;
  disabled: boolean;
  correctSuccessorId?: number;
}

const NextMonarchGuesser: React.FC<NextMonarchGuesserProps> = ({ monarchs, onSubmit, disabled, correctSuccessorId }) => {
  const { t, i18n } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const getMonarchName = (m: Monarch) => {
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const sortedMonarchs = useMemo(() => 
    [...monarchs].sort((a, b) => getMonarchName(a).localeCompare(getMonarchName(b))),
    [monarchs, i18n.language]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !selectedId || feedback || !correctSuccessorId) return;

    const guessedId = parseInt(selectedId, 10);
    const isCorrect = guessedId === correctSuccessorId;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
        onSubmit(guessedId);
    }, 1500);
  };

  const selectClasses = [
    'bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-lg w-full flex-grow focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50',
    feedback === 'correct' ? 'border-green-500 ring-green-500 bg-green-900/50' :
    feedback === 'incorrect' ? 'border-red-500 ring-red-500 bg-red-900/50' :
    'focus:ring-purple-500'
  ].join(' ');
  
  const buttonClasses = [
     "w-full sm:w-auto px-6 py-3 text-white font-bold rounded-lg transform transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4",
     !selectedId || !!feedback || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105',
     feedback === 'correct' ? 'bg-green-600 focus:ring-green-500/50' :
     feedback === 'incorrect' ? 'bg-red-600 focus:ring-red-500/50' :
     'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500/50'
  ].join(' ');


  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        disabled={disabled || !!feedback}
        className={selectClasses}
        aria-label="Select the next monarch"
      >
        <option value="" disabled>{t('selectMonarch')}</option>
        {sortedMonarchs.map(monarch => (
          <option key={monarch.id} value={monarch.id}>
            {getMonarchName(monarch)}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={disabled || !selectedId || !!feedback}
        className={buttonClasses}
      >
        {t('submit')}
      </button>
    </form>
  );
};

export default NextMonarchGuesser;
