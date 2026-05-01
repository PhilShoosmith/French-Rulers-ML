
import React from 'react';
import { useTranslation } from 'react-i18next';

interface CoatOfArmsProps {
  className?: string;
  imageUrl?: string | null;
}

const CoatOfArms: React.FC<CoatOfArmsProps> = ({ className, imageUrl }) => {
  const { t } = useTranslation();
  return (
    <div className={className || ''}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={t('royalCoatOfArms')}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 text-xs text-center p-2">
          {t('coatOfArmsNotAvailable')}
        </div>
      )}
    </div>
  );
};

export default CoatOfArms;
