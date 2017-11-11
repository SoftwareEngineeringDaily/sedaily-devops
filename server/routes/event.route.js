import express from 'express';
import eventCtrl from '../controllers/event.controller';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
const router = express.Router();

router.route('/')
  .get(eventCtrl.list);

router.route('/')
  .post(validate(paramValidation.event), eventCtrl.newEvent);

export default router;

/*
These are the possible event types:
-Login
-Logout
-Play Episode 
-Pause Episode 
-Thumbs Up / Like  episode 
-Episode listened to completion
*/
