import { User } from '@prisma/client';

import { envs } from '../config';
import { CustomError } from '../errors';
import { BcryptHelper, JwtHelper } from '../helpers';
import { UserPayload } from '../interfaces';
import { LoginInput, RefreshTokenInput, RegisterInput } from '../schemas';

import prisma from '../libs/db';

export class AuthService {
  constructor() {}

  async register(regiserInput: RegisterInput) {
    const { username, email, password } = regiserInput;

    const getUserByName: Promise<User | null> = prisma.user.findUnique({
      where: {
        username,
      },
    });

    const getUserByEmail: Promise<User | null> = prisma.user.findUnique({
      where: {
        email,
      },
    });

    const [userByNameFound, userByEmailFound] = await Promise.all([getUserByName, getUserByEmail]);

    if (userByNameFound && userByEmailFound) {
      throw CustomError.conflict(`The username ${username} and email ${email} are already taken`);
    }

    if (userByNameFound) {
      throw CustomError.conflict(`The username ${username} is already taken`);
    }

    if (userByEmailFound) {
      throw CustomError.conflict(`The email ${email} is already taken`);
    }

    const encrytepPassword: string = await BcryptHelper.encryptPassword(password);

    const createdUser: User = await prisma.user.create({
      data: {
        username,
        email,
        password: encrytepPassword,
      },
    });

    const payload: UserPayload = { userId: createdUser.id };

    const accessToken: string = JwtHelper.generateToken(
      payload,
      envs.ACCESS_TOKEN_SECRET_KEY,
      envs.ACCESS_TOKEN_EXPIRATION_TIME,
    );

    const refreshToken: string = JwtHelper.generateToken(
      payload,
      envs.REFRESH_TOKEN_SECRET_KEY,
      envs.REFRESH_TOKEN_EXPIRATION_TIME,
    );

    return {
      status: true,
      user: {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(loginInput: LoginInput) {
    const { userOrEmail, password } = loginInput;

    const userFound: User | null = await prisma.user.findFirst({
      where: {
        OR: [{ username: userOrEmail }, { email: userOrEmail }],
      },
    });

    if (!userFound) {
      throw CustomError.unauthorized('The credentials entered are incorrect');
    }

    const comparedPasswords: boolean = await BcryptHelper.comparePasswords(password, userFound.password);

    if (!comparedPasswords) {
      throw CustomError.unauthorized('The credentials entered are incorrect');
    }

    const payload: UserPayload = { userId: userFound.id };

    const accessToken: string = JwtHelper.generateToken(
      payload,
      envs.ACCESS_TOKEN_SECRET_KEY,
      envs.ACCESS_TOKEN_EXPIRATION_TIME,
    );

    const refreshToken: string = JwtHelper.generateToken(
      payload,
      envs.REFRESH_TOKEN_SECRET_KEY,
      envs.REFRESH_TOKEN_EXPIRATION_TIME,
    );

    return {
      status: true,
      user: {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput) {
    const { refreshToken } = refreshTokenInput;

    const { userId }: UserPayload = JwtHelper.verifyToken(refreshToken, envs.REFRESH_TOKEN_SECRET_KEY);

    const userFound: User | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      throw CustomError.unauthorized('The token is invalid');
    }

    const payload: UserPayload = { userId: userFound.id };

    const accessToken: string = JwtHelper.generateToken(
      payload,
      envs.ACCESS_TOKEN_SECRET_KEY,
      envs.REFRESH_TOKEN_EXPIRATION_TIME,
    );

    return {
      status: true,
      user: {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
      },
      accessToken,
      refreshToken,
    };
  }
}
