
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Monarch } from '../types';
import SearchPopup from './SearchPopup';
import { HISTORICAL_PERIODS } from '../constants';
import { FastForward, Rewind, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// A simplified card specifically for the review screen carousel.
const ReviewMonarchCard: React.FC<{ 
    monarch: Monarch; 
    onLearnMore: (monarch: Monarch) => void; 
    onOpenFamilyTree?: (monarch: Monarch) => void;
}> = ({ monarch, onLearnMore, onOpenFamilyTree }) => {
    const { t, i18n } = useTranslation();
    const reignEndDisplay = monarch.reignEnd ?? t('present');

    const displayName = i18n.language === 'fr' && monarch.nameFr ? monarch.nameFr : i18n.language === 'ja' && monarch.nameJa ? monarch.nameJa : i18n.language === 'zh' && monarch.nameZh ? monarch.nameZh : i18n.language === 'es' && monarch.nameEs ? monarch.nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : monarch.name;
    const displayTitle = i18n.language === 'fr' && monarch.titleFr ? monarch.titleFr : i18n.language === 'ja' && monarch.titleJa ? monarch.titleJa : i18n.language === 'zh' && monarch.titleZh ? monarch.titleZh : i18n.language === 'es' && monarch.titleEs ? monarch.titleEs : i18n.language === 'hi' && monarch.titleHi ? monarch.titleHi : i18n.language === 'ar' && monarch.titleAr ? monarch.titleAr : monarch.title;
    const displayContext = i18n.language === 'fr' && monarch.contextFr ? monarch.contextFr : i18n.language === 'ja' && monarch.contextJa ? monarch.contextJa : i18n.language === 'zh' && monarch.contextZh ? monarch.contextZh : i18n.language === 'es' && monarch.contextEs ? monarch.contextEs : i18n.language === 'hi' && monarch.contextHi ? monarch.contextHi : i18n.language === 'ar' && monarch.contextAr ? monarch.contextAr : monarch.context;

    return (
        <div 
            onClick={() => onLearnMore(monarch)}
            className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-[28rem] sm:h-[32rem] md:h-[40rem] bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col mx-3 sm:mx-6 transition-transform duration-300 hover:!scale-105 hover:shadow-2xl hover:border-blue-500/50 cursor-pointer"
        >
            <div className="relative w-full h-48 sm:h-56 md:h-72 mb-3 md:mb-4">
                <img
                    src={monarch.imageUrl}
                    alt={`Portrait of ${displayName}`}
                    className="w-full h-full object-contain rounded-xl bg-slate-700"
                />
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
                <h3 className="text-xl md:text-2xl font-bold text-white truncate text-center">{displayName}</h3>
                <p className="text-sm md:text-base text-slate-400 text-center">{displayTitle}</p>
                <p className="text-xs md:text-sm font-mono text-amber-300/80 mt-1 md:mt-2 text-center">{monarch.reignStart} – {reignEndDisplay}</p>
                <div className="text-sm md:text-base leading-snug md:leading-relaxed text-slate-300 mt-2 md:mt-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                   <p>{displayContext}</p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-700/60 flex-shrink-0">
                    <span className="text-xs text-blue-400 font-semibold">
                        {t('learn')} →
                    </span>
                    {onOpenFamilyTree && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenFamilyTree(monarch);
                            }}
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors flex items-center gap-1 shadow-sm border ${
                                monarch.house === 'Republic' 
                                    ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30'
                                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
                            }`}
                            title={monarch.house === 'Republic' ? 'Career Path' : t('viewFamilyTree')}
                        >
                            <span>{monarch.house === 'Republic' ? '🏛️' : '👑'}</span> 
                            {monarch.house === 'Republic' ? 'Career' : t('familyTree')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const ReviewScreen: React.FC<{ 
    monarchs: Monarch[]; 
    onBack: () => void; 
    onLearnMore: (monarch: Monarch) => void; 
    onOpenFamilyTree?: (monarch: Monarch) => void;
}> = ({ monarchs, onBack, onLearnMore, onOpenFamilyTree }) => {
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
                const duration = Number(anim.effect?.getTiming().duration) || 0;
                
                // If the animation time gets dangerously close to 0 (meaning we can't scroll backwards much further),
                // we safely jump ahead by 1000 iterations. This is visually seamless because the timeline repeats precisely.
                if (anim.currentTime !== null && duration > 0) {
                    const currentIteration = Math.floor((anim.currentTime as number) / duration);
                    if (currentIteration < 10) {
                        anim.currentTime = (anim.currentTime as number) + (duration * 1000);
                    }
                }

                anim.playbackRate = (animationDirection === 'reverse' ? -1 : 1) * speedMultiplier;
                if (isPaused) {
                    anim.pause();
                } else {
                    anim.play();
                }
            });
        }
    }, [speedMultiplier, animationDirection, isPaused]);

    const handleForward = () => {
        setIsPaused(false);
        if (animationDirection === 'reverse') {
            setAnimationDirection('normal');
            setSpeedMultiplier(1);
        } else {
            setSpeedMultiplier(prev => (prev >= 8 ? 8 : prev === 1 ? 2 : prev * 2));
        }
    };

    const handleReverse = () => {
        setIsPaused(false);
        if (animationDirection === 'normal') {
            setAnimationDirection('reverse');
            setSpeedMultiplier(1);
        } else {
            setSpeedMultiplier(prev => (prev >= 8 ? 8 : prev === 1 ? 2 : prev * 2));
        }
    };

    const handlePlayPause = () => {
        if (isPaused) {
            setIsPaused(false);
            setSpeedMultiplier(1);
        } else {
            setIsPaused(true);
        }
    };

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

                    <div className="text-center flex-grow overflow-hidden px-2 flex flex-col items-center justify-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up truncate w-full">
                            {t('reviewRulers')}
                        </h1>
                        <p className="text-slate-400 text-xs animate-fade-in-up animation-delay-200 mt-1">
                             {isSearching
                                ? <>{t('foundResults', { count: filteredMonarchs.length })} <span className="text-slate-200">{renderActiveFiltersText()}</span>.</>
                                : t('hoverToPause')}
                        </p>
                    </div>

                    <div className="flex justify-end flex-shrink-0 items-center gap-2">
                        {onOpenFamilyTree && (
                            <button
                                onClick={() => onOpenFamilyTree()}
                                className="px-3 sm:px-4 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg inline-flex items-center gap-1.5"
                                title={t('familyTree')}
                            >
                                <span>👑</span>
                                <span className="hidden md:inline">{t('familyTree')}</span>
                            </button>
                        )}
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
            </header>
            
            <main className="w-full flex-grow overflow-y-auto overflow-x-hidden relative flex flex-col">
                {isSearching ? (
                    <div className="w-full flex-grow pt-6 md:pt-8 px-4 pb-8">
                        {filteredMonarchs.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto pb-20">
                                {filteredMonarchs.map((monarch) => (
                                    <ReviewMonarchCard key={monarch.id} monarch={monarch} onLearnMore={onLearnMore} onOpenFamilyTree={onOpenFamilyTree} />
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
                                    <ReviewMonarchCard key={`${monarch.id}-${index}`} monarch={monarch} onLearnMore={onLearnMore} onOpenFamilyTree={onOpenFamilyTree} />
                                ))}
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <div className="mt-4 mx-auto z-40 flex items-center gap-4 bg-slate-800/90 backdrop-blur-xl px-6 py-3 rounded-full border border-slate-600 shadow-2xl animate-fade-in-up">
                            <button 
                                onClick={handleReverse}
                                className={`flex items-center gap-1 p-2 rounded-full transition-all ${animationDirection === 'reverse' && speedMultiplier > 1 ? 'text-blue-400 bg-blue-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
                                title="Rewind"
                            >
                                <Rewind size={18} fill={animationDirection === 'reverse' && speedMultiplier > 1 ? 'currentColor' : 'none'} />
                                {animationDirection === 'reverse' && speedMultiplier > 1 && (
                                    <span className="text-xs font-bold">{speedMultiplier}x</span>
                                )}
                            </button>

                            <button 
                                onClick={handlePlayPause}
                                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all transform hover:scale-110 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                title={isPaused ? "Play" : "Pause"}
                            >
                                {isPaused ? <Play size={18} fill="white" className="ml-1" /> : <Pause size={18} fill="white" />}
                            </button>

                            <button 
                                onClick={handleForward}
                                className={`flex items-center gap-1 p-2 rounded-full transition-all ${animationDirection === 'normal' && speedMultiplier > 1 ? 'text-blue-400 bg-blue-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
                                title="Fast Forward"
                            >
                                {animationDirection === 'normal' && speedMultiplier > 1 && (
                                    <span className="text-xs font-bold">{speedMultiplier}x</span>
                                )}
                                <FastForward size={18} fill={animationDirection === 'normal' && speedMultiplier > 1 ? 'currentColor' : 'none'} />
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
