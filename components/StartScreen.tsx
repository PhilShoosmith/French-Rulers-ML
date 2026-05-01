
import React, { useState, useRef, useEffect } from 'react';
import { Monarch, GameMode } from '../types';
import { useTranslation } from 'react-i18next';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
  monarchs: Monarch[];
  onShowInstructions: () => void;
  onStartReview: () => void;
  onShowPrivacy: () => void;
  onShowTerms: () => void;
  onShowHallOfFame: () => void;
  onShowFamilyTree: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, monarchs, onShowInstructions, onStartReview, onShowPrivacy, onShowTerms, onShowHallOfFame, onShowFamilyTree }) => {
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get all available portraits for the carousel
  const allPortraits = monarchs
    .map(monarch => ({
      id: monarch.id,
      name: i18n.language === 'fr' && monarch.nameFr ? monarch.nameFr : i18n.language === 'ja' && monarch.nameJa ? monarch.nameJa : i18n.language === 'zh' && monarch.nameZh ? monarch.nameZh : i18n.language === 'es' && monarch.nameEs ? monarch.nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : monarch.name,
      url: monarch.imageUrl,
    }))
    .filter(p => p.url); // Filter out any monarchs that might be missing a portrait URL

  // Calculate a dynamic duration to keep the scroll speed consistent
  const animationDuration = allPortraits.length * 5; // 5 seconds per portrait for a slow, ambient scroll

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Portrait Carousel */}
      <div className="absolute inset-0 flex items-center opacity-20 scale-110 blur-sm">
        <div 
          className="flex-shrink-0 flex items-center"
          style={{ animation: `scroll ${animationDuration}s linear infinite` }}
        >
          {/* Render the list of portraits twice for a seamless infinite loop */}
          {[...allPortraits, ...allPortraits].map((portrait, index) => (
            <div key={`${portrait.id}-${index}`} className="w-48 h-64 md:w-64 md:h-80 flex-shrink-0 mx-2">
              <img 
                src={portrait.url} 
                alt={portrait.name} 
                className="w-full h-full object-cover rounded-lg shadow-lg" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50" ref={langMenuRef}>
        <button 
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-slate-800/80 border-slate-600 hover:bg-slate-700 backdrop-blur-sm text-white transition-colors shadow-sm"
          aria-label={t('language')}
          aria-expanded={isLangMenuOpen}
        >
          {i18n.language === 'fr' ? (
            <>
              <img src="https://flagcdn.com/w20/fr.png" srcSet="https://flagcdn.com/w40/fr.png 2x" width="20" alt="French Flag" className="rounded-sm" />
              <span className="hidden sm:inline text-sm font-medium">{t('french')}</span>
            </>
          ) : i18n.language === 'ja' ? (
            <>
              <img src="https://flagcdn.com/w20/jp.png" srcSet="https://flagcdn.com/w40/jp.png 2x" width="20" alt="Japanese Flag" className="rounded-sm" />
              <span className="hidden sm:inline text-sm font-medium">{t('japanese')}</span>
            </>
          ) : i18n.language === 'zh' ? (
            <>
              <img src="https://flagcdn.com/w20/cn.png" srcSet="https://flagcdn.com/w40/cn.png 2x" width="20" alt="Chinese Flag" className="rounded-sm" />
              <span className="hidden sm:inline text-sm font-medium">{t('chinese')}</span>
            </>
          ) : i18n.language === 'es' ? (
            <>
              <img src="https://flagcdn.com/w20/es.png" srcSet="https://flagcdn.com/w40/es.png 2x" width="20" alt="Spanish Flag" className="rounded-sm" />
              <span className="hidden sm:inline text-sm font-medium">{t('spanish')}</span>
            </>
          ) : i18n.language === 'hi' ? (
            <>
              <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="20" alt="Indian Flag" className="rounded-sm" />
              <span className="hidden sm:inline text-sm font-medium">{t('hindi')}</span>
            </>
          ) : i18n.language === 'ar' ? (
            <>
              <img src="https://flagcdn.com/w20/sa.png" srcSet="https://flagcdn.com/w40/sa.png 2x" width="20" alt="Saudi Arabia Flag" className="rounded-sm" />
              <span className="hidden sm:inline text-sm font-medium">{t('arabic')}</span>
            </>
          ) : (
            <>
              <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="20" alt="UK Flag" className="rounded-sm" />
              <span className="hidden sm:inline text-sm font-medium">{t('english')}</span>
            </>
          )}
          <svg className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        {isLangMenuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden flex flex-col animate-fade-in">
            <button 
              onClick={() => { i18n.changeLanguage('en'); setIsLangMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'en' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
            >
              <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="20" alt="UK Flag" className="rounded-sm" />
              {t('english')}
            </button>
            <button 
              onClick={() => { i18n.changeLanguage('zh'); setIsLangMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'zh' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
            >
              <img src="https://flagcdn.com/w20/cn.png" srcSet="https://flagcdn.com/w40/cn.png 2x" width="20" alt="Chinese Flag" className="rounded-sm" />
              {t('chinese')}
            </button>
            <button 
              onClick={() => { i18n.changeLanguage('hi'); setIsLangMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'hi' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
            >
              <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="20" alt="Indian Flag" className="rounded-sm" />
              {t('hindi')}
            </button>
            <button 
              onClick={() => { i18n.changeLanguage('es'); setIsLangMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'es' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
            >
              <img src="https://flagcdn.com/w20/es.png" srcSet="https://flagcdn.com/w40/es.png 2x" width="20" alt="Spanish Flag" className="rounded-sm" />
              {t('spanish')}
            </button>
            <button 
              onClick={() => { i18n.changeLanguage('ar'); setIsLangMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'ar' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
            >
              <img src="https://flagcdn.com/w20/sa.png" srcSet="https://flagcdn.com/w40/sa.png 2x" width="20" alt="Saudi Arabia Flag" className="rounded-sm" />
              {t('arabic')}
            </button>
            <button 
              onClick={() => { i18n.changeLanguage('fr'); setIsLangMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'fr' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
            >
              <img src="https://flagcdn.com/w20/fr.png" srcSet="https://flagcdn.com/w40/fr.png 2x" width="20" alt="French Flag" className="rounded-sm" />
              {t('french')}
            </button>
            <button 
              onClick={() => { i18n.changeLanguage('ja'); setIsLangMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'ja' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
            >
              <img src="https://flagcdn.com/w20/jp.png" srcSet="https://flagcdn.com/w40/jp.png 2x" width="20" alt="Japanese Flag" className="rounded-sm" />
              {t('japanese')}
            </button>
          </div>
        )}
      </div>

      {/* Main Content Card */}
      <div className="relative text-center p-6 md:p-8 bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-2xl mx-auto z-10 w-11/12 max-h-[90vh] overflow-y-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 animate-fade-in-up leading-tight">
          {t('titleMain')}<br />{t('titleSub')}
        </h1>
        <p className="text-base md:text-lg text-slate-300 mb-4 md:mb-6 animate-fade-in-up animation-delay-200">
          {t('subtitle')}
        </p>
        
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-8 mt-4 md:mt-8 animate-fade-in-up animation-delay-400">
            {/* Column 1: Learning/Info */}
            <div className="flex flex-col items-center gap-3 flex-1">
                <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs md:text-sm mb-1">{t('learn')}</h3>
                <button
                  onClick={onShowInstructions}
                  className="w-full max-w-[200px] md:max-w-[240px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-yellow-400 text-slate-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-yellow-500"
                  aria-label="Show game instructions"
                >
                  {t('howToPlay')}
                </button>
                <button
                  onClick={onStartReview}
                  className="w-full max-w-[200px] md:max-w-[240px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-yellow-400 text-slate-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-yellow-500"
                  aria-label="Review all leaders"
                >
                  {t('reviewLeaders')}
                </button>
                <button
                  onClick={onShowFamilyTree}
                  className="w-full max-w-[200px] md:max-w-[240px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-yellow-400 text-slate-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-yellow-500"
                  aria-label="View Royal Family Tree"
                >
                  {t('familyTree')}
                </button>
            </div>

            {/* Divider for desktop */}
            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
            
            {/* Divider for mobile */}
            <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-slate-500 to-transparent my-1"></div>

            {/* Column 2: Play Modes */}
            <div className="flex flex-col items-center gap-3 flex-1">
                <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-1">{t('play')}</h3>
                <button
                    onClick={() => onStart('ruler')}
                    className="w-full max-w-[200px] md:max-w-[240px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                    {t('guessRuler')}
                </button>
                <button
                    onClick={() => onStart('year')}
                    className="w-full max-w-[200px] md:max-w-[240px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                    {t('guessYear')}
                </button>
                <button
                    onClick={() => onStart('monarch')}
                    className="w-full max-w-[200px] md:max-w-[240px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                    {t('guessSuccessor')}
                </button>
            </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-4 z-20 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs sm:text-sm animate-fade-in animation-delay-1000">
        <button onClick={onShowPrivacy} className="hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:text-white">{t('privacyPolicy')}</button>
        <button onClick={onShowTerms} className="hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:text-white">{t('termsOfService')}</button>
        <a 
          href="mailto:historicaltimelines4@gmail.com?subject=French%20Rulers%20Timeline%20Feedback&body=?" 
          className="hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:text-white"
        >
          {t('feedback')}
        </a>
        <button 
          onClick={onShowHallOfFame} 
          className="flex items-center justify-center w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-full hover:bg-amber-500/20 hover:text-white transition-all duration-300 focus:outline-none group shadow-lg"
          title="Hall of Fame"
          aria-label="View Hall of Fame"
        >
          <span className="text-xl group-hover:scale-125 transition-transform">🥇</span>
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
