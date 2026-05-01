
import React, { useState, useEffect, useRef } from 'react';
import { GameMode, Score } from '../types';
import { getTopScores } from '../services/scoreService';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Confetti from './Confetti';

interface HallOfFameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HallOfFameModal: React.FC<HallOfFameModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<GameMode>('year');
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchScores = async () => {
        setIsLoading(true);
        const top = await getTopScores(activeTab);
        setScores(top);
        setIsLoading(false);
      };
      fetchScores();
    }
  }, [isOpen, activeTab]);

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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <Confetti />
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <audio 
          ref={audioRef} 
          loop 
        >
          <source src="https://upload.wikimedia.org/wikipedia/commons/3/30/La_Marseillaise.ogg" type="audio/ogg" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/3/30/La_Marseillaise.ogg/La_Marseillaise.ogg.mp3" type="audio/mpeg" />
        </audio>
        <header className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
              {t('hallOfFame')} 🏆
            </h2>
            <p className="text-slate-400 text-sm mt-1">{t('hallOfFameSubtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600 transition-colors"
              title={isPlaying ? t('pauseAnthem') : t('playAnthem')}
            >
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600 text-white rounded-lg transition-colors font-bold whitespace-nowrap"
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
              className={`flex-1 py-4 text-sm font-bold transition-all duration-300 ${
                activeTab === mode 
                  ? 'text-yellow-400 border-b-2 border-yellow-400 bg-slate-700/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/10'
              }`}
            >
              {modeLabels[mode]}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto flex-grow min-h-[300px] flex flex-col">
          {isLoading ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            </div>
          ) : scores.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-xl">{t('noLegendsYet')}</p>
              <p className="mt-2">{t('beTheFirst')}</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700/50">
                  <th className="py-3 px-4">{t('rank')}</th>
                  <th className="py-3 px-4">{t('player')}</th>
                  <th className="py-3 px-4 text-center">{t('correct')}</th>
                  <th className="py-3 px-4 text-center">{t('timeLeft')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {scores.map((score, index) => (
                  <tr key={index} className="group hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-400">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </td>
                    <td className="py-4 px-4 font-semibold text-white">
                      {score.name}
                      <div className="text-[10px] text-slate-500 font-normal">{new Date(score.date).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-4 text-center text-green-400 font-bold">{score.score}</td>
                    <td className="py-4 px-4 text-center text-yellow-300 font-mono">{score.timeLeft}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer className="p-4 border-t border-slate-700 bg-slate-900/30 flex justify-center">
          <p className="text-xs text-slate-500 italic">{t('scoresRankedBy')}</p>
        </footer>
      </div>
    </div>
  );
};

export default HallOfFameModal;
