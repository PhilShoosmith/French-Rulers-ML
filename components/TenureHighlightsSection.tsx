import React from 'react';
import { Monarch } from '../types';
import { useTranslation } from 'react-i18next';
import { getTenureData } from '../services/tenureData';

interface TenureHighlightsSectionProps {
  monarch: Monarch;
  theme?: 'royal' | 'republic';
}

export const TenureHighlightsSection: React.FC<TenureHighlightsSectionProps> = ({
  monarch,
  theme = 'royal'
}) => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';

  const tenureData = React.useMemo(() => {
    return getTenureData(monarch);
  }, [monarch]);

  const isRepublic = theme === 'republic' || monarch.house === 'Republic';

  // Styling accents based on theme
  const accentBorder = isRepublic ? 'border-blue-500/40 hover:border-blue-500/70' : 'border-amber-500/40 hover:border-amber-500/70';
  const headerGradient = isRepublic
    ? 'from-blue-400 via-indigo-300 to-sky-400'
    : 'from-amber-300 via-yellow-200 to-amber-500';
  const badgeBg = isRepublic ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30';
  const colBorder = isRepublic ? 'border-blue-500/20' : 'border-amber-500/20';

  const tenureYears = `${monarch.reignStart} – ${monarch.reignEnd ?? (isFrench ? 'présent' : 'present')}`;

  const highlights = isFrench && tenureData.highlightsFr?.length
    ? tenureData.highlightsFr
    : tenureData.highlights;

  return (
    <div className={`mt-10 rounded-2xl bg-gradient-to-br from-slate-850 via-slate-900 to-slate-950 p-5 sm:p-7 border ${accentBorder} shadow-2xl transition-all duration-300 space-y-7`}>
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{isRepublic ? '🏛️' : '👑'}</span>
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${headerGradient}`}>
              {t('tenureHighlights', 'Tenure Highlights')}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {isFrench
              ? `Temps forts historiques et dirigeants contemporains durant cette période (${tenureYears})`
              : `Key historical milestones and contemporary world leaders in power (${tenureYears})`}
          </p>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono font-semibold ${badgeBg} self-start sm:self-auto`}>
          <span>🇫🇷</span>
          <span>{tenureYears}</span>
        </div>
      </div>

      {/* PART 1: KEY HIGHLIGHTS DURING PERIOD IN OFFICE */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span>📜</span>
          <span>{t('keyEventsDuringTenure') || (isFrench ? 'Faits marquants & réalisations' : 'Key Highlights & Milestones')}</span>
        </h4>
        <div className="grid grid-cols-1 gap-2.5">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800/90 transition-colors"
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${isRepublic ? 'bg-blue-600/30 text-blue-300' : 'bg-amber-600/30 text-amber-300'}`}>
                {idx + 1}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PART 2: WHO WAS IN POWER AT THAT TIME (UK & US CONTEMPORARIES) */}
      <div>
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span>🌐</span>
            <span>{t('whoWasInPower') || (isFrench ? 'Qui gouvernait à cette époque ? (Royaume-Uni & États-Unis)' : 'Who Was in Power at That Time (UK & US)')}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {isFrench
              ? `Souverains et chefs de gouvernement en fonction au Royaume-Uni et aux États-Unis durant son mandat.`
              : `Contemporary heads of state and government serving in Britain and the United States during this period.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* COLUMN 1: UK MONARCHS */}
          <div className={`bg-slate-800/70 rounded-xl p-4 border ${colBorder} flex flex-col`}>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-700/70">
              <div className="flex items-center gap-2">
                <span className="text-lg">👑</span>
                <span className="font-bold text-sm text-slate-100">
                  {t('ukMonarchsTitle') || (isFrench ? 'Monarques britanniques' : 'UK Monarchs')}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-amber-300 border border-amber-500/20">
                🇬🇧 UK
              </span>
            </div>

            {tenureData.ukMonarchs.length > 0 ? (
              <div className="space-y-2 flex-1 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                {tenureData.ukMonarchs.map((ldr, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/50 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {isFrench && ldr.nameFr ? ldr.nameFr : ldr.name}
                    </span>
                    <span className="text-[11px] font-mono text-amber-300/90 whitespace-nowrap bg-slate-950/70 px-1.5 py-0.5 rounded border border-slate-800">
                      {ldr.years}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-900/40 rounded-lg text-xs text-slate-400 italic text-center flex-1 flex items-center justify-center">
                {isFrench ? 'Aucun monarque correspondant' : 'No recorded overlapping monarchs'}
              </div>
            )}
          </div>

          {/* COLUMN 2: UK PRIME MINISTERS */}
          <div className={`bg-slate-800/70 rounded-xl p-4 border ${colBorder} flex flex-col`}>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-700/70">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏛️</span>
                <span className="font-bold text-sm text-slate-100">
                  {t('ukPrimeMinistersTitle') || (isFrench ? 'Premiers ministres britanniques' : 'UK Prime Ministers')}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-sky-300 border border-sky-500/20">
                🇬🇧 PM
              </span>
            </div>

            {tenureData.ukPrimeMinisters.length > 0 ? (
              <div className="space-y-2 flex-1 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                {tenureData.ukPrimeMinisters.map((ldr, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/50 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {isFrench && ldr.nameFr ? ldr.nameFr : ldr.name}
                    </span>
                    <span className="text-[11px] font-mono text-sky-300/90 whitespace-nowrap bg-slate-950/70 px-1.5 py-0.5 rounded border border-slate-800">
                      {ldr.years}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-900/40 rounded-lg text-xs text-slate-400 italic text-center flex-1 flex items-center justify-center">
                {isFrench
                  ? (tenureData.prePmNoteFr || "Fonction non encore créée (créée en 1721).")
                  : (tenureData.prePmNote || "Office not yet created (established 1721).")}
              </div>
            )}
          </div>

          {/* COLUMN 3: US PRESIDENTS */}
          <div className={`bg-slate-800/70 rounded-xl p-4 border ${colBorder} flex flex-col`}>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-700/70">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span>
                <span className="font-bold text-sm text-slate-100">
                  {t('usPresidentsTitle') || (isFrench ? 'Présidents des États-Unis' : 'US Presidents')}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-emerald-300 border border-emerald-500/20">
                🇺🇸 USA
              </span>
            </div>

            {tenureData.usPresidents.length > 0 ? (
              <div className="space-y-2 flex-1 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                {tenureData.usPresidents.map((ldr, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/50 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {isFrench && ldr.nameFr ? ldr.nameFr : ldr.name}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-300/90 whitespace-nowrap bg-slate-950/70 px-1.5 py-0.5 rounded border border-slate-800">
                      {ldr.years}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-900/40 rounded-lg text-xs text-slate-400 italic text-center flex-1 flex items-center justify-center">
                {isFrench
                  ? (tenureData.prePresNoteFr || "Présidence non encore établie (créée en 1789).")
                  : (tenureData.prePresNote || "Office established in 1789 under the US Constitution.")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenureHighlightsSection;
