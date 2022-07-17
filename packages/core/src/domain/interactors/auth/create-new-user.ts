import User, { Name } from 'domain/models/auth/user';
import RoleRepository from 'domain/repositories/auth/role.repository';
import UserRepository from 'domain/repositories/auth/user.repository';
import ValidationRepository from 'domain/repositories/auth/validation.repository';

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
      email,
      password,
    );
    const userRole = await roleRepository.getByName('user');
    const newName =
      typeof name === 'string'
        ? {
            first: name,
            last: '',
          }
        : name;
    const newUser = await userRepository.create({
      email,
      name: newName,
      password: passwordHash,
      roles: [userRole],
    });
    return newUser;
  };
