import { NextFunction, Request, Response } from 'express';
import { isProduction } from '../../../config/common';
import ValidationMongo from '../../database/mongo/validation-mongo';

export default async function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // get jwt from cookies
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }
  const validationRepository = new ValidationMongo();
  const isValid = await validationRepository.validateJWT(jwt);
  if (!isValid) {
    return res.status(401).json({
      error: 'Invalid JWT',
    });
  }

  // clone cookies
  const cookies = { ...req.cookies };

  Object.keys(cookies).forEach((key) => {
    res.cookie(key, cookies[key], {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'lax',
      secure: isProduction,
    });
  });

  return next();
}
