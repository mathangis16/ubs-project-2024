import mongoose, { Schema } from 'mongoose';
// Create the thread schema
const threadSchema = new Schema({
    title: { type: String, required: true },
    userId: { type: String, required: true },
    replies: [
        {
            userId: { type: String, required: true },
            name: { type: String, required: true },
            text: { type: String, required: true },
        },
    ],
    likes: [{ type: String }],
});
// Create the Thread model
const ThreadModel = mongoose.model('Thread', threadSchema);
export default ThreadModel;
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
//# sourceMappingURL=threadModel.js.map