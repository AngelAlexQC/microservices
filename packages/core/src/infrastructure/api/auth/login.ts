import { isProduction } from 'config/common';
import { login } from 'domain/interactors/auth/login';
import { Request, Response } from 'express';
import SessionMongo from 'infrastructure/database/mongo/session-mongo';
import UserMongo from 'infrastructure/database/mongo/user-mongo';
import ValidationMongo from 'infrastructure/database/mongo/validation-mongo';

export default async function loginHandler(req: Request, res: Response) {
  const userRepository = new UserMongo();
  const validationRepository = new ValidationMongo();
  const sessionRepository = new SessionMongo();

  const { email, password } = req.body;
  const loginFunc = login(
    userRepository,
    validationRepository,
    sessionRepository,
  );
  const { jwt, user, session } = await loginFunc(email, password);

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
