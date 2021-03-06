import * as mongoose from 'mongoose';
import { Audit } from '../interfaces/audit.interface';

const Schema = mongoose.Schema;

export interface UserData extends Audit {
    id?: any;
    phoneNumber: string;
    emailId?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    isActive: boolean;
    isVerified: boolean;
}

export interface UserModel extends mongoose.Model<UserDocument> {
}

export interface UserDocument extends mongoose.Document, UserData {
}

export const UserSchema = new Schema({
    phoneNumber: { type: String, unique: true },
    emailId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    displayName: { type: String },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    modifiedOn: { type: Date, default: Date.now },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'Users' },
}, {
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export const User = mongoose.model<UserDocument, UserModel>('Users', UserSchema);
