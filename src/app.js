import express from 'express';
import { routerLoader } from './routerLoader.js';

const app = express();

routerLoader(app);

app.listen(8080, function () {
  console.log('Servidor rodando');
});
