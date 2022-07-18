import User from '../../models/auth/user';
import SessionRepository from '../../repositories/auth/session.repository';
import UserRepository from '../../repositories/auth/user.repository';
import ValidationRepository from '../../repositories/auth/validation.repository';
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
  }> => {
    const user = await getUserByCredentials(userRepository)(email, password);
    const userId = user.id;
    const jwt = await validationRepository.createJWT(user);
    const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60);
    const expiresAtRefreshToken = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 7,
    );
    await sessionRepository.create({
      expiresAt,
      jwt,
      userId: userId as string,
      refreshToken: await validationRepository.createRefreshToken(user),
      refreshTokenExpiresAt: expiresAtRefreshToken,
    });
    delete user.password;
    return {
      jwt,
      user,
    };
  };

export default login;
