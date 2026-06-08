
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Monarch, GameState, AnyLastGuess, GameMode } from './types';
import { getGameMonarchs, allMonarchs, getSuccessorGameMonarchs } from './services/gameService';
import { ROUNDS_PER_GAME, YEAR_TOLERANCE, ROUND_DURATION_SECONDS, HISTORICAL_PERIODS } from './constants';
import StartScreen from './components/StartScreen';
import Scoreboard from './components/Scoreboard';
import MonarchCard from './components/MonarchCard';
import Timeline from './components/Timeline';
import Feedback from './components/Feedback';
import EndScreen from './components/EndScreen';
import { GoogleGenAI } from '@google/genai';
import RAGModal from './components/RAGModal';
import Confetti from './components/Confetti';
import NextMonarchGuesser from './components/NextMonarchGuesser';
import ReviewScreen from './components/ReviewScreen';
import RulerGuesser from './components/RulerGuesser';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsOfServiceModal from './components/TermsOfServiceModal';
import HallOfFameModal from './components/HallOfFameModal';
import FamilyTreeModal from './components/FamilyTreeModal';

interface GroundingSource {
  uri: string;
  title: string;
}

const periodToGradientMap: { [key: string]: string } = {
  'Capetian': 'from-blue-800',
  'Valois': 'from-red-800',
  'Bourbon': 'from-amber-800',
  'Empires & Restoration': 'from-indigo-800',
  'Republics': 'from-green-800',
};

const DynamicBackground: React.FC<{ period: (typeof HISTORICAL_PERIODS)[0] | null }> = ({ period }) => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-900">
      {HISTORICAL_PERIODS.map(p => (
        <div 
          key={p.name} 
          className={
            `absolute inset-0 bg-gradient-to-br ${periodToGradientMap[p.name]} to-slate-900 transition-opacity duration-1000 ease-in-out
             ${period?.name === p.name ? 'opacity-30' : 'opacity-0'}`
          } 
        />
      ))}
    </div>
  );
};


const parseMonarchsFromFile = (content: string): Monarch[] | null => {
  try {
    // Find the array declaration using a regular expression
    const regex = /export const allMonarchs: Monarch\[\] = (\[[\s\S]*?\]);/;
    const match = content.match(regex);
    if (!match || !match[1]) {
      console.error("Could not find monarch data in the file.");
      return null;
    }
    const arrayString = match[1];
    
    // Use 'new Function' to safely parse the JavaScript array string
    const parsedData: Monarch[] = new Function(`return ${arrayString}`)();

    // Basic validation of the parsed data structure
    if (!Array.isArray(parsedData) || (parsedData.length > 0 && (!('id' in parsedData[0]) || !('name' in parsedData[0])))) {
      console.error("Parsed data is not in the expected Monarch[] format.");
      return null;
    }
    return parsedData;
  } catch (error) {
    console.error("Error parsing monarch data file:", error);
    return null;
  }
};

import { useTranslation } from 'react-i18next';

const InstructionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-modal-title"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
          <h2 id="instructions-modal-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t('howToPlayTitle')}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold"
            aria-label={t('close')}
          >
            &times;
          </button>
        </header>
        <div className="p-6 overflow-y-auto text-slate-300 space-y-4">
           <div>
            <h3 className="font-bold text-lg text-yellow-400 mb-2">{t('theGoal')}</h3>
            <p>{t('goalDesc', { rounds: ROUNDS_PER_GAME })}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-yellow-400 mb-2">{t('gameModes')}</h3>
             <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>{t('guessYear')}:</strong> {t('guessYearDesc')}
              </li>
              <li>
                <strong>{t('guessSuccessor')}:</strong> {t('guessSuccessorDesc')}
              </li>
               <li>
                <strong>{t('guessRuler')}:</strong> {t('guessRulerDesc')}
              </li>
            </ul>
             <p className="mt-4">{t('timerDesc', { duration: ROUND_DURATION_SECONDS })}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-yellow-400 mb-2">{t('scoring')}</h3>
            <p>
              {t('scoringDesc', { tolerance: YEAR_TOLERANCE })}
            </p>
          </div>
           <div>
            <h3 className="font-bold text-lg text-yellow-400 mb-2">{t('learnMore')}</h3>
            <p>{t('learnMoreDesc')}</p>
          </div>
        </div>
         <footer className="p-4 flex justify-end border-t border-slate-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              {t('gotIt')}
            </button>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const getMonarchName = (m: typeof currentMonarch) => {
    if (!m) return '';
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const getMonarchTitle = (m: typeof currentMonarch) => {
    if (!m) return '';
    if (i18n.language === 'fr' && m.titleFr) return m.titleFr;
    if (i18n.language === 'ja' && m.titleJa) return m.titleJa;
    if (i18n.language === 'zh' && m.titleZh) return m.titleZh;
    if (i18n.language === 'es' && m.titleEs) return m.titleEs;
    if (i18n.language === 'hi' && m.titleHi) return m.titleHi;
    if (i18n.language === 'ar' && m.titleAr) return m.titleAr;
    return m.title;
  };

  const getMonarchContext = (m: typeof currentMonarch) => {
    if (!m) return '';
    if (i18n.language === 'fr' && m.contextFr) return m.contextFr;
    if (i18n.language === 'ja' && m.contextJa) return m.contextJa;
    if (i18n.language === 'zh' && m.contextZh) return m.contextZh;
    if (i18n.language === 'es' && m.contextEs) return m.contextEs;
    if (i18n.language === 'hi' && m.contextHi) return m.contextHi;
    if (i18n.language === 'ar' && m.contextAr) return m.contextAr;
    return m.context;
  };
  const [gameState, setGameState] = useState<GameState>('start');
  const [gameMode, setGameMode] = useState<GameMode>('year');
  const [allMonarchsData, setAllMonarchsData] = useState<Monarch[]>(allMonarchs);
  const [gameMonarchIds, setGameMonarchIds] = useState<number[]>([]);
  
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [cumulativeTimeLeft, setCumulativeTimeLeft] = useState<number>(0);
  const [lastGuess, setLastGuess] = useState<AnyLastGuess | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(ROUND_DURATION_SECONDS);
  const [typedYear, setTypedYear] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminViewIndex, setAdminViewIndex] = useState<number>(0);
  const timerIdRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timeLeftRef = useRef<number>(timeLeft);

  const [stagedPortraitChanges, setStagedPortraitChanges] = useState<Record<number, string>>({});
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  
  // Modal states
  const [isRagModalOpen, setIsRagModalOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [isHallOfFameOpen, setIsHallOfFameOpen] = useState<boolean>(false);
  const [isFamilyTreeOpen, setIsFamilyTreeOpen] = useState<boolean>(false);
  
  const [ragContent, setRagContent] = useState<{ title: string; text: string; imageUrl?: string; } | null>(null);
  const [ragSources, setRagSources] = useState<GroundingSource[]>([]);
  const [isRagLoading, setIsRagLoading] = useState<boolean>(false);
  const [isTranslatingRag, setIsTranslatingRag] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const monarchs = useMemo(() =>
    gameMonarchIds
      .map(id => allMonarchsData.find(m => m.id === id))
      .filter((m): m is Monarch => m !== undefined),
    [gameMonarchIds, allMonarchsData]
  );
  
  const previousMonarchs = useMemo(() => {
    if (gameState === 'start') return [];
    return monarchs.slice(0, currentRound);
  }, [monarchs, currentRound, gameState]);
  
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const clearTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const startGame = useCallback((mode: GameMode) => {
    setShowConfetti(false);
    setGameMode(mode);
    const gameMonarchs = mode === 'monarch' 
      ? getSuccessorGameMonarchs(allMonarchsData) 
      : getGameMonarchs(allMonarchsData);
    setGameMonarchIds(gameMonarchs.map(m => m.id));
    setCurrentRound(0);
    setScore(0);
    setCumulativeTimeLeft(0);
    setLastGuess(null);
    setTypedYear('');
    setGameState('playing');
  }, [allMonarchsData]);
  
  const startReview = useCallback(() => {
    setShowConfetti(false);
    setGameState('review');
  }, []);

  const openInstructions = useCallback(() => setIsInstructionsOpen(true), []);
  const closeInstructions = useCallback(() => setIsInstructionsOpen(false), []);

  const processGuessResult = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setCumulativeTimeLeft(prev => prev + timeLeftRef.current);
      setShowConfetti(true);
    }
  }, []);

  const handleYearGuess = useCallback((guessedYear: number) => {
    if (!monarchs[currentRound]) return;
    clearTimer();
    const correctYear = monarchs[currentRound].reignStart;
    const timedOut = guessedYear === 0;
    const isCorrect = !timedOut && Math.abs(guessedYear - correctYear) <= YEAR_TOLERANCE;

    processGuessResult(isCorrect);
    setLastGuess({ type: 'year', isCorrect, guessedYear, correctYear, timedOut });
    setGameState('feedback');
  }, [monarchs, currentRound, clearTimer, processGuessResult]);

  const handleMonarchGuess = useCallback((guessedMonarchId: number) => {
    if (!monarchs[currentRound]) return;
    clearTimer();

    const currentMonarchInFullList = allMonarchsData.findIndex(m => m.id === monarchs[currentRound].id);
    const correctSuccessor = allMonarchsData[currentMonarchInFullList + 1];
    
    if (!correctSuccessor) {
      console.error("Could not find a successor for the current monarch.");
      return;
    }
    
    const correctMonarchId = correctSuccessor.id;
    const timedOut = guessedMonarchId === 0;
    const isCorrect = !timedOut && guessedMonarchId === correctMonarchId;

    processGuessResult(isCorrect);
    setLastGuess({ type: 'monarch', isCorrect, guessedMonarchId, correctMonarchId, timedOut });
    setGameState('feedback');

  }, [monarchs, currentRound, clearTimer, allMonarchsData, processGuessResult]);
  
  const handleRulerGuess = useCallback((guessedMonarchId: number) => {
    if (!monarchs[currentRound]) return;
    clearTimer();

    const correctMonarchId = monarchs[currentRound].id;
    const timedOut = guessedMonarchId === 0;
    const isCorrect = !timedOut && guessedMonarchId === correctMonarchId;

    processGuessResult(isCorrect);
    setLastGuess({ type: 'ruler', isCorrect, guessedMonarchId, correctMonarchId, timedOut });
    setGameState('feedback');
  }, [monarchs, currentRound, clearTimer, processGuessResult]);

  useEffect(() => {
    if (gameState === 'playing' && !isAdmin) {
      setTimeLeft(ROUND_DURATION_SECONDS);
      timerIdRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (gameMode === 'year') {
              handleYearGuess(0);
            } else if (gameMode === 'monarch') {
              handleMonarchGuess(0);
            } else { // ruler mode
              handleRulerGuess(0);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
      if (gameState === 'playing') {
        setTimeLeft(ROUND_DURATION_SECONDS);
      }
    }

    return clearTimer;
  }, [gameState, currentRound, isAdmin, gameMode, handleYearGuess, handleMonarchGuess, handleRulerGuess, clearTimer]);

  const nextRound = useCallback(() => {
    setShowConfetti(false);
    if (currentRound + 1 < ROUNDS_PER_GAME) {
      setCurrentRound(prev => prev + 1);
      setLastGuess(null);
      setTypedYear('');
      setGameState('playing');
      window.scrollTo(0, 0);
    } else {
      setGameState('end');
    }
  }, [currentRound]);

  const handleStopGame = useCallback(() => {
    setGameState('start');
  }, []);

  const handleTypedGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState === 'feedback' || !typedYear.trim()) return;

    if (typedYear === '568082') {
      setIsAdmin(true);
      const currentMonarchInGame = monarchs[currentRound];
      if (currentMonarchInGame) {
        const indexInAll = allMonarchsData.findIndex(m => m.id === currentMonarchInGame.id);
        setAdminViewIndex(indexInAll >= 0 ? indexInAll : 0);
      } else {
        setAdminViewIndex(0);
      }
      setTypedYear('');
      return;
    }

    if (typedYear === '000000') {
      setIsAdmin(false);
      setTypedYear('');
      return;
    }
    
    const year = parseInt(typedYear, 10);
    if (!isNaN(year)) {
      handleYearGuess(year);
    }
  };

  const handleAdminViewChange = useCallback((newIndexValue: string) => {
    const newIndex = parseInt(newIndexValue, 10);
    if (isNaN(newIndex)) return;

    setAdminViewIndex(newIndex);
    setLastGuess(null);
    setTypedYear('');
    setSaveMessage('');
    if (gameState === 'start' || gameState === 'end') {
        setGameState('playing');
    }
  }, [gameState]);
  
  const handleAdminNav = useCallback((direction: 'next' | 'prev') => {
    if (!isAdmin) return;
    setAdminViewIndex(prevIndex => (direction === 'next' ? (prevIndex + 1) % allMonarchsData.length : (prevIndex - 1 + allMonarchsData.length) % allMonarchsData.length));
    setLastGuess(null);
    setTypedYear('');
    setSaveMessage('');
    if (gameState === 'start' || gameState === 'end') {
        setGameState('playing');
    }
  }, [isAdmin, gameState, allMonarchsData]);

  const handlePortraitUpload = useCallback((monarchId: number, newImageUrl: string) => {
    if (!isAdmin) return;
    setStagedPortraitChanges(prev => ({ ...prev, [monarchId]: newImageUrl }));
  }, [isAdmin]);

  const handleSaveChanges = useCallback(() => {
    const changesExist = Object.keys(stagedPortraitChanges).length > 0;
    if (!isAdmin || !changesExist) return;
    
    const updatedMonarchsData = allMonarchsData.map(monarch => {
      const updatedMonarch = { ...monarch };
      if (stagedPortraitChanges[monarch.id]) {
        updatedMonarch.imageUrl = stagedPortraitChanges[monarch.id];
      }
      return updatedMonarch;
    });

    const fileContent = `import { Monarch } from '../types';
import { ROUNDS_PER_GAME } from '../constants';

// This file can be updated via the in-game admin panel.
export const allMonarchs: Monarch[] = ${JSON.stringify(updatedMonarchsData, null, 2)};

export const getGameMonarchs = (sourceMonarchs: Monarch[]): Monarch[] => {
  const shuffled = [...sourceMonarchs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, ROUNDS_PER_GAME);
};`;

    const blob = new Blob([fileContent], { type: 'application/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gameService.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setAllMonarchsData(updatedMonarchsData);
    setStagedPortraitChanges({});
    setSaveMessage('File downloaded! Replace services/gameService.ts in your project folder to save changes.');
    setTimeout(() => setSaveMessage(''), 8000);
  }, [isAdmin, allMonarchsData, stagedPortraitChanges]);

  const handleDataUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadMessage(`Reading ${file.name}...`);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        const parsedMonarchs = parseMonarchsFromFile(content);
        if (parsedMonarchs) {
          setAllMonarchsData(parsedMonarchs);
          setUploadMessage(`Success! Loaded ${parsedMonarchs.length} leaders from ${file.name}. Changes are for the current session only.`);
          setAdminViewIndex(0); // Reset index to avoid out-of-bounds
        } else {
          setUploadMessage(`Failed to parse ${file.name}. Please ensure it's a valid gameService.ts file.`);
        }
      } else {
        setUploadMessage(`File ${file.name} appears to be empty.`);
      }
      setTimeout(() => setUploadMessage(''), 8000);
    };
    reader.onerror = () => {
      setUploadMessage(`Error reading file ${file.name}.`);
      setTimeout(() => setUploadMessage(''), 8000);
    };
    reader.readAsText(file);

    // Clear the input value to allow re-uploading the same file
    event.target.value = '';
  }, []);

  const handlePreviousMonarch = useCallback(() => handleAdminNav('prev'), [handleAdminNav]);
  const handleNextMonarch = useCallback(() => handleAdminNav('next'), [handleAdminNav]);

  const handleLearnMore = useCallback(async (monarch: Monarch) => {
    setIsRagModalOpen(true);
    setIsRagLoading(true);
    setRagContent({ title: getMonarchName(monarch), text: '', imageUrl: monarch.imageUrl });
    setRagSources([]);

    try {
      let targetLanguage = 'English';
      if (i18n.language === 'fr') targetLanguage = 'French';
      if (i18n.language === 'ja') targetLanguage = 'Japanese';
      if (i18n.language === 'zh') targetLanguage = 'Chinese';
      if (i18n.language === 'es') targetLanguage = 'Spanish';
      if (i18n.language === 'hi') targetLanguage = 'Hindi';
      if (i18n.language === 'ar') targetLanguage = 'Arabic';

      const prompt = `Tell me a brief history about the French leader ${monarch.name} (${monarch.title}), written in an engaging and accessible tone. Focus on their rise to power, key events during their time in office, and their legacy. Keep it concise, around 3-4 paragraphs. Write the response in ${targetLanguage}.`;

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, targetLanguage }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`Failed to fetch HTTP ${response.status}: ${response.statusText}`);
        }
        throw Object.assign(new Error(errorData.error || `Error ${response.status}`), { status: response.status });
      }

      const responseData = await response.json();

      setRagContent({ title: getMonarchName(monarch), text: responseData.text, imageUrl: monarch.imageUrl });
      const groundingChunks = responseData.groundingChunks;
      const sources = (groundingChunks as any[] || [])
        .map(chunk => chunk.web)
        .filter((web): web is GroundingSource => !!(web?.uri && web.title));
      
      const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());
      setRagSources(uniqueSources);

    } catch (error: any) {
      console.error("Error fetching data from Gemini API", error);
      let errorMessage = "Sorry, I couldn't fetch more information at this time. Please check your API key and network connection.";
      if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
        errorMessage = "The Gemini API quota has been exceeded. Please try again later or check your API key billing details.";
      } else if (error?.status === 403 || error?.message?.includes('403') || error?.message?.includes('PERMISSION_DENIED')) {
        errorMessage = "Access to the Gemini API was denied. Please check your API key permissions and ensure your project has access.";
      } else if (error?.status === 400 || error?.message?.includes('expired') || error?.message?.includes('API_KEY_INVALID')) {
        errorMessage = "Your Gemini API key has expired. Please renew your API key in the AI Studio settings and try again.";
      }
      setRagContent({ title: getMonarchName(monarch), text: errorMessage, imageUrl: monarch.imageUrl });
    } finally {
      setIsRagLoading(false);
    }
  }, [i18n.language]);

  const closeRagModal = () => setIsRagModalOpen(false);

  const getPeriodForMonarch = (monarch: Monarch | undefined): (typeof HISTORICAL_PERIODS)[0] | null => {
    if (!monarch) return null;
    return HISTORICAL_PERIODS.find(p => monarch.reignStart >= p.start && monarch.reignStart < p.end) || null;
  };
  
  const currentMonarch = isAdmin ? allMonarchsData[adminViewIndex] : monarchs[currentRound];
  const currentPeriod = useMemo(() => getPeriodForMonarch(currentMonarch), [currentMonarch]);
  const stagedChangesCount = Object.keys(stagedPortraitChanges).length;
  const correctSuccessor = useMemo(() => {
    if (!currentMonarch) return null;
    const currentMonarchInFullList = allMonarchsData.findIndex(m => m.id === currentMonarch.id);
    return currentMonarchInFullList > -1 && currentMonarchInFullList < allMonarchsData.length - 1 
      ? allMonarchsData[currentMonarchInFullList + 1] 
      : null;
  }, [currentMonarch, allMonarchsData]);


  const renderGameScreen = () => {
    switch (gameState) {
      case 'start':
        return (
          <StartScreen 
            onStart={startGame} 
            monarchs={allMonarchsData} 
            onShowInstructions={openInstructions} 
            onStartReview={startReview}
            onShowPrivacy={() => setIsPrivacyOpen(true)}
            onShowTerms={() => setIsTermsOpen(true)}
            onShowHallOfFame={() => setIsHallOfFameOpen(true)}
            onShowFamilyTree={() => setIsFamilyTreeOpen(true)}
          />
        );
      case 'review':
        return <ReviewScreen monarchs={allMonarchsData} onBack={() => setGameState('start')} onLearnMore={handleLearnMore} />;
      case 'end':
        return (
          <EndScreen 
            score={score} 
            totalTimeLeft={cumulativeTimeLeft} 
            mode={gameMode} 
            onRestart={() => setGameState('start')} 
            onViewHallOfFame={() => setIsHallOfFameOpen(true)}
          />
        );
      case 'playing':
      case 'feedback':
        if (!currentMonarch) return null;
        const incorrectAnswers = currentRound - score;
        return (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between min-h-[100dvh] pt-16 sm:pt-24 pb-2 sm:pb-4">
            {isAdmin && (
              <div className="fixed top-24 right-4 bg-purple-900/80 p-2 rounded border border-purple-600 z-50 shadow-lg flex flex-col items-center gap-2 w-48">
                <p className="font-mono text-sm text-yellow-300">Admin: {currentMonarch.reignStart}</p>
                 <select
                  value={adminViewIndex}
                  onChange={(e) => handleAdminViewChange(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Select monarch to view"
                >
                  {allMonarchsData.map((monarch, index) => (
                    <option key={monarch.id} value={index}>
                      {getMonarchName(monarch)}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button onClick={handlePreviousMonarch} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors" aria-label="Previous Monarch">&lt; Prev</button>
                  <button onClick={handleNextMonarch} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors" aria-label="Next Monarch">Next &gt;</button>
                </div>

                {/* Pending Changes */}
                {stagedChangesCount > 0 && (
                  <div className="flex flex-col gap-2 w-full mt-2 pt-2 border-t border-purple-700">
                    <p className="text-xs font-bold text-slate-200 text-center">Pending Changes</p>
                    <p className="text-xs text-slate-300 text-center">{stagedChangesCount} pending change{stagedChangesCount > 1 ? 's' : ''}</p>
                    <button onClick={handleSaveChanges} className="px-2 py-1 text-xs bg-green-600 hover:bg-green-500 rounded text-white font-bold transition-colors" aria-label="Download updated data file">Download File</button>
                    <button onClick={() => { setStagedPortraitChanges({}); setSaveMessage(''); }} className="px-2 py-1 text-xs bg-red-700 hover:bg-red-600 rounded text-slate-200 transition-colors" aria-label="Discard all pending changes">Discard All</button>
                  </div>
                )}
                {saveMessage && (
                  <div className="w-full mt-2 p-2 bg-slate-700 border border-slate-600 rounded text-center text-xs text-slate-200">
                      <p className="font-bold mb-1">Data Saved!</p>
                      <p>{saveMessage}</p>
                  </div>
                )}
                
                {/* Upload Game Data */}
                <div className="flex flex-col gap-2 w-full mt-2 pt-2 border-t border-purple-700">
                  <p className="text-xs font-bold text-slate-200 text-center">Game Data</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors"
                    aria-label="Import monarch data file"
                  >
                    Import `gameService.ts`
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleDataUpload}
                    className="hidden"
                    accept=".ts,application/typescript"
                  />
                </div>
                {uploadMessage && (
                    <div className="w-full mt-2 p-2 bg-slate-700 border border-slate-600 rounded text-center text-xs text-slate-200">
                        <p>{uploadMessage}</p>
                    </div>
                )}
              </div>
            )}
            <Scoreboard score={score} incorrect={incorrectAnswers} round={currentRound + 1} totalRounds={ROUNDS_PER_GAME} timeLeft={timeLeft} isAdmin={isAdmin} />
            
            <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-center lg:items-center lg:gap-8 mt-2 lg:mt-4">
              <div className="w-36 sm:w-56 lg:w-full max-w-sm mx-auto lg:mx-0 flex-shrink-0">
                {(gameMode !== 'ruler' || gameState === 'feedback') && (
                  <MonarchCard
                    monarch={currentMonarch}
                    showReign={gameState === 'feedback' || isAdmin}
                    isAdmin={isAdmin}
                    onPortraitUpload={handlePortraitUpload}
                    stagedPortraitUrl={stagedPortraitChanges[currentMonarch?.id]}
                  />
                )}
              </div>

              <div className="w-full lg:max-w-md mt-8 lg:mt-0">
                {gameState === 'feedback' && lastGuess ? (
                  <Feedback lastGuess={lastGuess} onNext={nextRound} monarch={currentMonarch} onLearnMore={handleLearnMore} allMonarchs={allMonarchsData} onStop={handleStopGame} />
                ) : (
                   <>
                    {gameMode === 'year' && (
                       <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 animate-fade-in-up">
                        <p className="text-lg md:text-xl text-slate-300 font-light mb-4 text-center">{t('placeOnTimeline', { name: getMonarchName(currentMonarch) })}</p>
                        <form onSubmit={handleTypedGuess} className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <input type="number" value={typedYear} onChange={(e) => setTypedYear(e.target.value)} disabled={gameState === 'feedback'} placeholder={t('enterYear')} className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-lg w-full sm:flex-grow text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" aria-label="Enter reign start year" />
                            <button type="submit" disabled={gameState === 'feedback' || !typedYear.trim()} className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50">{t('submit')}</button>
                        </form>
                       </div>
                    )}
                    {gameMode === 'monarch' && (
                       <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 animate-fade-in-up">
                        <p className="text-lg md:text-xl text-slate-300 font-light mb-4 text-center">{t('whoWasSuccessor', { name: getMonarchName(currentMonarch) })}</p>
                         <NextMonarchGuesser 
                           monarchs={allMonarchsData} 
                           onSubmit={handleMonarchGuess} 
                           disabled={gameState === 'feedback'}
                           correctSuccessorId={correctSuccessor?.id}
                         />
                       </div>
                    )}
                    {gameMode === 'ruler' && (
                      <RulerGuesser allMonarchs={allMonarchsData} correctMonarch={currentMonarch} onSubmit={handleRulerGuess} disabled={gameState === 'feedback'} />
                    )}
                   </>
                )}
              </div>
            </div>
            
            {gameMode === 'year' && (
              <div className="w-full mt-1 sm:mt-4 flex-shrink-0">
                 <Timeline 
                    onGuess={handleYearGuess} 
                    disabled={gameState === 'feedback' || isAdmin} 
                    lastGuess={lastGuess?.type === 'year' ? lastGuess : null} 
                    currentMonarch={currentMonarch}
                    previousMonarchs={previousMonarchs}
                 />
              </div>
            )}
          </div>
        );
    }
  };

  const isFullScreenMode = gameState === 'start' || gameState === 'review' || gameState === 'end';

  return (
    <main className={`min-h-screen w-full text-white font-sans flex ${isFullScreenMode ? 'items-start' : 'items-center'} justify-center`}>
      <DynamicBackground period={gameState === 'start' || gameState === 'end' ? null : currentPeriod} />
      {showConfetti && <Confetti />}
      {renderGameScreen()}
      <RAGModal
        isOpen={isRagModalOpen}
        isLoading={isRagLoading}
        isTranslating={isTranslatingRag}
        content={ragContent}
        sources={ragSources}
        onClose={closeRagModal}
      />
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={closeInstructions}
      />
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsOfServiceModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
      <HallOfFameModal
        isOpen={isHallOfFameOpen}
        onClose={() => setIsHallOfFameOpen(false)}
      />
      <FamilyTreeModal
        isOpen={isFamilyTreeOpen}
        onClose={() => setIsFamilyTreeOpen(false)}
        monarchs={allMonarchsData}
      />
    </main>
  );
};

export default App;
