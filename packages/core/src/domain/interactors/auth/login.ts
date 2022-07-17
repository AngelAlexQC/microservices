import Session from '../../models/auth/session';
import User from '../../models/auth/user';
import SessionRepository from '../../repositories/session.repository';
import UserRepository from '../../repositories/user.repository';
import ValidationRepository from '../../repositories/validation.repository';
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
