import { Request, Response } from 'express';
import { isProduction } from '../../../config/common';
import register from '../../../domain/interactors/auth/register';
import RoleMongo from '../../database/mongo/role-mongo';
import SessionMongo from '../../database/mongo/session-mongo';
import UserMongo from '../../database/mongo/user-mongo';
import ValidationMongo from '../../database/mongo/validation-mongo';

export default async function registerHandler(req: Request, res: Response) {
  const userRepository = new UserMongo();
  const validationRepository = new ValidationMongo();
  const roleRepository = new RoleMongo();
  await roleRepository.seed();
  const sessionRepository = new SessionMongo();

  const { name, email, password } = req.body;
  const registerFunc = register(
    userRepository,
    validationRepository,
    roleRepository,
    sessionRepository,
  );
  const { jwt, user, session } = await registerFunc(name, email, password);

  // Set cookies
  res.cookie('jwt', session.jwt, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax',
    secure: isProduction,
  });
  res.cookie('user', user, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax',
    secure: isProduction,
  });

  return res.json({
    jwt,
    user,
  });
}
