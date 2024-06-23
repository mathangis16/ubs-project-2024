import Thread from '../models/Thread.js';
export const createThread = async (req, res) => {
    const { title, content, name } = req.body;
    try {
        const newThread = new Thread({ title, user: name });
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