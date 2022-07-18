import { PERMISSIONS } from '../../../domain/models/auth/permission';
import Role from '../../../domain/models/auth/role';
import RoleRepository from '../../../domain/repositories/auth/role.repository';
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
    this.seed();
  }

  async getByName(name: string): Promise<Role> {
    const foundDocuments = await this.getBy({ name });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`Role with name ${name} not found`);
    }
    return foundDocuments[0];
  }

  seed = async (): Promise<Role[]> => {
    const roles = [
      {
        name: 'super-admin',
        permissions: PERMISSIONS,
        description: 'Super admin role',
      },
      {
        name: 'admin',
        permissions: PERMISSIONS,
        description: 'Admin role',
      },
      {
        name: 'user',
        permissions: [],
        description: 'User role',
      },
    ];

    roles.forEach(async (role) => {
      try {
        // Check if role exists
        await this.getByName(role.name);
      } catch (error) {
        // Create role
        await this.create({
          name: role.name,
          permissions: role.permissions,
          description: role.description,
          id: role.name,
        });
      }
    });

    return roles as Role[];
  };
}
