import { Router } from 'express';
import { getDailyTrends, getCategoryStatistics } from '../controllers/trendController';

const router = Router();
router.get('/daily', getDailyTrends);
router.get('/category', getCategoryStatistics);
export default router;
