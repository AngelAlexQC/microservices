import User from '../../models/auth/user';
import UserRepository from '../../repositories/auth/user.repository';

export const getUserByToken =
  (userRepository: UserRepository) =>
  async (token: string): Promise<User> => {
    const user = await userRepository.getUserByToken(token);
    return user;
  };

export default getUserByToken;
