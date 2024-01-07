import jwt from 'jsonwebtoken';

import { UserPayload } from '../interfaces';

export class JwtHelper {
  static generateToken(payload: UserPayload, secret: string, expiresIn: number): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static verifyToken(token: string, secret: string): UserPayload {
    return jwt.verify(token, secret) as UserPayload;
  }
}
