import app from './app';
import logger from './logger';
import Env from './env';
import { Express, request, response } from 'express';

app.listen(Env.PORT, () => {
  logger.info(`Server started on http://localhost:${Env.PORT}/api`);
});

app.get('/ping', (request,response) =>{
    response.json('Temos um GET')
});


