import * as mongoose from 'mongoose';
import { Audit } from '../interfaces/audit.interface';

const Schema = mongoose.Schema;

export interface FeedData extends Audit {
    id?: any;
    text: string;
    medias?: [{ url: string }];
}

export interface FeedModel extends mongoose.Model<FeedDocument> {
}

export interface FeedDocument extends mongoose.Document, FeedData {
}

export const FeedSchema = new Schema({
    text: { type: String },
    medias: [{ url: { type: String } }],
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

export const Feed = mongoose.model<FeedDocument, FeedModel>('Feeds', FeedSchema);
