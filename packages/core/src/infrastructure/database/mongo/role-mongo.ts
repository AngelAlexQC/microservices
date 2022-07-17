import { PERMISSIONS } from 'domain/models/auth/permission';
import Role from 'domain/models/auth/role';
import RoleRepository from 'domain/repositories/auth/role.repository';
import { Schema } from 'mongoose';
import BaseMongo from './base-mongo';

export default class RoleMongo
  extends BaseMongo<Role>
  implements RoleRepository
{
  constructor() {
    const roleSchema: Schema<Role> = new Schema(
      {
        name: {
          required: true,
          type: String,
          unique: true,
        },
      },
      { timestamps: true },
    );
    super(roleSchema, 'Role');
    this.createDefaultRoles();
  }

  async getByName(name: string): Promise<Role> {
    const foundDocuments = await this.getBy({ name });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`Role with name ${name} not found`);
    }
    return foundDocuments[0];
  }

  private async createDefaultRoles() {
    const superAdminRole = await this.getByName('super-admin');
    if (!superAdminRole) {
      await this.create({
        name: 'super-admin',
        permissions: PERMISSIONS,
        description: 'Super admin role',
      });
    }

    const userRole = await this.getByName('user');
    if (!userRole) {
      await this.create({
        name: 'user',
        permissions: [],
        description: 'User role',
      });
    }
  }
}
