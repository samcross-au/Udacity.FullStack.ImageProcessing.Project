import express from 'express';

import images from './api/images';
import help from './api/help';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Thumnail Image API Service!');
});

routes.use('/images', images);
routes.use('/help', help);

export default routes;