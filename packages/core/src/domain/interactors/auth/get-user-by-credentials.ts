import UserRepository from '../../repositories/user.repository';
import User from '../../models/auth/user';
import ValidationRepository from '../../repositories/validation.repository';

export enum LoginMessage {
  Success = 'Success',
  InvalidCredentials = 'Invalid credentials',
}

export const getUserByCredentials =
  (
    userRepository: UserRepository,
    validationRepository: ValidationRepository,
  ) =>
  async (email: string, password: string): Promise<User> => {
    const user = await userRepository.getByEmail(email);
    if (!user) {
      throw new Error(LoginMessage.InvalidCredentials);
    }
    if (!(await validationRepository.validatePassword(password))) {
      throw new Error(LoginMessage.InvalidCredentials);
    }
    return user;
  };

export default getUserByCredentials;
