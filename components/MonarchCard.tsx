
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
  hideName?: boolean;
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

const MonarchCard: React.FC<MonarchCardProps> = ({ monarch, showReign, isAdmin, onPortraitUpload, stagedPortraitUrl, compact = false, hideName = false }) => {
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
  
  const rawTitle = i18n.language === 'fr' && titleFr ? titleFr : i18n.language === 'ja' && titleJa ? titleJa : i18n.language === 'zh' && titleZh ? titleZh : i18n.language === 'es' && titleEs ? titleEs : i18n.language === 'hi' && monarch.titleHi ? monarch.titleHi : i18n.language === 'ar' && monarch.titleAr ? monarch.titleAr : title;
  const rawName = i18n.language === 'fr' && nameFr ? nameFr : i18n.language === 'ja' && nameJa ? nameJa : i18n.language === 'zh' && nameZh ? nameZh : i18n.language === 'es' && nameEs ? nameEs : i18n.language === 'hi' && monarch.nameHi ? monarch.nameHi : i18n.language === 'ar' && monarch.nameAr ? monarch.nameAr : name;

  const displayName = hideName ? '???' : rawName;
  const displayTitle = hideName ? (t('whichRuler') || 'Which French Leader?') : rawTitle;

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
    <div className={`bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl ${compact ? 'p-1.5 sm:p-2.5 max-w-[200px] min-[380px]:max-w-[220px] sm:max-w-[240px]' : 'p-2 sm:p-3 max-w-[220px] sm:max-w-sm'} border border-slate-700 flex flex-col items-center w-full mx-auto transform transition-all duration-300 hover:scale-[1.02] ${styles.cardHover}`}>
      {/* Ornate Frame for the Portrait - centered at the top */}
      <div className={`bg-gradient-to-br from-gray-700 via-gray-800 to-black p-0.5 sm:p-1 rounded-lg shadow-md flex-shrink-0 w-24 h-28 min-[380px]:w-28 min-[380px]:h-32 sm:w-full sm:h-auto sm:aspect-[3/4] sm:max-h-28 md:sm:max-h-32 mb-1 sm:mb-1.5`}>
        <div 
          className="relative w-full h-full rounded-md overflow-hidden bg-slate-700 flex items-center justify-center group shadow-inner"
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
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

      {/* Leader Information: shown below the image */}
      <div className="w-full flex flex-col items-center text-center">
        <h2 className="text-xs sm:text-sm md:text-base font-bold text-white pointer-events-none leading-tight truncate w-full px-1">{displayName}</h2>
        <p className="text-[10px] sm:text-xs text-slate-400 pointer-events-none truncate w-full mt-0.5">{displayTitle}</p>
        
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <div className={`text-[9px] sm:text-[10px] px-2 py-0.5 font-semibold rounded-full inline-flex items-center gap-1 ${styles.badge} pointer-events-none`}>
            <HouseIcon house={house} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>{house}</span>
          </div>
          {monarch.coatOfArmsUrl && (
            <CoatOfArms
              className="w-5 h-5 sm:w-6 sm:h-6"
              imageUrl={monarch.coatOfArmsUrl}
            />
          )}
        </div>

        {showReign && !hideName && (
          <p className="text-[9px] sm:text-[11px] text-amber-300/90 font-mono mt-0.5 truncate w-full">
            {reignStart} – {reignEndDisplay} {durationDisplay}
          </p>
        )}
      </div>
    </div>
  );
};

export default MonarchCard;
