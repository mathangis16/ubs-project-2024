import Thread from '../models/threadModel.js'; // Adjust the path as necessary
export const createThread = async (req, res) => {
    const { thread, userId } = req.body;
    try {
        const newThread = new Thread({
            title: thread,
            userId,
            replies: [],
            likes: [],
        });
        await newThread.save();
        // const threads: ThreadDocument[] = await Thread.find();
        const threads = await Thread.find();
        res.json({ message: "Thread created successfully!", threads });
    }
    catch (err) {
        console.error("Error creating thread:", err);
        res.status(500).json({ error_message: "Failed to create thread" });
    }
};
export const getAllThreads = async (req, res) => {
    try {
        // const threads: ThreadDocument[] = await Thread.find();
        const threads = await Thread.find();
        res.json({ threads });
    }
    catch (err) {
        console.error("Error fetching threads:", err);
        res.status(500).json({ error_message: "Failed to fetch threads" });
    }
};
//# sourceMappingURL=forum-controllers.js.map