import User, { Name } from '../../models/auth/user';
import RoleRepository from '../../repositories/auth/role.repository';
import UserRepository from '../../repositories/auth/user.repository';
import ValidationRepository from '../../repositories/auth/validation.repository';
import { createNewUser } from './create-new-user';

export const register =
  (
    userRepository: UserRepository,
    validationRepository: ValidationRepository,
    roleRepository: RoleRepository,
  ) =>
  async (
    name: string | Name,
    email: string,
    password: string,
  ): Promise<{
    jwt: string;
    user: User;
  }> => {
    const user = await createNewUser(
      userRepository,
      validationRepository,
      roleRepository,
    )(name, email, password);

    const jwt = await validationRepository.createJWT(user);
    delete user.password;
    return {
      jwt,
      user,
    };
  };

export default register;
