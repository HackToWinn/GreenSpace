import { Request, Response } from 'express';
import { Actor } from '@dfinity/agent';
import { useBackend } from '../hooks/useActor';
import { sanitize } from '../utils/sanitize';

// Hanya satu fungsi di satu file
export const getDailyTrends = async (req: Request, res: Response) => {
  try {
    const Actor = await useBackend(); 
    const trends = await Actor.getTrends();
    res.status(200).json(sanitize(trends));
  } catch (error) {
    console.error('Error getting daily trends:', error);
    res.status(500).json({ error: 'Failed to fetch daily trends' });
  }
};
export const getCategoryStatistics = async (req: Request, res: Response) => {
  try {
    const actor = await useBackend();
    const trends = await actor.getCategoryStatistics();
    res.status(200).json(sanitize(trends));
  } catch (error) {
    console.error('Error getting category statistics:', error);
    res.status(500).json({ error: 'Failed to fetch category statistics' });
  }
};
