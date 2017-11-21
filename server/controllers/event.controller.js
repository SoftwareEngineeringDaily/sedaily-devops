import Bluebird from 'bluebird';
import EventStream from '../../api/EventStream';
import Joi from 'joi';
import paramValidation from '../../config/param-validation';
import APIError from '../helpers/APIError';

const producer = new EventStream.EventStreamProducer();

function validateEventType(req, res, next) {
	Joi.validate(paramValidation[req.body.eventType], req.body.eventData, (error) => {
		if (error) {
			var err = new APIError(error); //eslint-disable-line
      next(error);
		} else {
			next();
		}
	})
}

function newEvent(req, res, next) {
	const { eventType } = req.body;
	producer.sendMessage(eventType, JSON.stringify(new Date()), (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
}

export default { validateEventType, newEvent };
