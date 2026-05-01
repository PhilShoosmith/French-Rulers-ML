
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
          <h2 id="terms-modal-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t('termsOfService')}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold"
            aria-label={t('close')}
          >
            &times;
          </button>
        </header>
        <div className="p-6 overflow-y-auto text-slate-300 space-y-4 text-sm md:text-base">
          <p className="text-slate-400 text-xs">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>
          
          <h3 className="font-bold text-lg text-white mt-4">1. {t('agreementToTerms')}</h3>
          <p>{t('termsAgreement')}</p>

          <h3 className="font-bold text-lg text-white mt-4">2. {t('useLicense')}</h3>
          <p>{t('termsLicense')}</p>

          <h3 className="font-bold text-lg text-white mt-4">3. {t('disclaimer')}</h3>
          <p>{t('termsDisclaimer')}</p>

          <h3 className="font-bold text-lg text-white mt-4">4. {t('limitations')}</h3>
          <p>{t('termsLimitations')}</p>

           <h3 className="font-bold text-lg text-white mt-4">5. {t('educationalPurpose')}</h3>
          <p>{t('termsEducational')}</p>
        </div>
         <footer className="p-4 flex justify-end border-t border-slate-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
              {t('close')}
            </button>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfServiceModal;
