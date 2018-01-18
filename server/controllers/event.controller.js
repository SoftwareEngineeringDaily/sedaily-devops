import Joi from 'joi';
import paramValidation from '../../config/param-validation';
import APIError from '../helpers/APIError';
import InluxInterface from '../helpers/InfluxInterface';

const influxInterface = new InluxInterface();

function validateEventType(req, res, next) {
  Joi.validate(req.body.eventData, paramValidation[req.body.eventType], (error) => {
    if (error) {
      const err = new APIError(error); //eslint-disable-line
      next(err);
    } else {
      next();
    }
  });
}

function newEvent(req, res, next) {
  const { eventType } = req.body;
  influxInterface.write(eventType, req.body, (error) => {
    if (error) {
      const err = new APIError(error); //eslint-disable-line
      next(err);
    } else {
      res.json({ result: 'success' });
    }
  });
}

export default { validateEventType, newEvent };
