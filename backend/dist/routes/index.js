import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
import forumRoutes from "./thread-routes.js";
import replyRoutes from "./reply-routes.js";
const appRouter = Router();
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats
appRouter.use("/discussionForum", forumRoutes); //domain/api/v1/DiscussionForum
appRouter.use("/forumUser", replyRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map