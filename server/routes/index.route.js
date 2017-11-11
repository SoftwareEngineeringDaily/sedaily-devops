import express from 'express';
//import authRoutes from './auth.route';
import eventRoutes from './event.route';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK'));

router.use('/events', eventRoutes);

// mount auth routes at /auth
//router.use('/auth', authRoutes);

export default router;
