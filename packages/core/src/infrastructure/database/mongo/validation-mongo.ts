import User from '../../../domain/models/auth/user';
import ValidationRepository from '../../../domain/repositories/auth/validation.repository';
import UserMongo from './user-mongo';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export default class ValidationMongo
  extends UserMongo
  implements ValidationRepository
{
  private secret = process.env['JWT_SECRET'] || 'secret';
  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.getByEmail(email);

    if (!user) {
      return false;
    }

    const isValid = await bcrypt.compare(password, user.password as string);
    return isValid ? true : false;
  }
  async createPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async createJWT(user: User): Promise<string> {
    return jwt.sign({ user }, this.secret);
  }

  async validateJWT(jwtToken: string): Promise<boolean> {
    try {
      jwt.verify(jwtToken, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
