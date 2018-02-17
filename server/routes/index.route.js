import express from 'express';
import eventRoutes from './event.route';
import errorRoutes from './error.route';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK'));

router.use('/event', eventRoutes);
router.use('/error', errorRoutes);

export default router;
