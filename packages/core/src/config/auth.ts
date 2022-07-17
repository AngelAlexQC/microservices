export const mongoUrl =
  process.env['MONGO_URI'] || 'mongodb://localhost:27017/';
export const mongoAuthDbName = process.env['MONGO_AUTH_DB_NAME'] || 'auth';
