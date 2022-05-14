import express from 'express';
import { handlePhoneNumber, verifyPhoneNumberAndOTP } from '../controllers/auth.controller';

const router = express.Router();

router.post('/otp/phone/init', handlePhoneNumber);
router.post('/otp/phone/verify', verifyPhoneNumberAndOTP);

export default router;
