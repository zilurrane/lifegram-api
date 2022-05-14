import { NextFunction, Request, Response } from "express";
import { generateOTP } from "../services/miscellaneous.service";
import { updateOTPStatus, upsertUserOTP } from "../services/user-otp.service";
import { createUser, getUserByPhoneNumber, updateUserVerificationAndActiveStatus } from "../services/user.service";
import { OTP_STATUS } from "../shared/constants/otp-status.constant";
import { BadRequestError } from "../shared/errors/bad-request-error";
import { isDevelopment } from "../shared/utils/node-utils";

export const handlePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    try {
        let user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            user = await createUser({ phoneNumber, isActive: false, isVerified: false, createdBy: null, modifiedBy: null });
        }

        const otp = isDevelopment() ? "123456" : generateOTP(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        const expiry = new Date((new Date()).getTime() + 15 * 60000);

        await upsertUserOTP(user.id, { userId: user.id, otp, expiry, status: OTP_STATUS.SENT, createdBy: null, modifiedBy: null });

        res.json({ message: "OTP has been sent to your phone number." });
    } catch (error) {
        next(error);
    }
}

export const verifyPhoneNumberAndOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, otp } = req.body;
    try {
        let user = await getUserByPhoneNumber(phoneNumber);
        const userOTP = await updateOTPStatus(user?.id, otp, OTP_STATUS.VERIFIED);
        if (userOTP) {
            user = await updateUserVerificationAndActiveStatus(user?.id, true, true);
            res.json({ message: "Phone Number and OTP has been verified." });
        } else {
            throw new BadRequestError("Generate OTP first.");
        }
    } catch (error) {
        next(error);
    }
}
