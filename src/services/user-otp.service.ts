import { UserOTP, UserOTPData } from "../models/user-otp.model";

export const createUserOTP = async (createUserRequest: UserOTPData) => {
    const user = new UserOTP(createUserRequest);
    return await user.save();
}

export const upsertUserOTP = async (userId: string, userOtpRequest: UserOTPData) => {
    return await UserOTP.findOneAndUpdate({ userId }, userOtpRequest, { upsert: true, new: true });
}
