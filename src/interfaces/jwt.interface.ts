import { Request } from 'express';

export interface UserPayload {
  userId: number;
}

export interface UserRequest extends Request {
  user?: UserPayload;
}
