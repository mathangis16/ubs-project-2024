import Thread from '../models/Thread.js';
import User from '../models/User.js';
export const createThread = async (req, res) => {
    const { title, userName } = req.body;
    try {
        const user = await User.findOne({ name: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newThread = new Thread({ title, user: user._id });
        await newThread.save();
        const threads = await Thread.find().populate('user');
        res.status(201).json({ message: 'Thread created successfully', threads });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const getAllThreads = async (req, res) => {
    try {
        const threads = await Thread.find().populate('user');
        res.status(200).json({ threads });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const createReply = async (req, res) => {
    const { threadId, content, userName } = req.body;
    try {
        const user = await User.findOne({ name: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const thread = await Thread.findById(threadId);
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        const newReply = {
            user: user._id,
            content,
        };
        thread.replies.push(newReply);
        await thread.save();
        const populatedThread = await Thread.findById(threadId).populate('user').populate('replies.user');
        res.status(201).json({ message: 'Reply added successfully', thread: populatedThread });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const getAllReplies = async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findById(threadId).populate('replies.user');
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        res.status(200).json({ replies: thread.replies });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// import { Request, Response } from 'express';
// import Thread, { ThreadDocument } from '../models/threadModel.js'; // Adjust the path as necessary
// export const createThread = async (req: Request, res: Response): Promise<void> => {
//     const { thread, userId } = req.body as { thread: string; userId: string };
//     try {
//         const newThread: ThreadDocument = new Thread({
//             title: thread,
//             userId,
//             replies: [],
//             likes: [],
//         });
//         await newThread.save();
//         const threads: ThreadDocument[] = await Thread.find();
//         res.json({ message: "Thread created successfully!", threads });
//     } catch (err: any) {
//         console.error("Error creating thread:", err);
//         res.status(500).json({ error_message: "Failed to create thread" });
//     }
// };
// export const getAllThreads = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const threads: ThreadDocument[] = await Thread.find();
//         res.json({ threads });
//     } catch (err: any) {
//         console.error("Error fetching threads:", err);
//         res.status(500).json({ error_message: "Failed to fetch threads" });
//     }
// };
//# sourceMappingURL=thread-controllers.js.map