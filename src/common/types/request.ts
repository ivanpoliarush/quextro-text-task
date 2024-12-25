import { Request } from 'express';

export interface RequestUser {
  user: {
    id: string;
    email: string;
  };
}

export type AuthRequest = Request & RequestUser;
