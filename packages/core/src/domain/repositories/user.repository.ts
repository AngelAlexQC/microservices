import AbstractRepository from './abstract.repository';
import User from './../models/auth/user';
export default interface UserRepository extends AbstractRepository<User> {
  getByEmail(email: string): Promise<User>;
  getByName(name: string): Promise<User>;
}
