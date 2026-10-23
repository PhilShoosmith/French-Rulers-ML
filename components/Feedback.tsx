

import React from 'react';
import { AnyLastGuess, Monarch } from '../types';
import { useTranslation } from 'react-i18next';

interface FeedbackProps {
  lastGuess: AnyLastGuess;
  onNext: () => void;
  monarch: Monarch;
  allMonarchs: Monarch[];
  onLearnMore: (monarch: Monarch) => void;
  onStop: () => void;
  onOpenFamilyTree?: (monarch: Monarch) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ lastGuess, onNext, monarch, onLearnMore, allMonarchs, onStop, onOpenFamilyTree }) => {
  const { t, i18n } = useTranslation();

  const getMonarchName = (m?: Monarch) => {
    if (!m) return t('unknown');
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const isYearMode = lastGuess.type === 'year';

  const renderFeedbackContent = () => {
    if (lastGuess.type === 'year') {
      const { isCorrect, correctYear, guessedYear, timedOut } = lastGuess;
      if (timedOut) {
        return (
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-red-400 mb-1.5">{t('timesUp')}</h3>
            <p className="text-sm sm:text-base text-slate-300">
              {t('correctYearWas')} <span className="font-bold text-white">{correctYear}</span>.
            </p>
          </div>
        );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-400 mb-1.5">{t('correctExclaim')}</h3>
            <p className="text-sm sm:text-base text-slate-300">
              {t('correctYearFeedback', { year: correctYear })}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-red-400 mb-1.5">{t('notQuite')}</h3>
          <p className="text-sm sm:text-base text-slate-300">
            {t('youGuessed')} {guessedYear}, {t('butCorrectYearWas')} <span className="font-bold text-white">{correctYear}</span>.
          </p>
        </div>
      );
    }
    
    if (lastGuess.type === 'monarch') {
      const { isCorrect, correctMonarchId, guessedMonarchId, timedOut } = lastGuess;
      const correctMonarch = allMonarchs.find(m => m.id === correctMonarchId);
      const guessedMonarch = allMonarchs.find(m => m.id === guessedMonarchId);

      if (timedOut) {
         return (
          <div>
            <h3 className="text-3xl font-bold text-red-400 mb-2">{t('timesUp')}</h3>
            <p className="text-slate-300">
              {t('correctSuccessorWas')} <span className="font-bold text-white">{getMonarchName(correctMonarch)}</span>.
            </p>
          </div>
         );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">{t('correctExclaim')}</h3>
            <p className="text-slate-300">
              {t('correctSuccessorFeedback', { name: getMonarchName(correctMonarch) })}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-3xl font-bold text-red-400 mb-2">{t('notQuite')}</h3>
          <p className="text-slate-300">
            {t('youGuessed')} {getMonarchName(guessedMonarch)}, {t('butCorrectSuccessorWas')} <span className="font-bold text-white">{getMonarchName(correctMonarch)}</span>.
          </p>
        </div>
      );
    }

    if (lastGuess.type === 'ruler') {
      const { isCorrect, correctMonarchId, guessedMonarchId, timedOut } = lastGuess;
      const correctMonarch = allMonarchs.find(m => m.id === correctMonarchId);
      const guessedMonarch = allMonarchs.find(m => m.id === guessedMonarchId);

      if (timedOut) {
        return (
          <div>
            <h3 className="text-3xl font-bold text-red-400 mb-2">{t('timesUp')}</h3>
            <p className="text-slate-300">
              {t('correctRulerWas')} <span className="font-bold text-white">{getMonarchName(correctMonarch)}</span>.
            </p>
          </div>
        );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">{t('correctExclaim')}</h3>
            <p className="text-slate-300">
              {t('correctRulerFeedback', { name: getMonarchName(correctMonarch) })}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className="text-3xl font-bold text-red-400 mb-2">{t('notQuite')}</h3>
          <p className="text-slate-300">
            {t('youGuessed')} {getMonarchName(guessedMonarch)}, {t('butCorrectRulerWas')} <span className="font-bold text-white">{getMonarchName(correctMonarch)}</span>.
          </p>
        </div>
      );
    }

    return null;
  };

  const displayContext = i18n.language === 'fr' && monarch.contextFr ? monarch.contextFr : i18n.language === 'ja' && monarch.contextJa ? monarch.contextJa : i18n.language === 'zh' && monarch.contextZh ? monarch.contextZh : i18n.language === 'es' && monarch.contextEs ? monarch.contextEs : i18n.language === 'hi' && monarch.contextHi ? monarch.contextHi : i18n.language === 'ar' && monarch.contextAr ? monarch.contextAr : monarch.context;

  return (
    <div className={`w-full mx-auto ${isYearMode ? 'p-2.5 sm:p-4' : 'p-3 sm:p-5'} bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 text-center animate-fade-in-up max-w-lg`}>
      {renderFeedbackContent()}

      <div className={`${isYearMode ? 'mt-1.5 sm:mt-2 p-2' : 'mt-2.5 sm:mt-3 p-2.5'} bg-slate-900/60 border border-slate-700/80 rounded-lg text-left max-h-20 sm:max-h-28 overflow-y-auto custom-scrollbar`}>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-snug">
          <span className="font-bold text-amber-400">{t('didYouKnow')}</span> {displayContext}
        </p>
      </div>

      <div className="mt-2.5 sm:mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center sm:justify-center flex-wrap">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-3.5 py-1.5 sm:py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm flex items-center justify-center gap-1"
        >
          <span>▶</span>
          <span>{t('nextRound')}</span>
        </button>
        <button
          onClick={() => onLearnMore(monarch)}
          className="w-full sm:w-auto px-3.5 py-1.5 sm:py-2 bg-green-500 text-slate-950 font-bold rounded-lg hover:bg-green-400 transform active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
          aria-label={`Learn more about ${getMonarchName(monarch)}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <span>{t('learnMore')}</span>
        </button>
        {onOpenFamilyTree && (
          <button
            onClick={() => onOpenFamilyTree(monarch)}
            className={`w-full sm:w-auto px-3 py-1.5 sm:py-2 font-bold rounded-lg transform active:scale-95 transition-all duration-200 shadow-md focus:outline-none flex items-center justify-center gap-1 text-xs sm:text-sm border ${
              monarch.house === 'Republic'
                ? 'bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border-blue-500/40'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border-amber-500/40'
            }`}
            aria-label={`View ${monarch.house === 'Republic' ? 'career path' : 'family tree'} of ${getMonarchName(monarch)}`}
          >
            <span>{monarch.house === 'Republic' ? '🏛️' : '👑'}</span>
            <span className="truncate">{monarch.house === 'Republic' ? 'Career' : t('familyTree')}</span>
          </button>
        )}
        <button
          onClick={onStop}
          className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-red-700/90 text-white font-semibold rounded-lg hover:bg-red-800 transform active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/50 flex items-center justify-center gap-1 text-xs sm:text-sm"
          aria-label="Stop game and return to start screen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.293 6.293a1 1 0 011.414 0L12 7.586l1.293-1.293a1 1 0 111.414 1.414L13.414 9l1.293 1.293a1 1 0 01-1.414 1.414L12 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L10.586 9 9.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span>{t('stopGame')}</span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;