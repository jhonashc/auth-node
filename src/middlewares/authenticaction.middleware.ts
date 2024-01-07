import { User } from '@prisma/client';
import { NextFunction, Response } from 'express';

import { envs } from '../config';
import { CustomError } from '../errors';
import { JwtHelper } from '../helpers';
import { UserPayload, UserRequest } from '../interfaces';

import db from '../libs/db';

export const isAuthenticated = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader: string | undefined = req.headers['authorization'];

    if (!authHeader) {
      throw CustomError.badRequest('The token has not been provided');
    }

    const token: string = authHeader.split(' ')[1];

    const { userId }: UserPayload = JwtHelper.verifyToken(token, envs.ACCESS_TOKEN_SECRET_KEY);

    const userFound: User | null = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userFound) {
      throw CustomError.unauthorized('The token is invalid');
    }

    const payload: UserPayload = { userId: userFound.id };

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};
