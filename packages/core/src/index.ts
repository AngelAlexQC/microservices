import getByJWTCookie from './infrastructure/api/auth/get-by-jwt-cookie';
import loginHandler from './infrastructure/api/auth/login';
import registerHandler from './infrastructure/api/auth/register';
import connectToMongo from './infrastructure/database/mongo/config/init-db';

export {
  loginHandler,
  registerHandler,
  connectToMongo as connect,
  getByJWTCookie,
};
export * from './config/auth';
export * from './config/common';
export * from './config/gateway';
