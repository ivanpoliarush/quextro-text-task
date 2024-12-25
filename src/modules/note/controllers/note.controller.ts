import { Request, Response } from 'express';
import { RequestUser } from '../../../common/types/request.js';
import { NoteService } from '../services/note.service.js';
import { INote } from '../types/note.js';

export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  async getTopicNotes(
    req: Request<{ id: string }> & RequestUser,
    res: Response,
  ) {
    try {
      const result = await this.noteService.getTopicNotes(
        req.params.id,
        req.user.id,
      );
      res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async createNote(
    req: Request<null, null, INote> & RequestUser,
    res: Response,
  ) {
    try {
      if (
        !req.body.title ||
        !req.body.content ||
        !req.body.topicId ||
        typeof req.body.confidence !== 'number'
      ) {
        res.status(400).json({ message: 'Invalid body' });
      }

      const result = await this.noteService.createNote(req.user.id, req.body);
      res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async updateNote(
    req: Request<{ id: string }, null, INote> & RequestUser,
    res: Response,
  ) {
    try {
      await this.noteService.updateNote(req.params.id, req.user.id, req.body);
      res.json({ message: 'Ok' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async deleteNote(req: Request<{ id: string }> & RequestUser, res: Response) {
    try {
      await this.noteService.deleteNote(req.params.id, req.user.id);
      res.json({ message: 'Ok' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }
}
