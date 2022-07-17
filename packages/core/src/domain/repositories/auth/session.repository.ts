import Session from 'domain/models/auth/session';
import AbstractRepository from '../abstract.repository';

export default interface SessionRepository extends AbstractRepository<Session> {
  getByJWT(jwt: string): Promise<Session>;
  getByUserId(userId: string): Promise<Session>;
}
