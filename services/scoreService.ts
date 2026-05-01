
import { Score, GameMode } from '../types';
import { supabase } from './supabaseClient';

export const saveScore = async (newScore: Score) => {
  const { error } = await supabase
    .from('scores')
    .insert([newScore]);
    
  if (error) {
    console.error('Error saving score:', error);
  }
};

export const getTopScores = async (mode: GameMode, limit: number = 10): Promise<Score[]> => {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('mode', mode)
    .order('score', { ascending: false })
    .order('timeLeft', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching scores:', error);
    return [];
  }

  return data as Score[];
};

export const isTopScore = async (mode: GameMode, score: number, timeLeft: number): Promise<boolean> => {
  const topScores = await getTopScores(mode, 10);
  if (topScores.length < 10) return true;
  
  const lastScore = topScores[topScores.length - 1];
  if (score > lastScore.score) return true;
  if (score === lastScore.score && timeLeft > lastScore.timeLeft) return true;
  
  return false;
};
