import mongoose, { Schema, Document } from 'mongoose';

export interface Thread {
//   id: string;
  title: string;
  userId: string;
  replies: string[];
  likes: string[];
}

export interface ThreadDocument extends Document {
//   id: string;
  title: string;
  userId: string;
  replies: string[];
  likes: string[];
}

const threadSchema = new Schema<Thread>({
//   id: String,
  title: String,
  userId: String,
  replies: [String],
  likes: [String],
});

const ThreadModel = mongoose.model<ThreadDocument>('Thread', threadSchema);

export default ThreadModel;
