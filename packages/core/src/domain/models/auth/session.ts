export default interface Session {
  userId: string;
  jwt: string;
  expiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}
