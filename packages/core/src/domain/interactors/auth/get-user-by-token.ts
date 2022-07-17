import Session from 'domain/models/auth/session';
import SessionRepository from 'domain/repositories/auth/session.repository';

export const getUserByToken =
  (sessionRepository: SessionRepository) =>
  async (token: string): Promise<Session> => {
    const user = await sessionRepository.getByJWT(token);
    return user;
  };

export default getUserByToken;
