import { NextFunction, Request, Response } from "express";
import { generateOTP } from "../services/miscellaneous.service";
import { upsertUserOTP } from "../services/user-otp.service";
import { createUser, getUserByPhoneNumber } from "../services/user.service";

export const handlePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    try {
        let user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            user = await createUser({ phoneNumber, isActive: false, isVerified: false, createdBy: null, modifiedBy: null });
        }

        const otp = generateOTP(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        const expiry = new Date((new Date()).getTime() + 15 * 60000);

        await upsertUserOTP(user.id, { userId: user.id, otp, expiry, status: "PENDING", createdBy: null, modifiedBy: null });

        res.json({ message: "OTP has been sent to your phone number." });
    } catch (error) {
        next(error);
    }
}
