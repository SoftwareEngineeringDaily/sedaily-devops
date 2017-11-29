import Bluebird from 'bluebird';
import EventStream from '../../api/EventStream';
import Joi from 'joi';
import paramValidation from '../../config/param-validation';
import APIError from '../helpers/APIError';

const producer = new EventStream.EventStreamProducer();
const consumer = new EventStream.EventStreamConsumer();

setTimeout(() => {
	consumer.subscribe({topicOffsets: ['$','$','$','$','$','$','$','$','$','$',], topics: ['login','logout','playEpisode','pauseEpisode','likeEpisode','completedEpisode','fastForwardEpisode','rewindEpisode','seekEpisode','searchEpisode']}, (data) => {console.log(data)}, (err) => {console.log(err)});
}, 3000)

function validateEventType(req, res, next) {
	Joi.validate(req.body.eventData, paramValidation[req.body.eventType], (error) => {
		if (error) {
			var err = new APIError(error); //eslint-disable-line
      next(err);
		} else {
			next();
		}
	})
}

function newEvent(req, res, next) {
	const { eventType } = req.body;
	producer.sendMessage(eventType, JSON.stringify(new Date()), (err) => {
		if (err) {
			return res.json(err);
		}
		res.json({result: 'success'})
	});
}

export default { validateEventType, newEvent };
