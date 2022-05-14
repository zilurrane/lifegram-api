import { User, UserData } from "../models/user.model";

export const createUser = async (createUserRequest: UserData) => {
    const user = new User(createUserRequest);
    return await user.save();
}

export const checkUserExistsByPhoneNumber = async (phoneNumber: string) => {
    const isUserExists = await User.exists({ phoneNumber });
    return isUserExists;
}

export const getUserByPhoneNumber = async (phoneNumber: string) => {
    const user = await User.findOne({ phoneNumber });
    return user;
}
