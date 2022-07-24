import {
  authPort,
  connect,
  getByUserIdCookie as handleGetByUserIdCookie,
  jwtMiddleware,
  loginHandler,
  mongoAuthUrl,
  registerHandler,
  setupApp,
} from '@aquirozdev/core';
import * as express from 'express';
const app = express();
const port = authPort;
setupApp(app);

app.post('/login', loginHandler);
app.post('/register', registerHandler);

app.get('/me', jwtMiddleware, handleGetByUserIdCookie);

const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
  connect(mongoAuthUrl, 'auth');
});
server.on('error', console.error);
