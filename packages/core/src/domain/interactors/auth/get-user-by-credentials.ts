import User from 'domain/models/auth/user';
import UserRepository from 'domain/repositories/auth/user.repository';
import ValidationRepository from 'domain/repositories/auth/validation.repository';

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
    if (!(await validationRepository.validatePassword(email, password))) {
      throw new Error(LoginMessage.InvalidCredentials);
    }
    return user;
  };

export default getUserByCredentials;
