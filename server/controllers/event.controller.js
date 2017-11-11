import Bluebird from 'bluebird';
import producer from '../helpers/Producer';

/*
clientId: Joi.string().required(),
      deviceType: Joi.string().required(),
      location: Joi.string().required(),
      eventTime: Joi.string().required(),
      eventType: Joi.string().required()
*/

function list(req, res, next) {
	producer.showTopics((results) => {
		res.json(JSON.stringify(results));
	})
}

function newEvent(req, res, next) {
	const { eventType } = req.body;
	console.log(eventType)
	//producer.sendMessage(eventType, JSON.stringify(eventType));
	res.json({hello: 'world'});
}

export default { list, newEvent };
