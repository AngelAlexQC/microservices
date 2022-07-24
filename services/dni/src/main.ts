import {
  dniPort,
  connect,
  setupApp,
  getPersonHandler,
  mongoDNIUrl,
} from '@aquirozdev/core';
import * as express from 'express';
const app = express();
const port = dniPort;
setupApp(app);

app.get('/check/:dni', getPersonHandler);

const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
  connect(mongoDNIUrl, 'dni');
});
server.on('error', console.error);
