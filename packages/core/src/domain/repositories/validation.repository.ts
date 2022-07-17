import User from '../models/auth/user';

export default interface ValidationRepository {
  validatePassword(password: string): Promise<boolean>;
  createPasswordHash(password: string): Promise<string>;
  createJWT(user: User): Promise<string>;
  validateJWT(jwt: string): Promise<User>;
  getSession(jwt: string): Promise<User>;
}
