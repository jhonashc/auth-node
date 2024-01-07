import { NextFunction, Request, Response } from 'express';

import { GetProfileInput } from '../schemas';
import { UsersService } from '../services';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getProfile = (req: Request<GetProfileInput>, res: Response, next: NextFunction): void => {
    const userId: number = parseInt(req.params.userId);

    this.usersService
      .getProfile(userId)
      .then((profileResponse) => res.json(profileResponse))
      .catch((error) => next(error));
  };
}
