import { Router } from 'express';
import { userRouter } from './user/user.module.js';

export const appRouter = Router();

appRouter.use('/user', userRouter);
