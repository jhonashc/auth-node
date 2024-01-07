import { NextFunction, Request, Response } from 'express';

import { RegisterInput } from '../schemas';
import { AuthService } from '../services';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = (req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) => {
    const registerInput: RegisterInput = req.body;

    this.authService
      .register(registerInput)
      .then((registerResponse) => res.status(201).json(registerResponse))
      .catch((error) => next(error));
  };
}
