import { Router } from 'express';
import { noteRouter } from './note/note.module.js';
import { topicRouter } from './topic/topic.module.js';
import { userRouter } from './user/user.module.js';

export const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/topic', topicRouter);
appRouter.use('/note', noteRouter);
