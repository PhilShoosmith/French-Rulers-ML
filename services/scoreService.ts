
import { Score, GameMode, Timeframe } from '../types';
import { db } from './firebaseClient';
import { collection, addDoc, getDocs, query, orderBy, limit, where } from 'firebase/firestore';

export const saveScore = async (newScore: Score) => {
  try {
    await addDoc(collection(db, 'scores'), newScore);
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

export const getTopScores = async (mode: GameMode, timeframe: Timeframe = 'all', maxResults: number = 10): Promise<Score[]> => {
  try {
    if (timeframe === 'all') {
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
    } else {
      // For week/month, fetch and sort client-side due to Firestore index limitations 
      // on inequality filters requiring ordering on the filtered field first.
      const now = new Date();
      if (timeframe === 'week') {
        now.setDate(now.getDate() - 7);
      } else if (timeframe === 'month') {
        now.setMonth(now.getMonth() - 1);
      }
      const dateString = now.toISOString();

      const q = query(
        collection(db, 'scores'),
        where('mode', '==', mode),
        where('date', '>=', dateString)
      );
      
      const querySnapshot = await getDocs(q);
      const scores: Score[] = [];
      querySnapshot.forEach((doc) => {
        scores.push(doc.data() as Score);
      });

      // Sort client-side
      scores.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.timeLeft - a.timeLeft;
      });

      return scores.slice(0, maxResults);
    }
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
};

export const isTopScore = async (mode: GameMode, score: number, timeLeft: number): Promise<boolean> => {
  // Check if they made it to the top 10 of ANY timeframe (week, month, or all-time)
  const timeframes: Timeframe[] = ['week', 'month', 'all'];
  
  for (const tf of timeframes) {
    const topScores = await getTopScores(mode, tf, 10);
    if (topScores.length < 10) return true;
    
    const lastScore = topScores[topScores.length - 1];
    if (score > lastScore.score) return true;
    if (score === lastScore.score && timeLeft > lastScore.timeLeft) return true;
  }
  
  return false;
};
