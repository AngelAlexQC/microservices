// user & pass = admin
export const mongoDNIUrl =
  process.env['MONGO_URI'] || 'mongodb://localhost:27017';
export const mongoDNIDbName = process.env['MONGO_DNI_DB_NAME'] || 'dni';
export const dniPort = process.env['DNI_PORT'] || 3334;
