import express from 'express';
import validate from 'express-validation';
import eventCtrl from '../controllers/event.controller';
import paramValidation from '../../config/param-validation';

const router = express.Router();

// Disabling validation for now
// router.use(expressJwt({ secret: config.jwtSecret }));

/**
 * @swagger
 * tags:
 * - name: event
 *   description: Sending user events
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Stream an event
 *     description: Stream an event
 *     tags: [event]
 *     parameters:
 *       - in: body
 *         name: event
 *         schema:
 *             $ref: '#/definitions/Event'
 *         required: true
 *         description: Event to stream
 *     responses:
 *       '200':
 *         $ref: '#/responses/Success'
 *       '400':
 *         $ref: '#/responses/BadRequest'
 *       '401':
 *         $ref: '#/responses/Unauthorized'
 *       '404':
 *         $ref: '#/responses/NotFound'
 */

router.route('/')
  .post(validate(paramValidation.event), eventCtrl.validateEventType, eventCtrl.newEvent);

export default router;
