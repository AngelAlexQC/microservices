import Tenant from '../../models/auth/tenant';
import AbstractRepository from '../abstract.repository';

export default interface TenantRepository extends AbstractRepository<Tenant> {
  getByName(name: string): Promise<Tenant>;
}
