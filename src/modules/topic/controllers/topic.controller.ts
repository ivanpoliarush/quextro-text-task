import { Request, Response } from 'express';
import { AuthRequest, RequestUser } from '../../../common/types/request';
import { TopicService } from '../services/topic.service';
import { ITopic } from '../types/topic';

export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  async getUserTopics(req: AuthRequest, res: Response) {
    try {
      const result = await this.topicService.getUserTopics(req.user.id);
      res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async createTopic(
    req: Request<null, null, ITopic> & RequestUser,
    res: Response,
  ) {
    try {
      if (!req.body.title) {
        res.status(400).json({ message: 'Invalid body' });
        return;
      }

      const result = await this.topicService.createTopic(req.user.id, req.body);
      res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async deleteTopic(req: Request<{ id: string }> & RequestUser, res: Response) {
    try {
      await this.topicService.deleteTopic(req.user.id, req.params.id);

      res.json({ message: 'Ok' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async updateTopic(
    req: Request<{ id: string }, null, ITopic> & RequestUser,
    res: Response,
  ) {
    try {
      await this.topicService.updateTopic(req.user.id, req.params.id, req.body);

      res.json({ message: 'Ok' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }
}
