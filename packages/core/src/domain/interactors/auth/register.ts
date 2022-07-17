import Session from '../../models/auth/session';
import User, { Name } from '../../models/auth/user';
import RoleRepository from '../../repositories/role.repository';
import SessionRepository from '../../repositories/session.repository';
import UserRepository from '../../repositories/user.repository';
import ValidationRepository from '../../repositories/validation.repository';
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
