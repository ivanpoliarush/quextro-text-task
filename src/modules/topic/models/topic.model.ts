import { Document, Schema, model } from 'mongoose';

export interface ITopicDocument extends Document {
  title: string;
  parent?: Schema.Types.ObjectId;
  confidence?: number;
  userId: Schema.Types.ObjectId;
}

const topicSchema = new Schema<ITopicDocument>({
  title: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    default: null,
  },
  confidence: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Topic = model<ITopicDocument>('Topic', topicSchema);
