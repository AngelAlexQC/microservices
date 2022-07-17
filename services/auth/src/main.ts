import * as express from 'express';
import { loginHandler, registerHandler } from '@aquirozdev/core';
const app = express();

app.post('/login', loginHandler);
app.post('/register', registerHandler);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
