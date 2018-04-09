import express from 'express';
import eventRoutes from './event.route';
import errorRoutes from './error.route';
import docRoutes from '../docs';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * @swagger
 * tags:
 * - name: general
 *   description: General/server-related
 */

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Health check of server
 *     description: Confirm SED API server running and okay
 *     tags: [general]
 *     responses:
 *       200:
 *         description: successful operation
 */

router.get('/health-check', (req, res) =>
  res.send('OK'));

router.use('/event', eventRoutes);
router.use('/error', errorRoutes);
router.use('/docs', docRoutes);

export default router;
