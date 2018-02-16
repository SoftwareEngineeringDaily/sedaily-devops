import express from 'express';
import validate from 'express-validation';
import errorCtrl from '../controllers/error.controller';
import paramValidation from '../../config/param-validation';

const router = express.Router();

router.route('/')
  .post(validate(paramValidation.error), errorCtrl.newError);

export default router;
