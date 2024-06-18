import express from 'express';
import { Router } from 'express';
import { createThread, getAllThreads } from '../controllers/forum-controllers.js';

//const router: Router = express.Router();
const forumRoutes=Router();
forumRoutes.post('/create/thread', createThread);
forumRoutes.get('/all/threads', getAllThreads);

export default forumRoutes;
