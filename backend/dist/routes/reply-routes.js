import { Router } from 'express';
import { createReply, getAllReplies, likeThread } from '../controllers/thread-controllers.js';
const replyRoutes = Router();
replyRoutes.post('/create/reply', createReply);
replyRoutes.get('/thread/:threadId/replies', getAllReplies);
replyRoutes.get('/thread/like', likeThread);
export default replyRoutes;
//# sourceMappingURL=reply-routes.js.map