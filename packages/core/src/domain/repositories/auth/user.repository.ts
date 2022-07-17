import User from '../../models/auth/user';
import AbstractRepository from '../abstract.repository';

export default interface UserRepository extends AbstractRepository<User> {
  getByEmail(email: string): Promise<User>;
  getByName(name: string): Promise<User>;
}
