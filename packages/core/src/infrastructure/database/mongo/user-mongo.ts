import User, { Name } from 'domain/models/auth/user';
import UserRepository from 'domain/repositories/auth/user.repository';
import { Schema } from 'mongoose';
import BaseMongo from './base-mongo';

export default class UserMongo
  extends BaseMongo<User>
  implements UserRepository
{
  constructor() {
    const nameSchema = new Schema<Name>({
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: false,
      },
    });
    const userSchema: Schema<User> = new Schema(
      {
        email: {
          required: true,
          type: String,
          unique: true,
        },
        password: {
          required: true,
          type: String,
          select: false,
        },
        name: nameSchema,
      },
      { timestamps: true },
    );
    super(userSchema, 'User');
  }

  async getByEmail(email: string): Promise<User> {
    const foundDocuments = await this.getBy({ email });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }
    return foundDocuments[0];
  }

  async getByName(name: string): Promise<User> {
    const foundDocuments = await this.getBy({ name });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`User with name ${name} not found`);
    }
    return foundDocuments[0];
  }
}
