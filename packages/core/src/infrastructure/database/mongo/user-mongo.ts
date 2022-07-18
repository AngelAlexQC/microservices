import User, { Name } from '../../../domain/models/auth/user';
import UserRepository from '../../../domain/repositories/auth/user.repository';
import { Schema } from 'mongoose';
import BaseMongo from './base-mongo';
import { JWTSecret } from '../../../config/auth';
import { verify } from 'jsonwebtoken';

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
        },
        name: nameSchema,
        roles: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Role',
          },
        ],
      },
      { timestamps: true },
    );
    super(userSchema, 'User');
  }

  async getByEmail(email: string): Promise<User> {
    const foundDocument = await this.baseModel
      .findOne({ email })
      .populate('roles')
      .exec();
    if (!foundDocument) {
      throw new Error(`User with email ${email} not found`);
    }
    return foundDocument;
  }

  async getByName(name: string): Promise<User> {
    const foundDocuments = await this.getBy({ name });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`User with name ${name} not found`);
    }
    return foundDocuments[0];
  }

  async getUserByToken(token: string): Promise<User> {
    const decoded = verify(token, JWTSecret);
    const { userId } = decoded as { userId: string };
    const foundDocument = await this.getById(userId);
    if (!foundDocument) {
      throw new Error(`User with id ${userId} not found`);
    }
    return foundDocument;
  }

  override async getById(id: string): Promise<User> {
    const foundDocument = await this.baseModel
      .findOne({ id })
      .populate('roles')
      .exec();
    if (!foundDocument) {
      throw new Error(`User with id ${id} not found`);
    }
    return foundDocument.toObject();
  }
}
