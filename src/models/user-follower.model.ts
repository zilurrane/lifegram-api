import * as mongoose from 'mongoose';
import { Audit } from '../interfaces/audit.interface';

const Schema = mongoose.Schema;

export interface UserFollowerData extends Audit {
    id?: any;
    follower: Object;
    following: Object;
}

export interface UserFollowerModel extends mongoose.Model<UserFollowerDocument> {
}

export interface UserFollowerDocument extends mongoose.Document, UserFollowerData {
}

export const UserFollowerSchema = new Schema({
    follower: { type: Schema.Types.ObjectId, ref: 'Users' },
    following: { type: Schema.Types.ObjectId, ref: 'Users' },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    modifiedOn: { type: Date, default: Date.now },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'Users' }
}, {
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export const UserFollower = mongoose.model<UserFollowerDocument, UserFollowerModel>('UserFollowers', UserFollowerSchema);
