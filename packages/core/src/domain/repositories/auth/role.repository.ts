import Role from 'domain/models/auth/role';
import AbstractRepository from '../abstract.repository';

export default interface RoleRepository extends AbstractRepository<Role> {
  getByName(name: string): Promise<Role>;
}
