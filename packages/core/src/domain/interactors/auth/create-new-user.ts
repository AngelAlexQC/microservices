import User, { Name } from '../../models/auth/user';
import RoleRepository from '../../repositories/auth/role.repository';
import UserRepository from '../../repositories/auth/user.repository';
import ValidationRepository from '../../repositories/validation.repository';

export const createNewUser =
  (
    userRepository: UserRepository,
    validationRepository: ValidationRepository,
    roleRepository: RoleRepository,
  ) =>
  async (
    name: string | Name,
    email: string,
    password: string,
  ): Promise<User> => {
    const passwordHash = await validationRepository.createPasswordHash(
      password,
    );
    const userRole = await roleRepository.getByName('user');
    return userRepository.create({
      name,
      password: passwordHash,
      email,
      roles: [userRole],
    });
  };
