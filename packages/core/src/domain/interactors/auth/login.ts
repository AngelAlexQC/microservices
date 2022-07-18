import User from '../../models/auth/user';
import UserRepository from '../../repositories/auth/user.repository';
import ValidationRepository from '../../repositories/auth/validation.repository';
import getUserByCredentials from './get-user-by-credentials';

export const login =
  (
    userRepository: UserRepository,
    validationRepository: ValidationRepository,
  ) =>
  async (
    email: string,
    password: string,
  ): Promise<{
    jwt: string;
    user: User;
  }> => {
    const user = await getUserByCredentials(userRepository)(email, password);
    const jwt = await validationRepository.createJWT(user);
    delete user.password;
    return {
      jwt,
      user,
    };
  };

export default login;
