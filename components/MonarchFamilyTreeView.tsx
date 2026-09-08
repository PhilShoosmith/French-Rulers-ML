import React, { useMemo } from 'react';
import { Monarch } from '../types';
import { useTranslation } from 'react-i18next';
import { getMonarchGenealogy } from '../services/genealogyData';

interface MonarchFamilyTreeViewProps {
  selectedMonarch: Monarch;
  allMonarchs: Monarch[];
  onSelectMonarch: (monarch: Monarch) => void;
  onBackToOverview?: () => void;
}

export const MonarchFamilyTreeView: React.FC<MonarchFamilyTreeViewProps> = ({
  selectedMonarch,
  allMonarchs,
  onSelectMonarch,
  onBackToOverview
}) => {
  const { t, i18n } = useTranslation();

  const royalMonarchs = useMemo(() => {
    return allMonarchs.filter(m => m.house !== 'Republic');
  }, [allMonarchs]);

  const genealogy = useMemo(() => {
    return getMonarchGenealogy(selectedMonarch.id);
  }, [selectedMonarch.id]);

  const getMonarchName = (m: Monarch) => {
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const getMonarchTitle = (m: Monarch) => {
    if (i18n.language === 'fr' && m.titleFr) return m.titleFr;
    if (i18n.language === 'ja' && m.titleJa) return m.titleJa;
    if (i18n.language === 'zh' && m.titleZh) return m.titleZh;
    if (i18n.language === 'es' && m.titleEs) return m.titleEs;
    if (i18n.language === 'hi' && m.titleHi) return m.titleHi;
    if (i18n.language === 'ar' && m.titleAr) return m.titleAr;
    return m.title;
  };

  // Find monarch by ID helper
  const findMonarchById = (id?: number) => {
    if (!id) return undefined;
    return allMonarchs.find(m => m.id === id);
  };

  // Predecessor and successor within royal monarchs list
  const currentIndex = royalMonarchs.findIndex(m => m.id === selectedMonarch.id);
  const prevMonarch = currentIndex > 0 ? royalMonarchs[currentIndex - 1] : null;
  const nextMonarch = currentIndex < royalMonarchs.length - 1 ? royalMonarchs[currentIndex + 1] : null;

  const fatherMonarch = findMonarchById(genealogy?.parents?.father?.monarchId);

  return (
    <div className="w-full h-full overflow-y-auto px-3 sm:px-6 py-6 custom-scrollbar text-slate-200">
      {/* Top Bar Controls */}
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-700/70">
        <div className="flex items-center gap-2">
          {onBackToOverview && (
            <button
              onClick={onBackToOverview}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              title={t('allHousesTree')}
            >
              <span>🏛️</span> {t('allHousesTree')}
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => prevMonarch && onSelectMonarch(prevMonarch)}
              disabled={!prevMonarch}
              className={`px-2 py-1 rounded transition-colors ${
                prevMonarch ? 'hover:bg-slate-700 text-slate-300' : 'text-slate-600 cursor-not-allowed'
              }`}
              title={prevMonarch ? getMonarchName(prevMonarch) : ''}
            >
              ← Prev
            </button>
            <span className="text-slate-500 px-1">|</span>
            <button
              onClick={() => nextMonarch && onSelectMonarch(nextMonarch)}
              disabled={!nextMonarch}
              className={`px-2 py-1 rounded transition-colors ${
                nextMonarch ? 'hover:bg-slate-700 text-slate-300' : 'text-slate-600 cursor-not-allowed'
              }`}
              title={nextMonarch ? getMonarchName(nextMonarch) : ''}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Quick Monarch Selector */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial min-w-[200px] sm:min-w-[280px]">
          <label htmlFor="monarch-select" className="text-xs text-slate-400 whitespace-nowrap">
            👑
          </label>
          <select
            id="monarch-select"
            value={selectedMonarch.id}
            onChange={e => {
              const found = allMonarchs.find(m => m.id === Number(e.target.value));
              if (found) onSelectMonarch(found);
            }}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
          >
            {royalMonarchs.map(m => (
              <option key={m.id} value={m.id}>
                {getMonarchName(m)} ({m.reignStart}–{m.reignEnd ?? 'present'}) - {m.house}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* SECTION 1: PARENTS (Ascendants) */}
        {genealogy?.parents && (
          <div className="flex flex-col items-center">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
              <span>🧬</span> {t('parents')}
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {/* Father */}
              {genealogy.parents.father && (
                <div
                  onClick={() => fatherMonarch && onSelectMonarch(fatherMonarch)}
                  className={`bg-slate-800/90 border ${
                    fatherMonarch
                      ? 'border-amber-500/60 hover:border-amber-400 cursor-pointer shadow-md hover:shadow-amber-500/20'
                      : 'border-slate-700'
                  } px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-amber-400 border border-slate-600">
                    👨
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('father')}</span>
                    <p className="text-sm font-semibold text-slate-200 flex items-center gap-1">
                      {genealogy.parents.father.name}
                      {fatherMonarch && <span title={t('becameMonarchBadge')}>👑</span>}
                    </p>
                    {genealogy.parents.father.title && (
                      <p className="text-[11px] text-slate-400">{genealogy.parents.father.title}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Mother */}
              {genealogy.parents.mother && (
                <div className="bg-slate-800/90 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-md">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-purple-400 border border-slate-600">
                    👩
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('mother')}</span>
                    <p className="text-sm font-semibold text-slate-200">{genealogy.parents.mother.name}</p>
                    {genealogy.parents.mother.title && (
                      <p className="text-[11px] text-slate-400">{genealogy.parents.mother.title}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Tree Branch line going down to Monarch */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-slate-600 to-amber-500 mt-2"></div>
          </div>
        )}

        {/* SECTION 2: THE MONARCH (Focal Node) */}
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border-2 border-amber-500/70 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(245,158,11,0.18)] max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Portrait */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg flex-shrink-0 bg-slate-950">
              {selectedMonarch.imageUrl ? (
                <img
                  src={selectedMonarch.imageUrl}
                  alt={getMonarchName(selectedMonarch)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">👑</div>
              )}
              <span className="absolute bottom-1 right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                {selectedMonarch.house}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                  {getMonarchName(selectedMonarch)}
                </h3>
              </div>
              <p className="text-amber-500 text-sm font-semibold tracking-wide uppercase">
                {getMonarchTitle(selectedMonarch)}
              </p>
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-slate-900/80 border border-amber-500/40 rounded-full text-xs font-mono text-amber-200">
                <span>⚔️ {t('reign') || 'Reign'}:</span>
                <span className="font-bold">
                  {selectedMonarch.reignStart} – {selectedMonarch.reignEnd ?? t('present')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                {i18n.language === 'fr' && selectedMonarch.contextFr
                  ? selectedMonarch.contextFr
                  : selectedMonarch.context}
              </p>
            </div>
          </div>
        </div>

        {/* Tree Branch line going down from Monarch to Unions */}
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500 to-slate-600"></div>
          <div className="px-4 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-semibold text-amber-400 shadow-sm">
            {t('spousesAndChildren')}
          </div>
        </div>

        {/* SECTION 3: SPOUSES & CHILDREN */}
        {genealogy && genealogy.unions.length > 0 ? (
          <div className="space-y-8">
            {genealogy.unions.map((union, uIdx) => (
              <div
                key={uIdx}
                className="bg-slate-850/90 border border-slate-700/90 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden"
              >
                {/* Spouse Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center text-lg shadow flex-shrink-0">
                      💍
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                          {genealogy.unions.length > 1 ? `${t('spouses')} #${uIdx + 1}` : t('spouses')}:
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-100">
                          {i18n.language === 'fr' && union.spouse.nameFr
                            ? union.spouse.nameFr
                            : union.spouse.name}
                        </h4>
                      </div>
                      {union.spouse.origin && (
                        <p className="text-xs text-slate-400 mt-0.5">{union.spouse.origin}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {union.spouse.marriageYear && (
                      <span className="text-xs font-mono px-2.5 py-1 bg-slate-800 rounded-md border border-slate-700 text-amber-300/90">
                        {t('marriage')}: {union.spouse.marriageYear}
                      </span>
                    )}
                    <span className="text-xs font-medium px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-md text-amber-400">
                      {union.children.length} {t('knownChildren')}
                    </span>
                  </div>
                </div>

                {union.spouse.notes && (
                  <p className="text-xs text-slate-300/80 italic mt-3 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    ℹ️ {union.spouse.notes}
                  </p>
                )}

                {/* Children from this Marriage */}
                <div className="mt-5">
                  <h5 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
                    <span>👶</span> {t('knownChildren')} ({union.children.length})
                  </h5>

                  {union.children.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {union.children.map((child, cIdx) => {
                        const childMonarch = child.monarchId ? findMonarchById(child.monarchId) : undefined;
                        const isKing = child.becameMonarch || !!childMonarch;

                        return (
                          <div
                            key={cIdx}
                            onClick={() => childMonarch && onSelectMonarch(childMonarch)}
                            className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                              isKing
                                ? 'bg-gradient-to-b from-slate-800 to-amber-950/40 border-amber-500/70 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer hover:scale-[1.02]'
                                : 'bg-slate-800/70 border-slate-700/70 hover:border-slate-600'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                                  {isKing && <span title={t('becameMonarchBadge')}>👑</span>}
                                  {i18n.language === 'fr' && child.nameFr ? child.nameFr : child.name}
                                </span>
                                {child.birthDeath && (
                                  <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800">
                                    {child.birthDeath}
                                  </span>
                                )}
                              </div>

                              {child.title && (
                                <p
                                  className={`text-xs mt-1 leading-snug ${
                                    isKing ? 'text-amber-300 font-medium' : 'text-slate-400'
                                  }`}
                                >
                                  {child.title}
                                </p>
                              )}

                              {child.notes && (
                                <p className="text-[11px] text-slate-400 italic mt-1.5">{child.notes}</p>
                              )}
                            </div>

                            {childMonarch && (
                              <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-400 font-medium">
                                <span>{t('viewFamilyTree')}</span>
                                <span>→</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic p-3 bg-slate-800/30 rounded-lg">
                      {t('noKnownChildren')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center max-w-xl mx-auto">
            <p className="text-amber-400 font-bold text-base mb-1">
              {genealogy?.bioSummary ? 'Historical Dynasty Note' : t('noSpousesRecorded')}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {genealogy?.bioSummary || t('noKnownChildren')}
            </p>
          </div>
        )}

        {/* SECTION 4: OTHER RECOGNIZED / LEGITIMIZED OFFSPRING */}
        {genealogy?.otherChildren && genealogy.otherChildren.length > 0 && (
          <div className="bg-slate-850/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
              <span>🌿</span> {t('legitimizedChildren')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {genealogy.otherChildren.map((child, idx) => (
                <div key={idx} className="bg-slate-800/70 border border-slate-700 p-3 rounded-xl">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-slate-200">
                      {i18n.language === 'fr' && child.nameFr ? child.nameFr : child.name}
                    </span>
                    {child.birthDeath && (
                      <span className="text-[11px] font-mono text-slate-400">{child.birthDeath}</span>
                    )}
                  </div>
                  {child.title && <p className="text-xs text-slate-400 mt-1">{child.title}</p>}
                  {child.notes && <p className="text-[11px] text-slate-500 italic mt-1">{child.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
