import { Router } from 'express';
import { createReply, getAllReplies } from '../controllers/thread-controllers.js';

const replyRoutes = Router();

replyRoutes.post('/create/reply', createReply);
replyRoutes.get('/thread/:threadId/replies', getAllReplies);

export default replyRoutes;