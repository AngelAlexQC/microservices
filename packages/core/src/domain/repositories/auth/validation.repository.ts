import User from 'domain/models/auth/user';
import UserRepository from './user.repository';

export default interface ValidationRepository extends UserRepository {
  validatePassword(email: string, password: string): Promise<boolean>;
  createPasswordHash(email: string, password: string): Promise<string>;
  createJWT(user: User): Promise<string>;
  validateJWT(jwt: string): Promise<boolean>;
}
