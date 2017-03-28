// import { Router } from 'express';
import { getData } from './middleware/Data';

export default (router) => {
  router.get('/data', (req, res) => getData(res));

  return router;
}
