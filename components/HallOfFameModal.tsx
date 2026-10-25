
import React, { useState, useEffect, useRef } from 'react';
import { GameMode, Score, Timeframe } from '../types';
import { getTopScores } from '../services/scoreService';
import { Volume2, VolumeX, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Confetti from './Confetti';

interface HallOfFameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HallOfFameModal: React.FC<HallOfFameModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<GameMode>('year');
  const [timeframe, setTimeframe] = useState<Timeframe>('all');
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchScores = async () => {
        setIsLoading(true);
        const top = await getTopScores(activeTab, timeframe);
        setScores(top);
        setIsLoading(false);
      };
      fetchScores();
    }
  }, [isOpen, activeTab, timeframe]);

  useEffect(() => {
    if (isOpen) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.log("Audio autoplay prevented:", e);
          setIsPlaying(false);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isOpen]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log("Audio play prevented:", e));
      }
    }
  };

  if (!isOpen) return null;

  const modeLabels: Record<GameMode, string> = {
    year: t('guessYear'),
    monarch: t('guessSuccessor'),
    ruler: t('guessRuler')
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4 animate-fade-in overflow-hidden"
      onClick={onClose}
    >
      <Confetti />
      <div
        className="bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[94vh] sm:max-h-[90vh] flex flex-col animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <audio 
          ref={audioRef} 
          loop 
        >
          <source src="https://upload.wikimedia.org/wikipedia/commons/3/30/La_Marseillaise.ogg" type="audio/ogg" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/3/30/La_Marseillaise.ogg/La_Marseillaise.ogg.mp3" type="audio/mpeg" />
        </audio>
        <header className="p-3 sm:p-5 border-b border-slate-700 flex flex-col md:flex-row justify-between items-center gap-2.5 sm:gap-4">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 whitespace-nowrap">
              <span className="text-amber-500 mr-1.5 drop-shadow-sm">🏆</span>{t('hallOfFame')}
            </h2>
          </div>

          <div className="flex-1 flex justify-center w-full md:w-auto">
            <div className="flex bg-slate-900/50 p-0.5 sm:p-1 rounded-lg border border-slate-700/50 max-w-full overflow-x-auto no-scrollbar">
              {(['week', 'month', 'all'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-xs rounded-md font-medium transition-colors whitespace-nowrap ${
                    timeframe === tf
                      ? 'bg-amber-500/20 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  {tf === 'week' ? t('lastWeek', 'Last Week') : tf === 'month' ? t('lastMonth', 'Last Month') : t('allTime', 'All-Time Greats')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
            <button
              onClick={togglePlay}
              className="p-1.5 sm:p-2 rounded-full bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600 transition-colors"
              title={isPlaying ? t('pauseAnthem') : t('playAnthem')}
            >
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-700/50 hover:bg-slate-600 text-white rounded-lg transition-colors font-bold text-xs sm:text-sm whitespace-nowrap"
            >
              {t('backToStart', 'Back to Start')}
            </button>
          </div>
        </header>

        <div className="flex border-b border-slate-700">
          {(['year', 'monarch', 'ruler'] as GameMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setActiveTab(mode)}
              className={`flex-1 py-2.5 sm:py-3 px-1 sm:px-3 text-xs sm:text-sm font-bold transition-all duration-300 text-center truncate ${
                activeTab === mode 
                  ? 'text-yellow-400 border-b-2 border-yellow-400 bg-slate-700/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/10'
              }`}
            >
              {modeLabels[mode]}
            </button>
          ))}
        </div>

        <div className="p-2 sm:p-4 md:p-6 overflow-y-auto overflow-x-hidden flex-grow min-h-[240px] sm:min-h-[300px] flex flex-col w-full">
          {isLoading ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
            </div>
          ) : scores.length === 0 ? (
            <div className="text-center py-10 sm:py-12 text-slate-500">
              <p className="text-base sm:text-xl">{t('noLegendsYet')}</p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm">{t('beTheFirst')}</p>
            </div>
          ) : (
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[28%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead>
                <tr className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider border-b border-slate-700/50">
                  <th className="py-2 sm:py-3 px-1 sm:px-2 text-center sm:text-left">{t('rank')}</th>
                  <th className="py-2 sm:py-3 px-1 sm:px-2 text-left">{t('player')}</th>
                  <th className="py-2 sm:py-3 px-1 sm:px-2 text-center">{t('correct')}</th>
                  <th className="py-2 sm:py-3 px-1 sm:px-2 text-center">{t('timeLeft')}</th>
                  <th className="py-2 sm:py-3 px-1 sm:px-2 text-center sm:text-right">{t('date')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {scores.map((score, index) => (
                  <tr key={index} className="group hover:bg-slate-700/20 transition-colors">
                    <td className="py-2 sm:py-3 px-1 sm:px-2 font-bold text-slate-400 text-center sm:text-left text-xs sm:text-sm">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm font-semibold text-white overflow-hidden">
                      <div className="truncate" title={score.name}>{score.name}</div>
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-center text-green-400 font-bold text-xs sm:text-sm whitespace-nowrap">
                      {score.score}
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-center text-yellow-300 font-mono text-xs sm:text-sm whitespace-nowrap">
                      {score.timeLeft}s
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-center sm:text-right text-slate-400 font-mono text-[10px] sm:text-xs whitespace-nowrap">
                      {new Date(score.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer className="p-2.5 sm:p-4 border-t border-slate-700 bg-slate-900/30 flex justify-center text-center">
          <p className="text-[10px] sm:text-xs text-slate-500 italic">{t('scoresRankedBy')}</p>
        </footer>
      </div>
    </div>
  );
};

export default HallOfFameModal;
