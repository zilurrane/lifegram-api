import express from 'express';
import { handlePing } from '../controllers/health-check.controller';

const router = express.Router();

router.get('/ping', handlePing);

export default router;
