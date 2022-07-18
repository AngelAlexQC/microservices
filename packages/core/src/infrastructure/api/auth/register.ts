import { Request, Response } from 'express';
import { isProduction } from '../../../config/common';
import register from '../../../domain/interactors/auth/register';
import RoleMongo from '../../database/mongo/role-mongo';
import UserMongo from '../../database/mongo/user-mongo';
import ValidationMongo from '../../database/mongo/validation-mongo';

export default async function registerHandler(req: Request, res: Response) {
  const roleRepository = new RoleMongo();
  const userRepository = new UserMongo();
  const validationRepository = new ValidationMongo();
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res.status(422).json({
      error: 'Name, email and password are required',
    });
  }
  try {
    const { name, email, password } = req.body;
    const registerFunc = register(
      userRepository,
      validationRepository,
      roleRepository,
    );
    const { jwt, user } = await registerFunc(name, email, password);

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
    delete user.password;
    return res.json({
      jwt,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      error: error,
    });
  }
}
