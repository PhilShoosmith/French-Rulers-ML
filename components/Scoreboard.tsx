
import React from 'react';
import { ROUND_DURATION_SECONDS } from '../constants';
import { useTranslation } from 'react-i18next';

interface ScoreboardProps {
  score: number;
  incorrect: number;
  round: number;
  totalRounds: number;
  timeLeft: number;
  isAdmin: boolean;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, incorrect, round, totalRounds, timeLeft, isAdmin }) => {
  const { t } = useTranslation();
  const isLowTime = timeLeft <= 5;
  const timerColor = isLowTime ? 'text-red-500' : 'text-yellow-300';
  const strokeColor = isLowTime ? 'stroke-red-500' : 'stroke-yellow-300';

  // SVG Configuration
  const radius = 28;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = timeLeft / ROUND_DURATION_SECONDS;
  const strokeDashoffset = circumference - (progress * circumference);

  const renderTimer = (sizeClass: string = "text-xl") => (
    <div className="flex justify-center items-center">
      {isAdmin ? (
         <div className="text-4xl font-bold text-cyan-400">∞</div>
      ) : (
          <div className="relative flex items-center justify-center">
              <svg
                  height={radius * 2}
                  width={radius * 2}
                  className="transform -rotate-90 drop-shadow-md"
              >
                  <circle
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth={stroke}
                      fill="transparent"
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                  />
                  <circle
                      className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${strokeColor}`}
                      strokeWidth={stroke}
                      strokeDasharray={circumference + ' ' + circumference}
                      style={{ strokeDashoffset }}
                      strokeLinecap="round"
                      fill="transparent"
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                  />
              </svg>
              <div className={`absolute font-bold ${sizeClass} ${timerColor} ${isLowTime ? 'animate-pulse' : ''}`}>
                  {timeLeft}
              </div>
          </div>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md p-2 z-50 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden sm:grid grid-cols-3 items-center text-lg font-semibold min-h-[4rem]">
          <div className="flex flex-row items-center gap-4 text-slate-300 text-lg">
            <div>{t('correct')}: <span className="text-green-400 font-bold text-xl">{score}</span></div>
            <div>{t('incorrect')}: <span className="text-red-400 font-bold text-xl">{incorrect}</span></div>
          </div>
          
          {renderTimer("text-xl")}

          <div className="text-slate-300 text-right text-lg">
            {t('round')}: <span className="text-white font-bold text-xl">{round}</span> / {totalRounds}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden relative flex justify-between items-center px-2 w-full font-semibold h-14">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider">{t('correct')}</span>
              <span className="text-green-400 font-bold text-lg leading-none mt-1">{score}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider">{t('incorrect')}</span>
              <span className="text-red-400 font-bold text-lg leading-none mt-1">{incorrect}</span>
            </div>
          </div>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0">
            {renderTimer("text-lg")}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">{t('round')}</span>
            <div className="mt-1 leading-none">
              <span className="text-white font-bold text-lg">{round}</span>
              <span className="text-slate-400 text-xs">/{totalRounds}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
