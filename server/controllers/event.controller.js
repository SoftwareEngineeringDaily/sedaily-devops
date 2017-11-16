import Bluebird from 'bluebird';
import EventStream from '../../api/EventStream';

const producer = new EventStream.EventStreamProducer();

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
