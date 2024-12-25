import { Router } from 'express';
import { authMiddleware } from '../user/middlewares/user-auth.js';
import { NoteController } from './controllers/note.controller.js';
import { NoteService } from './services/note.service.js';

export const noteRouter = Router();

const controller = new NoteController(new NoteService());

noteRouter.get(
  '/:id',
  authMiddleware,
  controller.getTopicNotes.bind(controller) as any,
);
noteRouter.post(
  '/',
  authMiddleware,
  controller.createNote.bind(controller) as any,
);
noteRouter.put(
  '/:id',
  authMiddleware,
  controller.updateNote.bind(controller) as any,
);
noteRouter.delete(
  '/:id',
  authMiddleware,
  controller.deleteNote.bind(controller) as any,
);
