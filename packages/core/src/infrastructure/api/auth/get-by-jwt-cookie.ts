import { Request, Response } from 'express';
import getUserByToken from '../../../domain/interactors/auth/get-user-by-token';
export default async function getByJWTCookie(req: Request, res: Response) {
  // get jwt from cookies
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }

  const user = await getUserByToken(jwt);
  if (!user) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }

  return res.json(user);
}
