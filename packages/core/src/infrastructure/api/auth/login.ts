import { Request, Response } from 'express';
import { isProduction } from '../../../config/common';
import login from '../../../domain/interactors/auth/login';
import RoleMongo from '../../database/mongo/role-mongo';
import SessionMongo from '../../database/mongo/session-mongo';
import UserMongo from '../../database/mongo/user-mongo';
import ValidationMongo from '../../database/mongo/validation-mongo';

export default async function loginHandler(req: Request, res: Response) {
  new RoleMongo();
  const userRepository = new UserMongo();
  const validationRepository = new ValidationMongo();
  const sessionRepository = new SessionMongo();
  if (!req.body) {
    return res.status(422).json({
      error: 'Email and password are required',
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: 'Email and password are required',
    });
  }

  try {
    const loginFunc = login(
      userRepository,
      validationRepository,
      sessionRepository,
    );
    const { jwt, user } = await loginFunc(email, password);

    // Set cookies
    res.cookie('jwt', jwt, {
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
    console.error(error);
    return res.status(401).json({
      error: 'Invalid email or password',
    });
  }
}
