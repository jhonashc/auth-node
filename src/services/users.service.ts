import { Prisma, User } from '@prisma/client';

import { CustomError } from '../errors';

import db from '../libs/db';

export class UsersService {
  private basicSelect: Prisma.UserSelect;

  constructor() {
    this.basicSelect = {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  async getProfile(userId: number) {
    const userFound: Omit<User, 'password'> | null = await db.user.findUnique({
      where: { id: userId },
      select: this.basicSelect,
    });

    if (!userFound) {
      throw CustomError.notFound(`The user with id ${userId} has been not found`);
    }

    return {
      status: true,
      data: userFound,
    };
  }
}
