// user & pass = admin
export const mongoAuthUrl =
  process.env['MONGO_URI'] || 'mongodb://localhost:27017';
export const mongoAuthDbName = process.env['MONGO_AUTH_DB_NAME'] || 'auth';
export const JWTSecret = process.env['JWT_SECRET'] || 'secret';
export const authPort = process.env['AUTH_PORT'] || 3333;
