import Session from 'domain/models/auth/session';
import User, { Name } from 'domain/models/auth/user';
import RoleRepository from 'domain/repositories/auth/role.repository';
import SessionRepository from 'domain/repositories/auth/session.repository';
import UserRepository from 'domain/repositories/auth/user.repository';
import ValidationRepository from 'domain/repositories/auth/validation.repository';
import { createNewUser } from './create-new-user';

export const register =
  (
    userRepository: UserRepository,
    validationRepository: ValidationRepository,
    roleRepository: RoleRepository,
    sessionRepository: SessionRepository,
  ) =>
  async (
    name: string | Name,
    email: string,
    password: string,
  ): Promise<{
    jwt: string;
    user: User;
    session: Session;
  }> => {
    const user = await createNewUser(
      userRepository,
      validationRepository,
      roleRepository,
    )(name, email, password);

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
