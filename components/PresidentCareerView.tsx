import React, { useMemo } from 'react';
import { Monarch } from '../types';
import { useTranslation } from 'react-i18next';
import { getPresidentCareer } from '../services/careerData';

interface PresidentCareerViewProps {
  selectedPresident: Monarch;
  allPresidents: Monarch[];
  onSelectPresident: (president: Monarch) => void;
  onBackToOverview?: () => void;
}

export const PresidentCareerView: React.FC<PresidentCareerViewProps> = ({
  selectedPresident,
  allPresidents,
  onSelectPresident,
  onBackToOverview
}) => {
  const { t, i18n } = useTranslation();

  const career = useMemo(() => {
    return getPresidentCareer(selectedPresident.id);
  }, [selectedPresident.id]);

  const getName = (m: Monarch) => {
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const getTitle = (m: Monarch) => {
    if (i18n.language === 'fr' && m.titleFr) return m.titleFr;
    if (i18n.language === 'ja' && m.titleJa) return m.titleJa;
    if (i18n.language === 'zh' && m.titleZh) return m.titleZh;
    if (i18n.language === 'es' && m.titleEs) return m.titleEs;
    if (i18n.language === 'hi' && m.titleHi) return m.titleHi;
    if (i18n.language === 'ar' && m.titleAr) return m.titleAr;
    return m.title;
  };

  // Predecessor and successor within republic list
  const currentIndex = allPresidents.findIndex(m => m.id === selectedPresident.id);
  const prevPresident = currentIndex > 0 ? allPresidents[currentIndex - 1] : null;
  const nextPresident = currentIndex < allPresidents.length - 1 ? allPresidents[currentIndex + 1] : null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'education': return '🎓';
      case 'military': return '⚔️';
      case 'civil': return '🏛️';
      case 'political': return '🗳️';
      default: return '📜';
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-3 sm:px-6 py-6 custom-scrollbar text-slate-200">
      {/* Top Bar Controls */}
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-700/70">
        <div className="flex items-center gap-2">
          {onBackToOverview && (
            <button
              onClick={onBackToOverview}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              title={t('allHousesTree')}
            >
              <span>🏛️</span> {t('allHousesTree')}
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => prevPresident && onSelectPresident(prevPresident)}
              disabled={!prevPresident}
              className={`px-2 py-1 rounded transition-colors ${
                prevPresident ? 'hover:bg-slate-700 text-slate-300' : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              ← Prev
            </button>
            <span className="text-slate-500 px-1">|</span>
            <button
              onClick={() => nextPresident && onSelectPresident(nextPresident)}
              disabled={!nextPresident}
              className={`px-2 py-1 rounded transition-colors ${
                nextPresident ? 'hover:bg-slate-700 text-slate-300' : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Quick Selector */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial min-w-[200px] sm:min-w-[280px]">
          <label htmlFor="president-select" className="text-xs text-slate-400 whitespace-nowrap">
            🇫🇷
          </label>
          <select
            id="president-select"
            value={selectedPresident.id}
            onChange={e => {
              const found = allPresidents.find(m => m.id === Number(e.target.value));
              if (found) onSelectPresident(found);
            }}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-blue-500 font-medium"
          >
            {allPresidents.map(m => (
              <option key={m.id} value={m.id}>
                {getName(m)} ({m.reignStart}–{m.reignEnd ?? 'present'})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* SECTION 1: THE PRESIDENT */}
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border-2 border-blue-500/50 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(59,130,246,0.15)] mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Portrait */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-blue-400 shadow-lg flex-shrink-0 bg-slate-950">
              {selectedPresident.imageUrl ? (
                <img
                  src={selectedPresident.imageUrl}
                  alt={getName(selectedPresident)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">🇫🇷</div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-1">
                {getName(selectedPresident)}
              </h3>
              <p className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
                {getTitle(selectedPresident)}
              </p>
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-slate-900/80 border border-blue-500/40 rounded-full text-xs font-mono text-blue-200">
                <span>🇫🇷 {t('reign') || 'Term'}:</span>
                <span className="font-bold">
                  {selectedPresident.reignStart} – {selectedPresident.reignEnd ?? t('present')}
                </span>
              </div>
              
              {career.educationSummary && (
                <div className="mt-3 flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-lg">🎓</span>
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-slate-400 block uppercase tracking-wider mb-0.5">Education</span>
                    {i18n.language === 'fr' && career.educationSummaryFr ? career.educationSummaryFr : career.educationSummary}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: CAREER TIMELINE */}
        <div className="mt-10 relative">
          <h4 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-6 text-center">
            Career Path
          </h4>
          
          <div className="relative border-l-2 border-slate-700/80 ml-6 sm:ml-8 space-y-8">
            {career.stages.map((stage, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-10">
                {/* Timeline Dot */}
                <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)] z-10 text-sm">
                  {getTypeIcon(stage.type)}
                </div>

                <div className="bg-slate-850/80 border border-slate-700/80 rounded-xl p-4 sm:p-5 shadow-md hover:border-blue-500/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h5 className="text-lg font-bold text-slate-100">
                      {i18n.language === 'fr' && stage.roleFr ? stage.roleFr : stage.role}
                    </h5>
                    <div className="font-mono text-xs font-semibold bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded border border-blue-500/20 whitespace-nowrap self-start sm:self-auto">
                      {stage.yearStart} {stage.yearEnd ? `– ${stage.yearEnd}` : ''}
                    </div>
                  </div>
                  
                  {(stage.organization || stage.organizationFr) && (
                    <p className="text-sm font-semibold text-indigo-400 mb-2">
                      {i18n.language === 'fr' && stage.organizationFr ? stage.organizationFr : stage.organization}
                    </p>
                  )}
                  
                  {(stage.description || stage.descriptionFr) && (
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                      {i18n.language === 'fr' && stage.descriptionFr ? stage.descriptionFr : stage.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Final Presidency Stage */}
            <div className="relative pl-8 sm:pl-10">
                <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-blue-600 border-2 border-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10 text-sm">
                  👑
                </div>
                <div className="bg-gradient-to-r from-blue-900/40 to-slate-850 border border-blue-500/50 rounded-xl p-4 sm:p-5 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h5 className="text-lg font-bold text-white">
                      {getTitle(selectedPresident)}
                    </h5>
                    <div className="font-mono text-xs font-semibold bg-blue-500 text-white px-2.5 py-1 rounded shadow-md whitespace-nowrap self-start sm:self-auto">
                      {selectedPresident.reignStart} – {selectedPresident.reignEnd ?? 'present'}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                     {i18n.language === 'fr' && selectedPresident.contextFr
                        ? selectedPresident.contextFr
                        : selectedPresident.context}
                  </p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
