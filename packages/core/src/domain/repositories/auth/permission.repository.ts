import Permission from 'domain/models/auth/permission';
import AbstractRepository from '../abstract.repository';

export default interface PermissionRepository
  extends AbstractRepository<Permission> {
  getByName(name: string): Promise<Permission>;
}
