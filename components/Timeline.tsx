
import React, { useState, useRef } from 'react';
import { LastYearGuess, Monarch } from '../types';
import { TIMELINE_START_YEAR, TIMELINE_END_YEAR, YEAR_TOLERANCE, HISTORICAL_PERIODS } from '../constants';
import HouseIcon from './HouseIcon';
import { useTranslation } from 'react-i18next';

interface TimelineProps {
  onGuess: (year: number) => void;
  disabled: boolean;
  lastGuess: LastYearGuess | null;
  currentMonarch: Monarch | null;
  previousMonarchs: Monarch[];
}

const periodToHouseMap: { [key: string]: string } = {
  'Capetian': 'Capet',
  'Valois': 'Valois',
  'Bourbon': 'Bourbon',
  'Empires & Restoration': 'Bonaparte',
  'Republics': 'Republic',
};

// Internal component for displaying a marker on the timeline with a tooltip
const TimelineMarker: React.FC<{ monarch: Monarch; leftPercentage: number; isCorrect?: boolean; animate?: boolean }> = ({ monarch, leftPercentage, isCorrect, animate }) => {
    const { t, i18n } = useTranslation();
    const displayName = i18n.language === 'fr' && monarch.nameFr ? monarch.nameFr : i18n.language === 'ja' && monarch.nameJa ? monarch.nameJa : i18n.language === 'zh' && monarch.nameZh ? monarch.nameZh : i18n.language === 'es' && monarch.nameEs ? monarch.nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : monarch.name;
    const displayContext = i18n.language === 'fr' && monarch.contextFr ? monarch.contextFr : i18n.language === 'ja' && monarch.contextJa ? monarch.contextJa : i18n.language === 'zh' && monarch.contextZh ? monarch.contextZh : i18n.language === 'es' && monarch.contextEs ? monarch.contextEs : i18n.language === 'hi' && monarch.contextHi ? monarch.contextHi : i18n.language === 'ar' && monarch.contextAr ? monarch.contextAr : monarch.context;

    return (
        <div 
            className={`absolute top-1/2 -translate-y-1/2 group z-30 ${animate ? 'animate-pop-in-marker animation-delay-200' : ''}`}
            style={{ left: `${leftPercentage}%` }}
        >
            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3 bg-slate-800 text-xs text-white rounded-xl shadow-2xl border border-slate-600 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform scale-95 group-hover:scale-100 origin-bottom">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                         {monarch.imageUrl ? (
                            <img src={monarch.imageUrl} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                             <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                                {displayName.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                         <p className="font-bold text-amber-400">{displayName}</p>
                         <p className="text-[10px] text-slate-400">{monarch.reignStart}</p>
                    </div>
                </div>
                <p className="leading-relaxed text-slate-300">{displayContext}</p>
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
            </div>

            {/* Marker Dot / Avatar */}
            <div className={`relative w-8 h-8 rounded-full shadow-lg border-2 overflow-hidden transition-transform duration-200 group-hover:scale-125 cursor-help ${isCorrect ? 'border-green-400 ring-2 ring-green-500/50' : 'border-slate-400 bg-slate-700'}`}>
                {monarch.imageUrl ? (
                    <img src={monarch.imageUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-slate-800 text-slate-300">
                        {displayName.charAt(0)}
                    </div>
                )}
            </div>
            
            {/* Year Label (only visible on hover or if it's the current answer) */}
            {isCorrect && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-green-500/20 border border-green-500 px-2 py-1 rounded text-sm text-green-300 whitespace-nowrap opacity-100 transition-opacity">
                    {t('correct')}: {monarch.reignStart}
                </div>
            )}
        </div>
    );
};

const Timeline: React.FC<TimelineProps> = ({ onGuess, disabled, lastGuess, currentMonarch, previousMonarchs }) => {
  const { t } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const totalYears = TIMELINE_END_YEAR - TIMELINE_START_YEAR;

  const calculateYearFromX = (x: number) => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    return Math.round(TIMELINE_START_YEAR + percentage * totalYears);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.clientX));
  };

  const handleMouseLeave = () => {
    setHoverYear(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const year = calculateYearFromX(e.clientX);
    onGuess(year);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.touches[0].clientX));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.touches[0].clientX));
  };

  const handleTouchEnd = () => {
    if (disabled || hoverYear === null) return;
    onGuess(hoverYear);
    setHoverYear(null);
  };


  const yearToPercentage = (year: number) => {
    const boundedYear = Math.max(TIMELINE_START_YEAR, Math.min(TIMELINE_END_YEAR, year));
    return ((boundedYear - TIMELINE_START_YEAR) / totalYears) * 100;
  };

  const centuryMarkers = [];
  const startCentury = Math.ceil(TIMELINE_START_YEAR / 100) * 100;
  for (let year = startCentury; year <= TIMELINE_END_YEAR; year += 100) {
    if (year >= TIMELINE_START_YEAR) {
        centuryMarkers.push(year);
    }
  }

  return (
    <div className="w-full py-4 px-2 sm:px-4 relative">
       {/* Historical Periods Background */}
      <div className="relative mb-3 w-full h-10 flex items-center rounded-lg overflow-hidden border border-slate-700">
        {HISTORICAL_PERIODS.map(period => (
            <div 
                key={period.name}
                className={`h-full flex items-center justify-center gap-2 px-2 ${period.color}`}
                style={{
                    position: 'absolute',
                    left: `${yearToPercentage(period.start)}%`,
                    width: `${yearToPercentage(period.end) - yearToPercentage(period.start)}%`,
                }}
            >
                <HouseIcon house={periodToHouseMap[period.name]} className={`h-5 w-5 opacity-80 ${period.textColor}`} />
                <span className={`text-sm font-semibold opacity-80 select-none ${period.textColor}`}>{t(`period_${period.name.replace(' & ', 'And')}`)}</span>
            </div>
        ))}
      </div>

      <div
        ref={timelineRef}
        className="w-full h-3 bg-slate-700 rounded-full cursor-pointer relative touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Wrapper for color segments to enforce rounded corners */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
            {HISTORICAL_PERIODS.map(period => (
                <div
                    key={period.name}
                    aria-hidden="true"
                    className={`absolute top-0 bottom-0 h-full ${period.timelineColor}`}
                    style={{
                        left: `${yearToPercentage(period.start)}%`,
                        width: `${yearToPercentage(period.end) - yearToPercentage(period.start)}%`,
                    }}
                />
            ))}
        </div>
        
        {/* Render markers for previously guessed monarchs */}
        {previousMonarchs.map(monarch => (
             <TimelineMarker 
                key={monarch.id} 
                monarch={monarch} 
                leftPercentage={yearToPercentage(monarch.reignStart)} 
            />
        ))}

        {hoverYear && !disabled && (
          <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20" style={{ left: `${yearToPercentage(hoverYear)}%` }}>
            <div className="h-8 w-1 bg-yellow-400 transform -translate-y-1/2 top-1/2 absolute"></div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-sm text-yellow-300 whitespace-nowrap">{hoverYear}</div>
          </div>
        )}

        {lastGuess && (
          <>
             {/* Correct Range Highlight */}
             <div
                className="absolute top-1/2 -translate-y-1/2 h-5 bg-green-500/30 rounded-full animate-pop-in-marker border border-green-500/50"
                style={{
                    left: `${yearToPercentage(lastGuess.correctYear - YEAR_TOLERANCE)}%`,
                    width: `${(YEAR_TOLERANCE * 2 / totalYears) * 100}%`
                }}
             />

            {/* Correct Answer Marker (now interactive with Tooltip) */}
            {currentMonarch && (
                <TimelineMarker 
                    monarch={currentMonarch}
                    leftPercentage={yearToPercentage(lastGuess.correctYear)}
                    isCorrect={true}
                    animate={true}
                />
            )}

            {/* User Guess Marker */}
            {!lastGuess.isCorrect && !lastGuess.timedOut && (
              <div 
                className="absolute top-1/2 -translate-y-1/2 animate-pop-in-marker animation-delay-400 z-40" 
                style={{ left: `${yearToPercentage(lastGuess.guessedYear)}%` }}
              >
                 <div className="h-8 w-1 bg-red-500 transform -translate-y-1/2 top-1/2 absolute"></div>
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500 px-2 py-1 rounded text-sm text-red-300 whitespace-nowrap">
                   {t('yourGuess')}: {lastGuess.guessedYear}
                 </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Century Markers */}
      <div className="mt-4 w-full h-6 relative">
        {centuryMarkers.map(year => (
          <div
            key={year}
            className="absolute top-0"
            style={{ left: `${yearToPercentage(year)}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-px h-2 bg-slate-600"></div>
            <span className="text-xs text-slate-500 select-none">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
