import User from '../../models/auth/user';

export default interface ValidationRepository {
  validatePassword(email: string, password: string): Promise<boolean>;
  createPasswordHash(email: string, password: string): Promise<string>;
  createJWT(user: User): Promise<string>;
  validateJWT(jwt: string): Promise<boolean>;
  createRefreshToken(user: User): Promise<string>;
}
