import express from 'express';
import expressJwt from 'express-jwt';
import validate from 'express-validation';
import eventCtrl from '../controllers/event.controller';
import config from '../../config/config';
import paramValidation from '../../config/param-validation';

const router = express.Router();

router.use(expressJwt({ secret: config.jwtSecret }));

router.route('/')
  .post(validate(paramValidation.event), eventCtrl.validateEventType, eventCtrl.newEvent);

router.route('/')
  .get(eventCtrl.queryEventType);

export default router;
