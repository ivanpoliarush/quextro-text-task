import { Document, Schema, Types, model } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  topicId: Schema.Types.ObjectId;
  confidence: number;
  attachments: string[];
  createdAt: Date;
}

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  topicId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Topic',
  },
  confidence: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  attachments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = model<INote>('Note', noteSchema);

export default Note;
