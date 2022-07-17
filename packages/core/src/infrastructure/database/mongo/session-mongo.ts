import Session from 'domain/models/auth/session';
import SessionRepository from 'domain/repositories/auth/session.repository';
import { Schema } from 'mongoose';
import BaseMongo from './base-mongo';

export default class SessionMongo
  extends BaseMongo<Session>
  implements SessionRepository
{
  constructor() {
    const sessionSchema = new Schema<Session>({
      jwt: {
        required: true,
        type: String,
      },
      expiresAt: {
        required: true,
        type: Date,
      },
      refreshToken: {
        required: true,
        type: String,
      },
      userId: {
        required: true,
        type: String,
      },
      refreshTokenExpiresAt: {
        required: true,
        type: Date,
      },
    });
    super(sessionSchema, 'Session');
  }

  async getByJWT(jwt: string): Promise<Session> {
    const foundDocuments = await this.getBy({ jwt });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`Session with jwt ${jwt} not found`);
    }
    return foundDocuments[0];
  }

  async getByUserId(userId: string): Promise<Session> {
    const foundDocuments = await this.getBy({ userId });
    if (!foundDocuments || foundDocuments.length === 0) {
      throw new Error(`Session with userId ${userId} not found`);
    }
    return foundDocuments[0];
  }
}
