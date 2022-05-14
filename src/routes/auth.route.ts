import express from 'express';
import { handlePhoneNumber } from '../controllers/auth.controller';

const router = express.Router();

router.post('/otp/phone/init', handlePhoneNumber);

export default router;
