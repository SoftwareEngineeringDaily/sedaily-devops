import express from 'express';
import eventCtrl from '../controllers/event.controller';

const router = express.Router();

router.route('/')
  .get(eventCtrl.list);

router.route('/login')
  .post(eventCtrl.loginEvent);

export default router;
