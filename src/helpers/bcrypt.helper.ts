import bcrypt from 'bcrypt';

export class BcryptHelper {
  static encryptPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  }

  static comparePasswords(password: string, receivedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, receivedPassword);
  }
}
