import User, { Name } from '../../models/auth/user';
import RoleRepository from '../../repositories/auth/role.repository';
import UserRepository from '../../repositories/auth/user.repository';
import ValidationRepository from '../../repositories/auth/validation.repository';

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
    let userRole;
    try {
      userRole = await roleRepository.getByName('user');
    } catch (e) {
      userRole = await roleRepository.create({
        name: 'user',
        permissions: [],
        description: 'A user with limited permissions',
      });
    }
    const newName =
      typeof name === 'string'
        ? {
            first: name,
            last: '',
          }
        : name;
    try {
      const user = await userRepository.getByEmail(email);
      if (user) {
        userRepository.patch(user.id, {
          password: passwordHash,
          name: newName,
        });
        return user;
      }
    } catch (error) {
      const user = await userRepository.create({
        email,
        name: newName,
        password: passwordHash,
        roles: [userRole],
      });
      delete user.password;
      return user;
    }

    throw new Error('User already exists');
  };
