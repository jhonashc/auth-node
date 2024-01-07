import { Router } from 'express';

import { AuthController } from '../controllers';
import { validateRequest } from '../middlewares';
import { loginSchema, registerSchema } from '../schemas';
import { AuthService } from '../services';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();
    const authController = new AuthController(authService);

    router.post('/register', validateRequest(registerSchema), authController.register);
    router.post('/login', validateRequest(loginSchema), authController.login);

    return router;
  }
}
