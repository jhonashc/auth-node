import { Router } from 'express';

import { UsersController } from '../controllers';
import { isAuthenticated, validateRequest } from '../middlewares';
import { getProfileSchema } from '../schemas';
import { UsersService } from '../services';

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();

    const usersService = new UsersService();
    const usersController = new UsersController(usersService);

    router.get('/:userId/profile', [isAuthenticated, validateRequest(getProfileSchema)], usersController.getProfile);

    return router;
  }
}
