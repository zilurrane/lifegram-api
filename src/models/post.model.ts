import * as mongoose from 'mongoose';
import { Audit } from '../interfaces/audit.interface';

const Schema = mongoose.Schema;

export interface PostData extends Audit {
    id?: any;
    text: string;
    medias?: [{ url: string }];
}

export interface PostModel extends mongoose.Model<PostDocument> {
}

export interface PostDocument extends mongoose.Document, PostData {
}

export const PostSchema = new Schema({
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

export const Post = mongoose.model<PostDocument, PostModel>('Posts', PostSchema);
