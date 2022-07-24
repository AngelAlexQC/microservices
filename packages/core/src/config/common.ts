export const isProduction = (process.env['NODE_ENV'] ===
  'production') as boolean;
export const mongoUser = process.env['MONGO_USER'] || 'admin';
export const mongoPass = process.env['MONGO_PASS'] || 'admin';
export const personURL = process.env['PERSON_URL'] || '.';
