
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Monarch } from '../types';
import SearchPopup from './SearchPopup';
import { HISTORICAL_PERIODS } from '../constants';
import { FastForward, Rewind, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// A simplified card specifically for the review screen carousel.
const ReviewMonarchCard: React.FC<{ monarch: Monarch; onLearnMore: (monarch: Monarch) => void; }> = ({ monarch, onLearnMore }) => {
    const { t, i18n } = useTranslation();
    const reignEndDisplay = monarch.reignEnd ?? t('present');

    const displayName = i18n.language === 'fr' && monarch.nameFr ? monarch.nameFr : i18n.language === 'ja' && monarch.nameJa ? monarch.nameJa : i18n.language === 'zh' && monarch.nameZh ? monarch.nameZh : i18n.language === 'es' && monarch.nameEs ? monarch.nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : monarch.name;
    const displayTitle = i18n.language === 'fr' && monarch.titleFr ? monarch.titleFr : i18n.language === 'ja' && monarch.titleJa ? monarch.titleJa : i18n.language === 'zh' && monarch.titleZh ? monarch.titleZh : i18n.language === 'es' && monarch.titleEs ? monarch.titleEs : i18n.language === 'hi' && monarch.titleHi ? monarch.titleHi : i18n.language === 'ar' && monarch.titleAr ? monarch.titleAr : monarch.title;
    const displayContext = i18n.language === 'fr' && monarch.contextFr ? monarch.contextFr : i18n.language === 'ja' && monarch.contextJa ? monarch.contextJa : i18n.language === 'zh' && monarch.contextZh ? monarch.contextZh : i18n.language === 'es' && monarch.contextEs ? monarch.contextEs : i18n.language === 'hi' && monarch.contextHi ? monarch.contextHi : i18n.language === 'ar' && monarch.contextAr ? monarch.contextAr : monarch.context;

    return (
        <div 
            onClick={() => onLearnMore(monarch)}
            className="flex-shrink-0 w-56 h-[20rem] bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-3 flex flex-col mx-3 transition-transform duration-300 hover:!scale-105 hover:shadow-2xl hover:border-blue-500/50 cursor-pointer"
        >
            <div className="relative w-full h-36 mb-2">
                <img
                    src={monarch.imageUrl}
                    alt={`Portrait of ${displayName}`}
                    className="w-full h-full object-contain rounded-md bg-slate-700"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
                <h3 className="text-base font-bold text-white truncate text-center">{displayName}</h3>
                <p className="text-xs text-slate-400 text-center">{displayTitle}</p>
                <p className="text-[10px] font-mono text-amber-300/80 mt-1 text-center">{monarch.reignStart} – {reignEndDisplay}</p>
                <div className="text-[10px] leading-tight text-slate-300 mt-1.5 flex-grow overflow-y-auto pr-1">
                   <p>{displayContext}</p>
                </div>
            </div>
        </div>
    );
};

const ReviewScreen: React.FC<{ monarchs: Monarch[]; onBack: () => void; onLearnMore: (monarch: Monarch) => void; }> = ({ monarchs, onBack, onLearnMore }) => {
    const { t, i18n } = useTranslation();
    const [isPaused, setIsPaused] = useState(false);
    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const [filters, setFilters] = useState({ name: '', startDate: '', endDate: '', period: '' });
    const [speedMultiplier, setSpeedMultiplier] = useState(1);
    const [animationDirection, setAnimationDirection] = useState<'normal' | 'reverse'>('normal');
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const isSearching = useMemo(() => {
      return !!(filters.name.trim() || filters.startDate.trim() || filters.endDate.trim() || filters.period.trim());
    }, [filters]);

    const filteredMonarchs = useMemo(() => {
        if (!isSearching) {
            return monarchs;
        }
        
        const nameFilter = filters.name.trim().toLowerCase();
        const startDateFilter = filters.startDate ? parseInt(filters.startDate, 10) : null;
        const endDateFilter = filters.endDate ? parseInt(filters.endDate, 10) : null;
        const periodFilter = filters.period;

        return monarchs.filter(monarch => {
            const displayName = i18n.language === 'fr' && monarch.nameFr ? monarch.nameFr : i18n.language === 'ja' && monarch.nameJa ? monarch.nameJa : i18n.language === 'zh' && monarch.nameZh ? monarch.nameZh : i18n.language === 'es' && monarch.nameEs ? monarch.nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : monarch.name;
            const nameMatch = !nameFilter || displayName.toLowerCase().includes(nameFilter);
            
            const startDateMatch = (startDateFilter === null || isNaN(startDateFilter)) || monarch.reignStart >= startDateFilter;
            const endDateMatch = (endDateFilter === null || isNaN(endDateFilter)) || monarch.reignStart <= endDateFilter;
            
            let periodMatch = true;
            if(periodFilter) {
                const period = HISTORICAL_PERIODS.find(p => p.name === periodFilter);
                periodMatch = period ? (monarch.reignStart >= period.start && monarch.reignStart < period.end) : false;
            }
            
            return nameMatch && startDateMatch && endDateMatch && periodMatch;
        });
    }, [monarchs, filters, isSearching, i18n.language]);

    // Duplicate for seamless looping only when not searching
    const displayMonarchs = !isSearching ? [...monarchs, ...monarchs] : [];
    
    // Base duration for consistent speed (8 seconds per card)
    const baseDuration = monarchs.length * 8;

    useEffect(() => {
        if (scrollRef.current) {
            const animations = scrollRef.current.getAnimations();
            animations.forEach(anim => {
                anim.playbackRate = (animationDirection === 'reverse' ? -1 : 1) * speedMultiplier;
                if (isPaused) {
                    anim.pause();
                } else {
                    anim.play();
                }
            });
        }
    }, [speedMultiplier, animationDirection, isPaused]);

    const renderActiveFiltersText = () => {
        const parts = [];
        if (filters.name) parts.push(`${t('name')}: "${filters.name}"`);
        if (filters.startDate || filters.endDate) {
            const start = filters.startDate || '...';
            const end = filters.endDate || '...';
            parts.push(`${t('date')}: ${start} – ${end}`);
        }
        if (filters.period) parts.push(`${t('period')}: ${filters.period}`);
        
        return parts.join(', ');
    };

    return (
        <div className="w-full h-screen flex flex-col relative overflow-hidden bg-slate-900">
            <header className="z-30 p-3 sm:p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 flex-shrink-0">
                <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
                     <div className="flex justify-start flex-shrink-0">
                        <button
                            onClick={onBack}
                            className="px-3 sm:px-4 py-1.5 text-sm bg-slate-800 border border-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-500/50 z-50"
                        >
                            <span className="hidden md:inline">&lt; {t('backToMenu')}</span>
                            <span className="md:hidden">&lt;</span>
                        </button>
                    </div>

                    <div className="text-center flex-grow overflow-hidden px-2">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up truncate">
                            {t('reviewRulers')}
                        </h1>
                    </div>

                    <div className="flex justify-end flex-shrink-0">
                         <button
                            onClick={() => setIsSearchPopupOpen(true)}
                            className="px-3 sm:px-4 py-1.5 text-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 inline-flex items-center gap-2"
                            aria-label="Open search and filter options"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                            <span className="hidden md:inline">{t('searchFilter')}</span>
                        </button>
                    </div>
                </div>
                
                <div className="w-full text-center mt-2">
                    <p className="text-slate-400 text-xs animate-fade-in-up animation-delay-200">
                         {isSearching
                            ? <>{t('foundResults', { count: filteredMonarchs.length })} <span className="text-slate-200">{renderActiveFiltersText()}</span>.</>
                            : t('hoverToPause')}
                    </p>
                </div>
            </header>
            
            <main className="w-full flex-grow overflow-y-auto overflow-x-hidden relative flex flex-col">
                {isSearching ? (
                    <div className="w-full flex-grow pt-6 md:pt-8 px-4 pb-8">
                        {filteredMonarchs.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto pb-20">
                                {filteredMonarchs.map((monarch) => (
                                    <ReviewMonarchCard key={monarch.id} monarch={monarch} onLearnMore={onLearnMore} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-slate-400 mt-20 animate-fade-in">
                                <h2 className="text-2xl font-bold">{t('noRulersFound')}</h2>
                                <p>{t('tryAdjustingFilters')}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full flex-grow flex flex-col justify-center py-4 md:py-6">
                        <div 
                            className="w-full flex items-start"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onTouchStart={() => setIsPaused(true)}
                            onTouchEnd={() => setIsPaused(false)}
                        >
                            <div 
                                ref={scrollRef}
                                className="flex-shrink-0 flex items-center"
                                style={{ 
                                    animationName: 'scroll',
                                    animationDuration: `${baseDuration}s`,
                                    animationTimingFunction: 'linear',
                                    animationIterationCount: 'infinite'
                                }}
                            >
                                {displayMonarchs.map((monarch, index) => (
                                    <ReviewMonarchCard key={`${monarch.id}-${index}`} monarch={monarch} onLearnMore={onLearnMore} />
                                ))}
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <div className="mt-4 mx-auto z-40 flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-2xl animate-fade-in-up">
                            <button 
                                onMouseDown={() => { setAnimationDirection('reverse'); setSpeedMultiplier(5); }}
                                onMouseUp={() => { setAnimationDirection('normal'); setSpeedMultiplier(1); }}
                                onMouseLeave={() => { setAnimationDirection('normal'); setSpeedMultiplier(1); }}
                                onTouchStart={() => { setAnimationDirection('reverse'); setSpeedMultiplier(5); }}
                                onTouchEnd={() => { setAnimationDirection('normal'); setSpeedMultiplier(1); }}
                                className="p-1 text-slate-300 hover:text-blue-400 transition-colors"
                                title="Fast Reverse (Hold)"
                            >
                                <Rewind size={12} fill={animationDirection === 'reverse' ? 'currentColor' : 'none'} />
                            </button>

                            <button 
                                onClick={() => setIsPaused(!isPaused)}
                                className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all transform hover:scale-110 shadow-lg"
                                title={isPaused ? "Play" : "Pause"}
                            >
                                {isPaused ? <Play size={10} fill="white" /> : <Pause size={10} fill="white" />}
                            </button>

                            <button 
                                onMouseDown={() => { setAnimationDirection('normal'); setSpeedMultiplier(5); }}
                                onMouseUp={() => { setAnimationDirection('normal'); setSpeedMultiplier(1); }}
                                onMouseLeave={() => { setAnimationDirection('normal'); setSpeedMultiplier(1); }}
                                onTouchStart={() => { setAnimationDirection('normal'); setSpeedMultiplier(5); }}
                                onTouchEnd={() => { setAnimationDirection('normal'); setSpeedMultiplier(1); }}
                                className="p-1 text-slate-300 hover:text-blue-400 transition-colors"
                                title="Fast Forward (Hold)"
                            >
                                <FastForward size={12} fill={animationDirection === 'normal' && speedMultiplier > 1 ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <SearchPopup 
              isOpen={isSearchPopupOpen}
              onClose={() => setIsSearchPopupOpen(false)}
              initialFilters={filters}
              onApply={setFilters}
            />
        </div>
    );
};

export default ReviewScreen;
