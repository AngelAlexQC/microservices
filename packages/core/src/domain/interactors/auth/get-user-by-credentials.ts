import { compare } from 'bcrypt';
import User from '../../models/auth/user';
import UserRepository from '../../repositories/auth/user.repository';

export enum LoginMessage {
  Success = 'Success',
  InvalidCredentials = 'Invalid credentials',
}

export const getUserByCredentials =
  (userRepository: UserRepository) =>
  async (email: string, password: string): Promise<User> => {
    const user = await userRepository.getByEmail(email);
    if (!user || !password) {
      throw new Error(LoginMessage.InvalidCredentials);
    }
    const isValid = await compare(password, user.password as string);

    if (!isValid) {
      throw new Error(LoginMessage.InvalidCredentials);
    }
    delete user.password;
    return user;
  };

export default getUserByCredentials;
