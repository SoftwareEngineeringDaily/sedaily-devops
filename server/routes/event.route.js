import express from 'express';
import validate from 'express-validation';
import eventCtrl from '../controllers/event.controller';
import paramValidation from '../../config/param-validation';

const router = express.Router();

// Disabling validation for now
// router.use(expressJwt({ secret: config.jwtSecret }));

router.route('/')
  .post(validate(paramValidation.event), eventCtrl.validateEventType, eventCtrl.newEvent);

export default router;
