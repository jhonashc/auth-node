import { NextFunction, Request, Response } from 'express';

import { LoginInput, RegisterInput } from '../schemas';
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

  login = (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
    const loginInput: LoginInput = req.body;

    this.authService
      .login(loginInput)
      .then((loginResponse) => res.json(loginResponse))
      .catch((error) => next(error));
  };
}
