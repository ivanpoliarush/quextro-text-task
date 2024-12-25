import { Request, Response } from 'express';
import { AuthRequest } from '../../../common/types/request';
import { UserService } from '../services/user.service';
import { User } from '../types/user';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async register(req: Request<null, null, User>, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Invalid body' });
        return;
      }

      const { token } = await this.userService.registerUser(email, password);

      res.json({ token });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async login(req: Request<null, null, User>, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Invalid body' });
        return;
      }

      const { token } = await this.userService.login(email, password);

      res.json({ token });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      res.status(500).json({ message });
    }
  }

  async getMe(req: AuthRequest, res: Response) {
    res.json({
      id: req.user?.id,
      email: req.user?.email,
    });
  }
}
