import Session from 'domain/models/auth/session';
import User from 'domain/models/auth/user';
import SessionRepository from 'domain/repositories/auth/session.repository';
import UserRepository from 'domain/repositories/auth/user.repository';
import ValidationRepository from 'domain/repositories/auth/validation.repository';
import getUserByCredentials from './get-user-by-credentials';

export const login =
  (
    userRepository: UserRepository,
    validationRepository: ValidationRepository,
    sessionRepository: SessionRepository,
  ) =>
  async (
    email: string,
    password: string,
  ): Promise<{
    jwt: string;
    user: User;
    session: Session;
  }> => {
    const user = await getUserByCredentials(
      userRepository,
      validationRepository,
    )(email, password);
    const userId = user.id;
    const jwt = await validationRepository.createJWT(user);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    const session = await sessionRepository.create({
      expiresAt,
      jwt,
      userId: userId.toString(),
      refreshToken: '',
      refreshTokenExpiresAt: new Date(0),
    });
    return {
      jwt,
      user,
      session,
    };
  };
