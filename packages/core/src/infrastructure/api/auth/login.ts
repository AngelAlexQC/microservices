import { Request, Response } from 'express';
import { isProduction } from '../../../config/common';
import login from '../../../domain/interactors/auth/login';
import SessionMongo from '../../database/mongo/session-mongo';
import UserMongo from '../../database/mongo/user-mongo';
import ValidationMongo from '../../database/mongo/validation-mongo';

export default async function loginHandler(req: Request, res: Response) {
  const userRepository = new UserMongo();
  const validationRepository = new ValidationMongo();
  const sessionRepository = new SessionMongo();
  const requiredBody = res.status(422).json({
    error: 'Email and password are required',
  });
  if (!req.body) {
    return requiredBody;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return requiredBody;
  }

  try {
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
  } catch (error) {
    return res.status(401).json({
      error,
    });
  }
}
