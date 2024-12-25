import { Router } from 'express';
import { authMiddleware } from '../user/middlewares/user-auth.js';
import { TopicController } from './controllers/topic.controller.js';
import { TopicService } from './services/topic.service.js';

export const topicRouter = Router();

const controller = new TopicController(new TopicService());

topicRouter.get(
  '/all',
  authMiddleware,
  controller.getUserTopics.bind(controller) as any,
);
topicRouter.post(
  '/',
  authMiddleware,
  controller.createTopic.bind(controller) as any,
);
topicRouter.put(
  '/:id',
  authMiddleware,
  controller.updateTopic.bind(controller) as any,
);
topicRouter.delete(
  '/:id',
  authMiddleware,
  controller.deleteTopic.bind(controller) as any,
);
