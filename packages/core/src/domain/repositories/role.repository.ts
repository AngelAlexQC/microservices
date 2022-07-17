import Role from '../models/auth/role';
import AbstractRepository from './abstract.repository';

export default interface RoleRepository extends AbstractRepository<Role> {
  getByName(name: string): Promise<Role>;
}
