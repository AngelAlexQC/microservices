import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { JWTSecret } from '../../../config/auth';
import User from '../../../domain/models/auth/user';
import ValidationRepository from '../../../domain/repositories/auth/validation.repository';
import UserMongo from './user-mongo';

export default class ValidationMongo
  extends UserMongo
  implements ValidationRepository
{
  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.getByEmail(email);
    if (!user || !password) {
      return false;
    }
    const isValid = await compareSync(password, user.password as string);
    if (!isValid) {
      return false;
    }
    return true;
  }
  async createPasswordHash(email: string, password: string): Promise<string> {
    const salt = await genSaltSync(10);
    const hash = await hashSync(password, salt);
    return hash;
  }
  async createJWT(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    const options = {
      expiresIn: '1h',
    };
    return sign(payload, JWTSecret, options);
  }
  async validateJWT(jwt: string): Promise<boolean> {
    try {
      const decoded = await verify(jwt, JWTSecret);
      if (!decoded) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  async createRefreshToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    const options = {
      expiresIn: '7d',
    };
    return sign(payload, JWTSecret, options);
  }
}
