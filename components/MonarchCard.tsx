
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
    <div className={`bg-slate-800 rounded-2xl shadow-2xl ${compact ? 'p-2.5 sm:p-3 max-w-[210px] sm:max-w-[240px]' : 'p-4 sm:p-6 max-w-sm'} border border-slate-700 flex flex-col items-center w-full transform transition-all duration-500 hover:scale-105 ${styles.cardHover}`}>
      {/* Ornate Frame for the Portrait */}
      <div className={`bg-gradient-to-br from-gray-700 via-gray-800 to-black ${compact ? 'p-1 mb-1.5' : 'p-1 sm:p-2 mb-4'} rounded-lg shadow-lg w-full`}>
        <div 
          className={`relative ${compact ? 'aspect-[3/4] max-h-36 sm:max-h-44' : 'aspect-[3/4]'} w-full rounded-md overflow-hidden bg-slate-700 flex items-center justify-center group shadow-inner`}
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
            <span className="text-slate-400 text-xs">{t('portraitNotAvailable')}</span>
          )}
          {stagedPortraitUrl && (
            <div className={`absolute ${compact ? 'top-1.5 right-1.5 text-[10px] px-1.5 py-0.5' : 'top-2 right-2 text-xs px-2 py-1'} bg-yellow-400 text-yellow-900 font-bold rounded-full shadow-lg pointer-events-none`}>
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
                <div className={`text-center text-white ${compact ? 'p-2' : 'p-4'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${compact ? 'h-6 w-6' : 'h-10 w-10'} mx-auto`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <p className={`mt-1 font-semibold ${compact ? 'text-[10px]' : 'text-xs'}`}>Change Portrait</p>
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
      <div 
        className={`text-center w-full ${compact ? 'mt-1' : 'mt-2 sm:mt-0'}`}
      >
        <h2 className={`${compact ? 'text-sm sm:text-base' : 'text-sm sm:text-3xl'} font-bold text-center text-white pointer-events-none leading-tight`}>{displayName}</h2>
        <p className={`${compact ? 'text-[11px] sm:text-xs mt-0.5' : 'text-xs sm:text-lg mt-0.5 sm:mt-2'} text-slate-400 pointer-events-none line-clamp-1`}>{displayTitle}</p>
        <div className={`${compact ? 'text-[9px] sm:text-[11px] mt-1 px-2 py-0.5' : 'text-[10px] sm:text-sm mt-1 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1'} font-semibold rounded-full inline-flex items-center gap-1 sm:gap-2 ${styles.badge} pointer-events-none`}>
          <HouseIcon house={house} className={compact ? 'h-3 w-3 sm:h-3.5 sm:w-3.5' : 'h-3 w-3 sm:h-5 sm:w-5'} />
          <span>{house}</span>
        </div>
      </div>
      
      {showReign && (
        <p className={`${compact ? 'text-[11px] mt-0.5' : 'text-xs sm:text-md mt-0.5 sm:mt-2'} text-amber-300/80 font-mono text-center`}>
          {reignStart} – {reignEndDisplay} {durationDisplay}
        </p>
      )}

      <div className={`${compact ? 'mt-1.5 pt-1.5' : 'mt-2 sm:mt-4 pt-2 sm:pt-4'} w-full border-t border-slate-700/50 flex justify-center`}>
        <div className={`flex items-center justify-center ${compact ? 'gap-1.5' : 'gap-2 sm:gap-4'}`}>
          <div className={`${compact ? 'w-3 h-3 text-slate-500' : 'w-4 h-4 sm:w-6 sm:h-6 text-slate-400'} animate-rise-up`} aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
          </div>
          <CoatOfArms
              className={compact ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28'}
              imageUrl={monarch.coatOfArmsUrl}
          />
          <div className={`${compact ? 'w-3 h-3 text-slate-500' : 'w-4 h-4 sm:w-6 sm:h-6 text-slate-400'} animate-rise-up`} aria-hidden="true">
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
