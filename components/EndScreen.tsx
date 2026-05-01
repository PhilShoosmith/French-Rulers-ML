
import React, { useState, useEffect } from 'react';
import { ROUNDS_PER_GAME } from '../constants';
import { GameMode, Score } from '../types';
import { isTopScore, saveScore } from '../services/scoreService';
import { useTranslation } from 'react-i18next';

interface EndScreenProps {
  score: number;
  totalTimeLeft: number;
  mode: GameMode;
  onRestart: () => void;
  onViewHallOfFame: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, totalTimeLeft, mode, onRestart, onViewHallOfFame }) => {
  const { t } = useTranslation();
  const [displayScore, setDisplayScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);
  const [isCheckingScore, setIsCheckingScore] = useState(true);

  useEffect(() => {
    const checkScore = async () => {
      setIsCheckingScore(true);
      const isTop = await isTopScore(mode, score, totalTimeLeft);
      setShowSubmission(isTop);
      setIsCheckingScore(false);
    };
    checkScore();
  }, [mode, score, totalTimeLeft]);

  const getTitleAndMessage = () => {
    const percentage = (score / ROUNDS_PER_GAME) * 100;
    if (percentage === 100) return { title: "A Royal Historian!", message: "Perfect score! Your knowledge of the monarchy is truly impeccable." };
    if (percentage >= 80) return { title: "Noble Scholar!", message: "An impressive performance! You know your kings and queens." };
    if (percentage >= 50) return { title: "Court Contender", message: "A respectable score. You're well on your way to mastering royal history." };
    if (percentage >= 20) return { title: "Village Commoner", message: "A good start, but there's more to learn about the Crown." };
    return { title: "A Humble Subject", message: "Don't be discouraged! History is a vast kingdom to explore. Try again!" };
  };

  const { title, message } = getTitleAndMessage();

  useEffect(() => {
    if (score === 0) {
        setDisplayScore(0);
        return;
    };
    let currentScore = 0;
    const timer = setInterval(() => {
      currentScore += 1;
      if (currentScore > score) {
        clearInterval(timer);
        setDisplayScore(score);
      } else {
        setDisplayScore(currentScore);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [score]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    const newScore: Score = {
      name: playerName.trim(),
      score,
      timeLeft: totalTimeLeft,
      mode,
      date: new Date().toISOString()
    };

    await saveScore(newScore);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900 opacity-80"></div>
      <div className="relative text-center p-8 bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 max-w-lg mx-auto z-10 animate-fade-in-up">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-2 animate-fade-in-up animation-delay-200">
          {t('gameOver')}
        </h2>
        <h3 className="text-3xl font-bold text-slate-200 mb-4 animate-fade-in-up animation-delay-400">{title}</h3>
        <p className="text-lg text-slate-300 mb-6 animate-fade-in-up animation-delay-600">
            {message}
        </p>

        <div className="w-full bg-slate-900/50 rounded-lg p-4 my-8 flex justify-around text-center animate-fade-in-up animation-delay-800">
          <div className="px-4">
              <p className="text-5xl font-bold text-green-400 transition-all duration-300">{displayScore}</p>
              <p className="text-slate-400 mt-1 text-sm uppercase tracking-wider">{t('correct')}</p>
          </div>
          <div className="border-l border-slate-700"></div>
          <div className="px-4">
              <p className="text-5xl font-bold text-yellow-400 transition-all duration-300">{totalTimeLeft}s</p>
              <p className="text-slate-400 mt-1 text-sm uppercase tracking-wider">{t('timeBonus')}</p>
          </div>
        </div>

        {!isCheckingScore && showSubmission && !isSubmitted && (
          <div className="mb-8 p-6 bg-yellow-400/10 border border-yellow-400/30 rounded-xl animate-scale-in">
            <h4 className="text-yellow-400 font-bold text-lg mb-2">{t('newGlobalHighScore')}</h4>
            <p className="text-slate-300 text-sm mb-4">{t('enterName')}</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                maxLength={20}
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your Name"
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-4 py-2 rounded-lg transition-colors"
              >
                {t('submitScore')}
              </button>
            </form>
          </div>
        )}

        {isSubmitted && (
           <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-xl animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-green-400 font-bold text-center sm:text-left">{t('joinedLegends')}</p>
            <button
              onClick={onViewHallOfFame}
              className="w-full sm:w-auto px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors text-sm shadow-md"
            >
              {t('viewHallOfFame')}
            </button>
          </div>
        )}
      
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 animate-fade-in-up animation-delay-1000"
        >
          {t('playAgain')}
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
