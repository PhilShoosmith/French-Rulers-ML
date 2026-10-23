
import React, { useRef } from 'react';
import { Monarch } from '../types';
import HouseIcon from './HouseIcon';
import CoatOfArms from './CoatOfArms';
import { useTranslation } from 'react-i18next';

interface MonarchCardProps {
  monarch: Monarch;
  showReign: boolean;
  isAdmin?: boolean;
  onPortraitUpload?: (monarchId: number, newImageUrl: string) => void;
  stagedPortraitUrl?: string;
  compact?: boolean;
}

const getHouseStyles = (house: string): { badge: string; cardHover: string; } => {
  const housePeriodMap: { [key: string]: string } = {
    'Capet': 'Capetian',
    'Valois': 'Valois',
    'Bourbon': 'Bourbon',
    'Bonaparte': 'Empires & Restoration',
    'Orléans': 'Empires & Restoration',
    'Republic': 'Republics',
  };

  const period = housePeriodMap[house];

  switch (period) {
    case 'Capetian': return { badge: 'bg-blue-500/10 text-blue-300', cardHover: 'hover:border-blue-500/50' };
    case 'Valois': return { badge: 'bg-red-500/10 text-red-300', cardHover: 'hover:border-red-500/50' };
    case 'Bourbon': return { badge: 'bg-amber-500/10 text-amber-300', cardHover: 'hover:border-amber-500/50' };
    case 'Empires & Restoration': return { badge: 'bg-indigo-500/10 text-indigo-300', cardHover: 'hover:border-indigo-500/50' };
    case 'Republics': return { badge: 'bg-green-500/10 text-green-300', cardHover: 'hover:border-green-500/50' };
    default: return { badge: 'bg-slate-700 text-slate-300', cardHover: 'hover:border-slate-600' };
  }
};

const MonarchCard: React.FC<MonarchCardProps> = ({ monarch, showReign, isAdmin, onPortraitUpload, stagedPortraitUrl, compact = false }) => {
  const { t, i18n } = useTranslation();
  // Guard against missing monarch data
  if (!monarch) {
    return null;
  }

  const portraitFileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    portraitFileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onPortraitUpload && monarch) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onPortraitUpload(monarch.id, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { name, nameFr, nameJa, nameZh, nameEs, title, titleFr, titleJa, titleZh, titleEs, house, reignStart, reignEnd } = monarch;
  
  const displayTitle = i18n.language === 'fr' && titleFr ? titleFr : i18n.language === 'ja' && titleJa ? titleJa : i18n.language === 'zh' && titleZh ? titleZh : i18n.language === 'es' && titleEs ? titleEs : i18n.language === 'hi' && monarch.titleHi ? monarch.titleHi : i18n.language === 'ar' && monarch.titleAr ? monarch.titleAr : title;
  const displayName = i18n.language === 'fr' && nameFr ? nameFr : i18n.language === 'ja' && nameJa ? nameJa : i18n.language === 'zh' && nameZh ? nameZh : i18n.language === 'es' && nameEs ? nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : name;
  
  const styles = getHouseStyles(house);
  const displayImageUrl = stagedPortraitUrl || monarch.imageUrl;
  
  const reignEndDisplay = reignEnd ?? t('present');
  let durationDisplay: string;

  if (reignEnd) {
    if (reignEnd === reignStart) {
      durationDisplay = t('lessThanAYear');
    } else {
      const duration = reignEnd - reignStart;
      durationDisplay = `(${duration} ${duration === 1 ? t('year') : t('years')})`;
    }
  } else {
    const currentYear = new Date().getFullYear();
    const duration = currentYear - reignStart;
    durationDisplay = `(${duration} ${duration === 1 ? t('year') : t('years')} ${t('andCounting')})`;
  }
  
  return (
    <div className={`bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl ${compact ? 'p-2 sm:p-2.5 max-w-sm sm:max-w-[220px]' : 'p-2 sm:p-4 md:p-6 max-w-sm'} border border-slate-700 flex flex-row sm:flex-col items-center gap-2.5 sm:gap-0 w-full mx-auto transform transition-all duration-300 hover:scale-[1.02] ${styles.cardHover}`}>
      {/* Ornate Frame for the Portrait */}
      <div className={`bg-gradient-to-br from-gray-700 via-gray-800 to-black p-0.5 sm:p-1.5 rounded-lg shadow-md flex-shrink-0 w-20 h-24 sm:w-full sm:h-auto ${compact ? 'sm:mb-1.5' : 'sm:mb-3'}`}>
        <div 
          className={`relative w-full h-full sm:h-auto ${compact ? 'sm:aspect-[3/4] sm:max-h-36' : 'sm:aspect-[3/4] sm:max-h-48'} rounded-md overflow-hidden bg-slate-700 flex items-center justify-center group shadow-inner`}
        >
          {displayImageUrl ? (
            <img 
              src={displayImageUrl} 
              alt={`Portrait of ${displayName}`} 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              fetchPriority="high"
              key={displayImageUrl}
            />
          ) : (
            <span className="text-slate-400 text-[10px] sm:text-xs">{t('portraitNotAvailable')}</span>
          )}
          {stagedPortraitUrl && (
            <div className="absolute top-1 right-1 text-[9px] sm:text-xs px-1.5 py-0.5 bg-yellow-400 text-yellow-900 font-bold rounded-full shadow-lg pointer-events-none">
              {t('pending')}
            </div>
          )}
          {isAdmin && (
            <>
              <div
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleUploadClick(); }}
                role="button"
                aria-label="Change monarch portrait"
              >
                <div className="text-center text-white p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <p className="mt-0.5 font-semibold text-[9px] sm:text-xs">Change Portrait</p>
                </div>
              </div>
              <input
                type="file"
                ref={portraitFileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </>
          )}
        </div>
      </div>

      {/* Leader Information */}
      <div className="flex-1 min-w-0 flex flex-col items-start sm:items-center text-left sm:text-center w-full">
        <h2 className="text-sm sm:text-base md:text-xl font-bold text-white pointer-events-none leading-tight truncate w-full">{displayName}</h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 pointer-events-none truncate w-full mt-0.5">{displayTitle}</p>
        <div className={`text-[9px] sm:text-[11px] mt-1 px-2 py-0.5 font-semibold rounded-full inline-flex items-center gap-1 ${styles.badge} pointer-events-none`}>
          <HouseIcon house={house} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>{house}</span>
        </div>

        {showReign && (
          <p className="text-[10px] sm:text-xs text-amber-300/90 font-mono mt-0.5 sm:mt-1 truncate w-full">
            {reignStart} – {reignEndDisplay} {durationDisplay}
          </p>
        )}
      </div>

      {/* Coat of arms on mobile: displayed cleanly on the right */}
      <div className="sm:hidden flex-shrink-0 self-center pl-1">
        <CoatOfArms
          className="w-9 h-9"
          imageUrl={monarch.coatOfArmsUrl}
        />
      </div>

      {/* Desktop / Tablet Divider & Coat of Arms */}
      <div className={`hidden sm:flex ${compact ? 'mt-1 pt-1' : 'mt-2.5 pt-2.5'} w-full border-t border-slate-700/50 justify-center`}>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 text-slate-500 animate-rise-up" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
          </div>
          <CoatOfArms
            className={compact ? 'w-9 h-9 sm:w-11 sm:h-11' : 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20'}
            imageUrl={monarch.coatOfArmsUrl}
          />
          <div className="w-3 h-3 text-slate-500 animate-rise-up" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonarchCard;
