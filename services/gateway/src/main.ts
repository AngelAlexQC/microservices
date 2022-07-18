import { gatewayPort, getByJWTCookie } from '@aquirozdev/core';
import * as express from 'express';
import * as httpProxy from 'express-http-proxy';
const app = express();

const userServiceProxy = httpProxy('http://localhost:3333');

// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next();
});

// Proxy request
app.use('/auth', userServiceProxy);

// Resolve: GET /users/me
app.get('/me', getByJWTCookie);

const port = gatewayPort;
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
