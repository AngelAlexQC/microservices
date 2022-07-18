import getByUserIdCookie from './infrastructure/api/auth/get-by-jwt-cookie';
import jwtMiddleware from './infrastructure/api/auth/jwt-middleware';
import loginHandler from './infrastructure/api/auth/login';
import registerHandler from './infrastructure/api/auth/register';
import connectToMongo from './infrastructure/database/mongo/config/init-db';

export {
  loginHandler,
  registerHandler,
  connectToMongo as connect,
  getByUserIdCookie,
  jwtMiddleware,
};
export * from './config/auth';
export * from './config/common';
export * from './config/gateway';
export * from './config/setup-app';
