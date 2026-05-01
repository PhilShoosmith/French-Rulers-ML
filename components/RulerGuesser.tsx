
import React, { useState, useEffect } from 'react';
import { Monarch } from '../types';
import { useTranslation } from 'react-i18next';

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface RulerGuesserProps {
  allMonarchs: Monarch[];
  correctMonarch: Monarch;
  onSubmit: (monarchId: number) => void;
  disabled: boolean;
}

const RulerGuesser: React.FC<RulerGuesserProps> = ({ allMonarchs, correctMonarch, onSubmit, disabled }) => {
  const { t, i18n } = useTranslation();
  const [options, setOptions] = useState<Monarch[]>([]);
  const [selection, setSelection] = useState<{ monarchId: number; isCorrect: boolean } | null>(null);

  const getMonarchName = (m: Monarch) => {
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const getMonarchContext = (m: Monarch) => {
    if (i18n.language === 'fr' && m.contextFr) return m.contextFr;
    if (i18n.language === 'ja' && m.contextJa) return m.contextJa;
    if (i18n.language === 'zh' && m.contextZh) return m.contextZh;
    if (i18n.language === 'es' && m.contextEs) return m.contextEs;
    if (i18n.language === 'hi' && m.contextHi) return m.contextHi;
    if (i18n.language === 'ar' && m.contextAr) return m.contextAr;
    return m.context;
  };

  useEffect(() => {
    // Generate 3 random distractors
    const distractors = allMonarchs
      .filter(m => m.id !== correctMonarch.id) // Exclude the correct monarch
      .sort(() => 0.5 - Math.random()) // Shuffle to get random ones
      .slice(0, 3); // Take the first 3

    // Combine with correct monarch and shuffle
    const newOptions = shuffleArray([...distractors, correctMonarch]);
    setOptions(newOptions);
    setSelection(null); // Reset selection when monarch changes

  }, [correctMonarch, allMonarchs]);
  
  const handleGuess = (guessedId: number) => {
    if (disabled || selection) return;
    const isCorrect = guessedId === correctMonarch.id;
    setSelection({ monarchId: guessedId, isCorrect });

    setTimeout(() => {
      onSubmit(guessedId);
    }, 2000); // Increased delay to allow user to see the correct answer
  };
  
  const getButtonClass = (optionId: number) => {
    if (!selection) {
      return 'bg-slate-700 hover:bg-slate-600 hover:scale-105';
    }

    const isCorrectOption = optionId === correctMonarch.id;
    const isSelectedOption = optionId === selection.monarchId;
    
    // Always highlight the correct answer green
    if (isCorrectOption) {
      return 'bg-green-600 ring-2 ring-white scale-105 z-10';
    }

    // If this incorrect option was selected, highlight it red
    if (isSelectedOption) {
      return 'bg-red-600 ring-2 ring-white';
    }

    // Fade out other non-selected, non-correct options
    return 'bg-slate-700 opacity-50';
  };


  return (
    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 animate-fade-in-up w-full">
      <p className="text-lg md:text-xl text-slate-300 font-light mb-4 text-center">
        {t('whichFrenchLeader')}
      </p>
      <blockquote className="my-6 p-4 border-l-4 border-amber-500 bg-slate-900/50 rounded-r-lg">
        <p className="text-slate-200 italic leading-relaxed">
          "{getMonarchContext(correctMonarch)}"
        </p>
      </blockquote>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleGuess(option.id)}
            disabled={disabled || !!selection}
            className={`w-full px-6 py-4 text-white font-bold text-lg rounded-lg transform transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 animate-fade-in-up ${getButtonClass(option.id)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {getMonarchName(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RulerGuesser;
