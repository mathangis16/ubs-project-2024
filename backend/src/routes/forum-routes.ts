// import { Router } from 'express';
// import { createThread, getAllThreads } from '../controllers/forum-controllers.js';

// const forumRoutes = Router();

// forumRoutes.post('/create/thread', createThread);
// forumRoutes.get('/all/threads', getAllThreads);

// export default forumRoutes;

import { Router } from 'express';
import { createThread, getAllThreads } from '../controllers/forum-controllers.js';

const forumRoutes = Router();

forumRoutes.post('/create/thread', (req, res, next) => {
  console.log('POST /create/thread route hit');
  next();
}, createThread);

forumRoutes.get('/all/threads', (req, res, next) => {
  console.log('GET /all/threads route hit');
  next();
}, getAllThreads);

export default forumRoutes;


