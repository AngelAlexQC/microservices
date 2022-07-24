import { Request, Response } from 'express';
import getUserByToken from '../../../domain/interactors/auth/get-user-by-token';
import UserMongo from '../../database/mongo/user-mongo';
export default async function getByJWTCookie(req: Request, res: Response) {
  // get jwt from cookies
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }
  const userRepository = new UserMongo();
  const getUserFn = getUserByToken(userRepository);
  const user = await getUserFn(jwt);
  if (!user) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }

  delete user.password;
  return res.json(user);
}
