import { NextFunction, Request, Response } from 'express';

import { LoginInput, RefreshTokenInput, RegisterInput } from '../schemas';
import { AuthService } from '../services';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = (req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction): void => {
    const registerInput: RegisterInput = req.body;

    this.authService
      .register(registerInput)
      .then((registerResponse) => res.status(201).json(registerResponse))
      .catch((error) => next(error));
  };

  login = (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction): void => {
    const loginInput: LoginInput = req.body;

    this.authService
      .login(loginInput)
      .then((loginResponse) => res.json(loginResponse))
      .catch((error) => next(error));
  };

  refreshToken = (req: Request<{}, {}, RefreshTokenInput>, res: Response, next: NextFunction): void => {
    const refreshTokenInput: RefreshTokenInput = req.body;

    this.authService
      .refreshToken(refreshTokenInput)
      .then((refreshResponse) => res.json(refreshResponse))
      .catch((error) => next(error));
  };
}
