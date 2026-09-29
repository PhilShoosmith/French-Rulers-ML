import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Upload, RotateCcw, Music } from 'lucide-react';
import { bgmService, BGMState } from '../services/bgmService';
import { useTranslation } from 'react-i18next';

export const BackgroundMusicControl: React.FC = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<BGMState>(bgmService.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Subscribe to state updates
    const unsubscribe = bgmService.subscribe((newState) => {
      setState(newState);
    });

    // Automatically attempt to start playing when opening screen mounts
    bgmService.play();

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await bgmService.uploadCustomTrack(file);
    } catch (err) {
      console.error('Failed to upload track:', err);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = async () => {
    await bgmService.resetToDefault();
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hidden file input for uploading custom MP3s */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".mp3,audio/mpeg,audio/*"
        className="hidden"
        aria-label="Upload custom background MP3"
      />

      {/* Main Pill Button */}
      <div className="flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-full px-3 py-1.5 shadow-lg text-slate-200 text-xs gap-2 transition-all">
        {/* Play/Pause Button */}
        <button
          onClick={() => bgmService.togglePlay()}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-transform active:scale-95 shadow-sm"
          title={state.isPlaying ? 'Pause background music' : 'Play background music'}
          aria-label={state.isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {state.isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
        </button>

        {/* Music Icon & Title */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 cursor-pointer hover:text-white select-none max-w-[140px] sm:max-w-[200px] truncate"
          title={`Currently: ${state.trackName}`}
        >
          <Music size={13} className={`flex-shrink-0 text-cyan-400 ${state.isPlaying ? 'animate-bounce' : 'opacity-70'}`} />
          <span className="font-medium truncate text-[11px] sm:text-xs">
            {state.isCustom ? state.trackName : 'French Music'}
          </span>
        </div>

        {/* Mute/Unmute */}
        <button
          onClick={() => bgmService.toggleMute()}
          className="text-slate-400 hover:text-white p-1 transition-colors"
          title={state.isMuted ? 'Unmute music' : 'Mute music'}
          aria-label={state.isMuted ? 'Unmute music' : 'Mute music'}
        >
          {state.isMuted ? (
            <VolumeX size={14} className="text-red-400" />
          ) : (
            <Volume2 size={14} className="text-slate-300" />
          )}
        </button>

        {/* Upload Custom MP3 Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-cyan-800/50 rounded-full text-[10px] sm:text-[11px] font-medium transition-all"
          title="Upload MP3 file from your computer (e.g. from Pixabay)"
          aria-label="Upload custom background MP3"
        >
          <Upload size={11} />
          <span className="hidden sm:inline">Upload MP3</span>
        </button>

        {/* Revert to default if custom */}
        {state.isCustom && (
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-amber-400 p-1 transition-colors"
            title="Reset to default French classical music"
            aria-label="Reset to default French classical music"
          >
            <RotateCcw size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BackgroundMusicControl;
