
import React, { useState, useEffect } from 'react';
import { HISTORICAL_PERIODS } from '../constants';
import { useTranslation } from 'react-i18next';

interface Filters {
    name: string;
    startDate: string;
    endDate: string;
    period: string;
}

interface SearchPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: Filters) => void;
    initialFilters: Filters;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose, onApply, initialFilters }) => {
    const { t } = useTranslation();
    const [localFilters, setLocalFilters] = useState<Filters>(initialFilters);

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(initialFilters);
        }
    }, [isOpen, initialFilters]);

    if (!isOpen) return null;

    const handleApply = () => {
        onApply(localFilters);
        onClose();
    };

    const handleClear = () => {
        onApply({ name: '', startDate: '', endDate: '', period: '' });
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleApply();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };
    
    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-popup-title"
        >
            <div 
                className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-lg w-full flex flex-col animate-scale-in" 
                onClick={e => e.stopPropagation()}
                onKeyDown={handleKeyDown}
            >
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <h2 id="search-popup-title" className="text-xl font-bold text-white">
                      {t('advancedSearch')}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold"
                        aria-label={t('close')}
                    >
                        &times;
                    </button>
                </header>
                <div className="p-6 space-y-6">
                    {/* Search Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">{t('searchName')}</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={localFilters.name} 
                            onChange={handleInputChange} 
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder={t('egLouisXIV')} 
                        />
                    </div>

                    {/* Search Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{t('searchByReignStart')}</label>
                        <div className="flex items-center gap-4">
                            <input 
                                type="number" 
                                name="startDate" 
                                value={localFilters.startDate} 
                                onChange={handleInputChange} 
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder={t('fromYear')} 
                                aria-label={t('startDate')}
                            />
                            <span className="text-slate-400 flex-shrink-0">-</span>
                            <input 
                                type="number" 
                                name="endDate" 
                                value={localFilters.endDate} 
                                onChange={handleInputChange} 
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder={t('toYear')} 
                                aria-label={t('endDate')}
                            />
                        </div>
                    </div>

                    {/* Search Period */}
                    <div>
                        <label htmlFor="period" className="block text-sm font-medium text-slate-300 mb-2">{t('searchPeriod')}</label>
                        <select 
                            name="period" 
                            id="period" 
                            value={localFilters.period} 
                            onChange={handleInputChange} 
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">{t('allPeriods')}</option>
                            {HISTORICAL_PERIODS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                </div>
                <footer className="p-4 flex justify-end items-center gap-4 border-t border-slate-700">
                    <button 
                        onClick={handleClear} 
                        className="px-6 py-2 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        {t('clearFilters')}
                    </button>
                    <button 
                        onClick={handleApply} 
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {t('applyFilters')}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SearchPopup;
