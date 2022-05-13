import * as mongoose from 'mongoose';
import { Audit } from '../interfaces/audit.interface';

const Schema = mongoose.Schema;

export interface UserOTPData extends Audit {
    id?: any;
    userId: any;
    otp: string;
    expiry: Date;
    status: string;
}

export interface UserOTPModel extends mongoose.Model<UserOTPDocument> {
}

export interface UserOTPDocument extends mongoose.Document, UserOTPData {
}

export const UserOTPSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    otp: { type: String, unique: true },
    expiry: { type: Date, default: Date.now },
    status: { type: String },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'UserOTPs' },
    modifiedOn: { type: Date, default: Date.now },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'UserOTPs' },
}, {
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export const UserOTP = mongoose.model<UserOTPDocument, UserOTPModel>('UserOTPs', UserOTPSchema);
