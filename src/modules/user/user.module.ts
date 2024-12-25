import { Router } from 'express';
import { UserController } from './controllers/user.controller.js';
import { authMiddleware } from './middlewares/user-auth.js';
import { UserService } from './services/user.service.js';

const controller = new UserController(new UserService());

export const userRouter = Router();

userRouter.post('/register', controller.register.bind(controller));
userRouter.post('/login', controller.login.bind(controller));
userRouter.get('/me', authMiddleware, controller.getMe.bind(controller) as any);
