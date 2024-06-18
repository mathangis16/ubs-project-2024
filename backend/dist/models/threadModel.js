import mongoose, { Schema } from 'mongoose';
const threadSchema = new Schema({
    //   id: String,
    title: String,
    userId: String,
    replies: [String],
    likes: [String],
});
const ThreadModel = mongoose.model('Thread', threadSchema);
export default ThreadModel;
//# sourceMappingURL=threadModel.js.map