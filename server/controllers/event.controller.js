import Joi from 'joi';
import EventStream from '../../api/EventStream';
import paramValidation from '../../config/param-validation';
import APIError from '../helpers/APIError';

const producer = new EventStream.EventStreamProducer();

function validateEventType(req, res, next) {
  Joi.validate(req.body.eventData, paramValidation[req.body.eventType], (error) => {
    if (error) {
      var err = new APIError(error); //eslint-disable-line
      next(err);
    } else {
      next();
    }
  });
}

function newEvent(req, res, next) {
  const { eventType } = req.body;
  producer.sendMessage(eventType, JSON.stringify(new Date()), (error, ack) => {
    if (error) {
      var err = new APIError(error); //eslint-disable-line
      next(err);
    } else {
      res.json({ result: ack });
    }
  });
}

export default { validateEventType, newEvent };
