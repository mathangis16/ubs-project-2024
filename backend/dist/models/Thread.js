//new thread model
import mongoose from "mongoose";
import { randomUUID } from "crypto";
const replySchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const likeSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const threadSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [likeSchema],
    replies: [replySchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Thread", threadSchema);
// import mongoose, { Schema, Document } from 'mongoose';
// // Define the Reply interface
// interface Reply {
//   userId: string;
//   name: string;
//   text: string;
// }
// // Define the Thread interface
// export interface Thread {
//   title: string;
//   userId: string;
//   replies: Reply[];
//   likes: string[];
// }
// // Extend the Document interface to include the Thread interface
// export interface ThreadDocument extends Document, Thread {}
// // Create the thread schema
// const threadSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   userId: { type: String, required: true },
//   replies: [
//     {
//       userId: { type: String, required: true },
//       name: { type: String, required: true },
//       text: { type: String, required: true },
//     },
//   ],
//   likes: [{ type: String }],
// });
// // Create the Thread model
// const ThreadModel = mongoose.model<ThreadDocument>('Thread', threadSchema);
// export default ThreadModel;
// import mongoose, { Schema, Document } from 'mongoose';
// export interface Thread {
// //   id: string;
//   title: string;
//   userId: string;
//   replies: string[];
//   likes: string[];
// }
// export interface ThreadDocument extends Document {
// //   id: string;
//   title: string;
//   userId: string;
//   replies: string[];
//   likes: string[];
// }
// const threadSchema = new Schema<Thread>({
// //   id: String,
//   title: String,
//   userId: String,
//   replies: [String],
//   likes: [String],
// });
// const ThreadModel = mongoose.model<ThreadDocument>('Thread', threadSchema);
// export default ThreadModel;
//# sourceMappingURL=Thread.js.map