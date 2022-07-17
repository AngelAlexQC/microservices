export const mongoUrl = process.env['MONGO_URI'] as string;
export const mongoAuthDbName = process.env['MONGO_AUTH_DB_NAME'] as string;
export const isProduction = process.env['NODE_ENV'] === 'production';
