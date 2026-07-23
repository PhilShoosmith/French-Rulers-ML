
import { Score, GameMode } from '../types';
import { db } from './firebaseClient';
import { collection, addDoc, getDocs, query, orderBy, limit, where } from 'firebase/firestore';

export const saveScore = async (newScore: Score) => {
  try {
    await addDoc(collection(db, 'scores'), newScore);
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

export const getTopScores = async (mode: GameMode, maxResults: number = 10): Promise<Score[]> => {
  try {
    const q = query(
      collection(db, 'scores'),
      where('mode', '==', mode),
      orderBy('score', 'desc'),
      orderBy('timeLeft', 'desc'),
      limit(maxResults)
    );
    const querySnapshot = await getDocs(q);
    const scores: Score[] = [];
    querySnapshot.forEach((doc) => {
      scores.push(doc.data() as Score);
    });
    return scores;
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
};

export const isTopScore = async (mode: GameMode, score: number, timeLeft: number): Promise<boolean> => {
  const topScores = await getTopScores(mode, 10);
  if (topScores.length < 10) return true;
  
  const lastScore = topScores[topScores.length - 1];
  if (score > lastScore.score) return true;
  if (score === lastScore.score && timeLeft > lastScore.timeLeft) return true;
  
  return false;
};
