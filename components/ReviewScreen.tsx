
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Monarch } from '../types';
import SearchPopup from './SearchPopup';
import { HISTORICAL_PERIODS } from '../constants';
import { FastForward, Rewind, Play, Pause, BookOpen, Crown, Landmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// A simplified card specifically for the review screen carousel following the Lord North example.
const ReviewMonarchCard: React.FC<{ 
    monarch: Monarch; 
    onLearnMore: (monarch: Monarch) => void; 
    onOpenFamilyTree?: (monarch: Monarch) => void;
}> = ({ monarch, onLearnMore, onOpenFamilyTree }) => {
    const { t, i18n } = useTranslation();
    const reignEndDisplay = monarch.reignEnd ?? t('present');

    const displayName = i18n.language === 'fr' && monarch.nameFr ? monarch.nameFr : i18n.language === 'ja' && monarch.nameJa ? monarch.nameJa : i18n.language === 'zh' && monarch.nameZh ? monarch.nameZh : i18n.language === 'es' && monarch.nameEs ? monarch.nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : monarch.name;
    const displayContext = i18n.language === 'fr' && monarch.contextFr ? monarch.contextFr : i18n.language === 'ja' && monarch.contextJa ? monarch.contextJa : i18n.language === 'zh' && monarch.contextZh ? monarch.contextZh : i18n.language === 'es' && monarch.contextEs ? monarch.contextEs : i18n.language === 'hi' && monarch.contextHi ? monarch.contextHi : i18n.language === 'ar' && monarch.contextAr ? monarch.contextAr : monarch.context;

    return (
        <div 
            onClick={() => onLearnMore(monarch)}
            className="flex-shrink-0 w-72 sm:w-80 md:w-[320px] h-[460px] sm:h-[490px] md:h-[510px] bg-[#121927] border border-slate-700/80 rounded-2xl shadow-xl p-3.5 sm:p-4 flex flex-col mx-2 sm:mx-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/60 cursor-pointer select-none"
        >
            <div className="relative w-full h-52 sm:h-58 md:h-64 rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800 flex-shrink-0 shadow-inner">
                <img
                    src={monarch.imageUrl}
                    alt={`Portrait of ${displayName}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col flex-grow justify-between min-h-0 pt-2.5 sm:pt-3">
                <div className="flex flex-col flex-shrink-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white text-center tracking-tight truncate px-1">
                        {displayName}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-amber-400 text-center mt-0.5 tracking-wide font-mono">
                        {monarch.reignStart} – {reignEndDisplay}
                    </p>
                </div>
                
                <div className="my-2 sm:my-2.5 flex-grow min-h-0 flex items-start overflow-hidden px-1">
                    <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 text-left line-clamp-3 sm:line-clamp-4">
                        {displayContext}
                    </p>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 sm:gap-2.5 flex-shrink-0">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onLearnMore(monarch);
                        }}
                        className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#14233a] hover:bg-[#1d3252] border border-[#264875] hover:border-blue-400 text-blue-300 hover:text-white transition-all text-xs font-semibold shadow-sm active:scale-95"
                        title={t('learnMore', 'Learn More')}
                    >
                        <BookOpen size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="truncate">{t('learnMore', 'Learn More')}</span>
                    </button>

                    {onOpenFamilyTree ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenFamilyTree(monarch);
                            }}
                            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#251b11] hover:bg-[#382818] border border-[#5d4320] hover:border-amber-400 text-amber-400 hover:text-amber-300 transition-all text-xs font-semibold shadow-sm active:scale-95"
                            title={monarch.house === 'Republic' ? 'Career Path' : t('viewFamilyTree')}
                        >
                            {monarch.house === 'Republic' ? (
                                <Landmark size={14} className="text-amber-400 flex-shrink-0" />
                            ) : (
                                <Crown size={14} className="text-amber-400 flex-shrink-0" />
                            )}
                            <span className="truncate">
                                {monarch.house === 'Republic' ? 'Career' : t('familyTree', 'Family Tree')}
                            </span>
                        </button>
                    ) : (
                        <div />
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
    onOpenFamilyTree?: (monarch?: Monarch) => void;
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
                    <div className="w-full flex-1 flex flex-col justify-between items-center py-2 sm:py-4">
                        <div 
                            className="w-full flex-1 min-h-0 flex items-center overflow-x-hidden py-2 sm:py-3"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onTouchStart={() => setIsPaused(true)}
                            onTouchEnd={() => setIsPaused(false)}
                        >
                            <div 
                                ref={scrollRef}
                                className="flex-shrink-0 flex items-center py-2"
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
                        <div className="my-2 sm:my-3 mx-auto z-40 flex items-center gap-4 bg-slate-800/95 backdrop-blur-xl px-6 py-2.5 sm:py-3 rounded-full border border-slate-600 shadow-2xl animate-fade-in-up flex-shrink-0">
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
