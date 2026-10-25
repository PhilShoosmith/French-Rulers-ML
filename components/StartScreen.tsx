
import React, { useState, useRef, useEffect } from 'react';
import { Monarch, GameMode } from '../types';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Music } from 'lucide-react';
import { audioService } from '../services/audioService';

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

  // Background Music state (Handel: Sarabande)
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(() => audioService.isBackgroundPlaying());
  const [isMuted, setIsMuted] = useState<boolean>(() => audioService.isMuted());

  useEffect(() => {
    const unsubBg = audioService.subscribeBgMusic((playing) => {
      setIsMusicPlaying(playing);
    });
    const unsubMute = audioService.subscribe((muted) => {
      setIsMuted(muted);
    });
    return () => {
      unsubBg();
      unsubMute();
    };
  }, []);

  const isSoundOn = isMusicPlaying && !isMuted;

  const handleToggleSound = () => {
    audioService.resumeAudio();
    if (isSoundOn) {
      audioService.pauseBackgroundMusic();
    } else {
      if (isMuted) {
        audioService.setMuted(false);
      }
      audioService.playBackgroundMusic();
    }
  };

  const [dailyFactMonarch, setDailyFactMonarch] = useState<Monarch | null>(() => {
    if (!monarchs || monarchs.length === 0) return null;
    const withContext = monarchs.filter(m => m.context && m.context.trim().length > 0);
    const pool = withContext.length > 0 ? withContext : monarchs;
    return pool[Math.floor(Math.random() * pool.length)];
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshFact = () => {
    if (!monarchs || monarchs.length <= 1) return;
    const withContext = monarchs.filter(m => m.context && m.context.trim().length > 0);
    const pool = withContext.length > 0 ? withContext : monarchs;
    
    setIsRefreshing(true);
    let next = pool[Math.floor(Math.random() * pool.length)];
    let attempts = 0;
    while (dailyFactMonarch && next.id === dailyFactMonarch.id && attempts < 15) {
      next = pool[Math.floor(Math.random() * pool.length)];
      attempts++;
    }

    setTimeout(() => {
      setDailyFactMonarch(next);
      setIsRefreshing(false);
    }, 200);
  };

  const { displayFactName, displayFactContext } = React.useMemo(() => {
    if (!dailyFactMonarch) return { displayFactName: '', displayFactContext: '' };
    const name = i18n.language === 'fr' && dailyFactMonarch.nameFr ? dailyFactMonarch.nameFr : i18n.language === 'ja' && dailyFactMonarch.nameJa ? dailyFactMonarch.nameJa : i18n.language === 'zh' && dailyFactMonarch.nameZh ? dailyFactMonarch.nameZh : i18n.language === 'es' && dailyFactMonarch.nameEs ? dailyFactMonarch.nameEs : i18n.language === 'hi' && dailyFactMonarch.nameHi ? dailyFactMonarch.nameHi : i18n.language === 'ar' && dailyFactMonarch.nameAr ? dailyFactMonarch.nameAr : dailyFactMonarch.name;
    const context = i18n.language === 'fr' && dailyFactMonarch.contextFr ? dailyFactMonarch.contextFr : i18n.language === 'ja' && dailyFactMonarch.contextJa ? dailyFactMonarch.contextJa : i18n.language === 'zh' && dailyFactMonarch.contextZh ? dailyFactMonarch.contextZh : i18n.language === 'es' && dailyFactMonarch.contextEs ? dailyFactMonarch.contextEs : i18n.language === 'hi' && dailyFactMonarch.contextHi ? dailyFactMonarch.contextHi : i18n.language === 'ar' && dailyFactMonarch.contextAr ? dailyFactMonarch.contextAr : dailyFactMonarch.context;
    return { displayFactName: name, displayFactContext: context };
  }, [dailyFactMonarch, i18n.language]);

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
    <div className="w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between relative overflow-hidden">
      {/* Background Portrait Carousel */}
      <div className="absolute inset-0 flex items-center opacity-20 scale-110 blur-sm pointer-events-none">
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
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Header Row: Music Pill on Left, Language on Right (In-flow to prevent overlay) */}
      <header className="w-full flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3.5 z-40 flex-shrink-0">
        {/* Background Music Pill (Handel: Sarabande) */}
        <button
          type="button"
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border bg-slate-900/85 border-slate-700/80 hover:border-amber-500/50 backdrop-blur-md text-white shadow-xl transition-all duration-200 cursor-pointer focus:outline-none group"
          title="Handel: Sarabande"
          aria-label="Handel: Sarabande"
        >
          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors ${isSoundOn ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
            <Music size={12} className={isSoundOn ? 'animate-pulse' : 'opacity-60'} />
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-amber-300 tracking-wide whitespace-nowrap">
            Handel: Sarabande
          </span>
        </button>

        {/* Language Selector */}
        <div className="relative" ref={langMenuRef}>
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border bg-slate-800/80 border-slate-600 hover:bg-slate-700 backdrop-blur-sm text-white transition-colors shadow-sm text-xs sm:text-sm"
            aria-label={t('language')}
            aria-expanded={isLangMenuOpen}
          >
            {i18n.language === 'fr' ? (
              <>
                <img src="https://flagcdn.com/w20/fr.png" srcSet="https://flagcdn.com/w40/fr.png 2x" width="18" alt="French Flag" className="rounded-sm" />
                <span className="hidden sm:inline font-medium">{t('french')}</span>
              </>
            ) : i18n.language === 'ja' ? (
              <>
                <img src="https://flagcdn.com/w20/jp.png" srcSet="https://flagcdn.com/w40/jp.png 2x" width="18" alt="Japanese Flag" className="rounded-sm" />
                <span className="hidden sm:inline font-medium">{t('japanese')}</span>
              </>
            ) : i18n.language === 'zh' ? (
              <>
                <img src="https://flagcdn.com/w20/cn.png" srcSet="https://flagcdn.com/w40/cn.png 2x" width="18" alt="Chinese Flag" className="rounded-sm" />
                <span className="hidden sm:inline font-medium">{t('chinese')}</span>
              </>
            ) : i18n.language === 'es' ? (
              <>
                <img src="https://flagcdn.com/w20/es.png" srcSet="https://flagcdn.com/w40/es.png 2x" width="18" alt="Spanish Flag" className="rounded-sm" />
                <span className="hidden sm:inline font-medium">{t('spanish')}</span>
              </>
            ) : i18n.language === 'hi' ? (
              <>
                <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="18" alt="Indian Flag" className="rounded-sm" />
                <span className="hidden sm:inline font-medium">{t('hindi')}</span>
              </>
            ) : i18n.language === 'ar' ? (
              <>
                <img src="https://flagcdn.com/w20/sa.png" srcSet="https://flagcdn.com/w40/sa.png 2x" width="18" alt="Saudi Arabia Flag" className="rounded-sm" />
                <span className="hidden sm:inline font-medium">{t('arabic')}</span>
              </>
            ) : (
              <>
                <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="18" alt="UK Flag" className="rounded-sm" />
                <span className="hidden sm:inline font-medium">{t('english')}</span>
              </>
            )}
            <svg className={`w-3.5 h-3.5 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden flex flex-col animate-fade-in z-50">
              <button 
                onClick={() => { i18n.changeLanguage('en'); setIsLangMenuOpen(false); }}
                className={`flex items-center gap-3 px-3 py-1.5 text-xs sm:text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'en' ? 'bg-slate-700/50 text-blue-400 font-bold' : 'text-white'}`}
              >
                <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="18" alt="UK Flag" className="rounded-sm" />
                {t('english')}
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('zh'); setIsLangMenuOpen(false); }}
                className={`flex items-center gap-3 px-3 py-1.5 text-xs sm:text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'zh' ? 'bg-slate-700/50 text-blue-400 font-bold' : 'text-white'}`}
              >
                <img src="https://flagcdn.com/w20/cn.png" srcSet="https://flagcdn.com/w40/cn.png 2x" width="18" alt="Chinese Flag" className="rounded-sm" />
                {t('chinese')}
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('hi'); setIsLangMenuOpen(false); }}
                className={`flex items-center gap-3 px-3 py-1.5 text-xs sm:text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'hi' ? 'bg-slate-700/50 text-blue-400 font-bold' : 'text-white'}`}
              >
                <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="18" alt="Indian Flag" className="rounded-sm" />
                {t('hindi')}
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('es'); setIsLangMenuOpen(false); }}
                className={`flex items-center gap-3 px-3 py-1.5 text-xs sm:text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'es' ? 'bg-slate-700/50 text-blue-400 font-bold' : 'text-white'}`}
              >
                <img src="https://flagcdn.com/w20/es.png" srcSet="https://flagcdn.com/w40/es.png 2x" width="18" alt="Spanish Flag" className="rounded-sm" />
                {t('spanish')}
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('ar'); setIsLangMenuOpen(false); }}
                className={`flex items-center gap-3 px-3 py-1.5 text-xs sm:text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'ar' ? 'bg-slate-700/50 text-blue-400 font-bold' : 'text-white'}`}
              >
                <img src="https://flagcdn.com/w20/sa.png" srcSet="https://flagcdn.com/w40/sa.png 2x" width="18" alt="Saudi Arabia Flag" className="rounded-sm" />
                {t('arabic')}
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('fr'); setIsLangMenuOpen(false); }}
                className={`flex items-center gap-3 px-3 py-1.5 text-xs sm:text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'fr' ? 'bg-slate-700/50 text-blue-400 font-bold' : 'text-white'}`}
              >
                <img src="https://flagcdn.com/w20/fr.png" srcSet="https://flagcdn.com/w40/fr.png 2x" width="18" alt="French Flag" className="rounded-sm" />
                {t('french')}
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('ja'); setIsLangMenuOpen(false); }}
                className={`flex items-center gap-3 px-3 py-1.5 text-xs sm:text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === 'ja' ? 'bg-slate-700/50 text-blue-400 font-bold' : 'text-white'}`}
              >
                <img src="https://flagcdn.com/w20/jp.png" srcSet="https://flagcdn.com/w40/jp.png 2x" width="18" alt="Japanese Flag" className="rounded-sm" />
                {t('japanese')}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Middle Content: Centered without any overflow */}
      <div className="relative z-10 w-full flex-1 min-h-0 flex flex-col items-center justify-center px-3 py-1 overflow-y-auto sm:overflow-visible">
          {/* Main Content Card - width reduced by a quarter */}
          <div className="text-center p-3.5 sm:p-5 md:p-6 bg-slate-800/85 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-lg md:max-w-xl w-full mx-auto flex-shrink-0">
            <h1 className="text-base min-[360px]:text-lg min-[430px]:text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1 sm:mb-2 animate-fade-in-up leading-tight whitespace-nowrap tracking-tight">
              {t('titleMain')} {t('titleSub')}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 mb-2 sm:mb-4 animate-fade-in-up animation-delay-200">
              {t('subtitle')}
            </p>
            
            {/* 2-column layout on both mobile and desktop to minimize height */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3.5 animate-fade-in-up animation-delay-400">
                {/* Column 1: Learning/Info */}
                <div className="flex flex-col items-center gap-1.5 sm:gap-3 flex-1">
                    <h3 className="text-amber-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm mb-0.5">{t('learn')}</h3>
                    <button
                      onClick={onShowInstructions}
                      className="w-full px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base bg-yellow-400 text-slate-900 font-bold rounded-lg sm:rounded-xl hover:bg-yellow-300 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-yellow-500 active:scale-95 truncate"
                      aria-label="Show game instructions"
                    >
                      {t('howToPlay')}
                    </button>
                    <button
                      onClick={onStartReview}
                      className="w-full px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base bg-yellow-400 text-slate-900 font-bold rounded-lg sm:rounded-xl hover:bg-yellow-300 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-yellow-500 active:scale-95 truncate"
                      aria-label="Review all leaders"
                    >
                      {t('reviewLeaders')}
                    </button>
                    <button
                      onClick={onShowFamilyTree}
                      className="w-full px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base bg-yellow-400 text-slate-900 font-bold rounded-lg sm:rounded-xl hover:bg-yellow-300 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-yellow-500 active:scale-95 truncate"
                      aria-label="View Royal Family Tree"
                    >
                      {t('familyTree')}
                    </button>
                </div>

                {/* Column 2: Play Modes */}
                <div className="flex flex-col items-center gap-1.5 sm:gap-3 flex-1">
                    <h3 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm mb-0.5">{t('play')}</h3>
                    <button
                        onClick={() => onStart('ruler')}
                        className="w-full px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base bg-blue-600 text-white font-bold rounded-lg sm:rounded-xl hover:bg-blue-500 transform active:scale-95 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 truncate"
                    >
                        {t('guessRuler')}
                    </button>
                    <button
                        onClick={() => onStart('year')}
                        className="w-full px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base bg-blue-600 text-white font-bold rounded-lg sm:rounded-xl hover:bg-blue-500 transform active:scale-95 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 truncate"
                    >
                        {t('guessYear')}
                    </button>
                    <button
                        onClick={() => onStart('monarch')}
                        className="w-full px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base bg-blue-600 text-white font-bold rounded-lg sm:rounded-xl hover:bg-blue-500 transform active:scale-95 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 truncate"
                    >
                        {t('guessSuccessor')}
                    </button>
                </div>
            </div>

            {/* Hall of fame */}
            <div className="mt-2.5 sm:mt-5 pt-2 sm:pt-4 border-t border-slate-700/50 flex flex-row items-center justify-center gap-2 animate-fade-in-up animation-delay-600">
              <span className="text-slate-300 font-bold uppercase tracking-widest text-xs sm:text-sm">Hall of Fame &rarr;</span>
              <button 
                onClick={onShowHallOfFame} 
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-amber-500/10 border border-amber-500/30 rounded-full hover:bg-amber-500/20 hover:text-white transition-all duration-200 focus:outline-none group shadow-md"
                title="Hall of Fame"
                aria-label="View Hall of Fame"
              >
                <span className="text-lg sm:text-xl group-hover:scale-125 transition-transform">🥇</span>
              </button>
            </div>
          </div>

          {/* Daily Historical Fact Banner */}
          {dailyFactMonarch && (
            <div className="w-full max-w-lg md:max-w-xl mx-auto px-1 mt-2 sm:mt-3 animate-fade-in-up animation-delay-800 flex-shrink-0">
              <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/80 shadow-lg rounded-xl p-2 sm:p-3 flex flex-row gap-2 sm:gap-3 items-center mx-auto">
                <div className="flex-shrink-0 bg-blue-500/20 text-blue-400 rounded-full p-1.5 hidden sm:block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-grow min-w-0 text-left flex flex-col justify-center">
                  <h4 className="text-[9px] sm:text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-widest mb-0.5">{t('dailyFact') || 'Daily Historical Fact'}</h4>
                  <p className={`text-slate-300 text-[11px] sm:text-xs italic leading-tight line-clamp-2 transition-opacity duration-200 ${isRefreshing ? 'opacity-30' : 'opacity-100'}`}>
                    "{displayFactContext}"
                    <span className="inline-block ml-1 font-semibold text-slate-400 not-italic whitespace-nowrap">— {displayFactName}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRefreshFact}
                  disabled={isRefreshing}
                  className="flex-shrink-0 flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 active:bg-slate-600 text-slate-200 hover:text-amber-300 border border-slate-600 transition-all duration-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-amber-400/40 cursor-pointer shadow group disabled:opacity-50"
                  title={t('refreshFact') || 'Show another historical fact'}
                  aria-label={t('refreshFact') || 'Show another historical fact'}
                >
                  <RefreshCw
                    size={13}
                    className={`transition-transform duration-500 ${isRefreshing ? 'animate-spin text-amber-400' : 'group-hover:rotate-180 text-slate-400 group-hover:text-amber-300'}`}
                  />
                  <span className="hidden sm:inline font-medium text-xs">{t('refresh') || 'Refresh'}</span>
                </button>
              </div>
            </div>
          )}
      </div>

      {/* Footer Links (In-flow flex item to prevent overlapping any content) */}
      <footer className="w-full py-1.5 sm:py-2.5 z-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400 text-[11px] sm:text-xs flex-shrink-0 animate-fade-in animation-delay-1000">
        <button onClick={onShowPrivacy} className="hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:text-white">{t('privacyPolicy')}</button>
        <button onClick={onShowTerms} className="hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:text-white">{t('termsOfService')}</button>
        <a 
          href="mailto:historicaltimelines4@gmail.com?subject=French%20Rulers%20Timeline%20Feedback&body=?" 
          className="hover:text-white underline underline-offset-2 transition-colors focus:outline-none focus:text-white"
        >
          {t('feedback')}
        </a>
      </footer>
    </div>
  );
};

export default StartScreen;
