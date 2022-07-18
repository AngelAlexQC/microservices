import { Request, Response } from 'express';
import getUserByToken from '../../../domain/interactors/auth/get-user-by-token';
import SessionMongo from '../../database/mongo/session-mongo';
export default async function getByJWTCookie(req: Request, res: Response) {
  // get jwt from cookies
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }
  const sessionRepository = new SessionMongo();
  const getUserFn = getUserByToken(sessionRepository);
  const user = await getUserFn(jwt);
  if (!user) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }

  return res.json(user);
}
