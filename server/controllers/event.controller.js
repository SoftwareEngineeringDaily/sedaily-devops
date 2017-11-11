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
	producer.sendMessage(eventType, JSON.stringify(new Date()), (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);		
		}
	});
}

export default { list, newEvent };
