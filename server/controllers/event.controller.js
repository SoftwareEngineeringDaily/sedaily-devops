import Bluebird from 'bluebird';
import producer from '../helpers/Producer';



function list(req, res, next) {
	const { postId } = req.params;
  const { parentCommentId } = req.body;
  const { content } = req.body;
  const { user } = req;
  
	var event = {
			client_id: '235823455',
			device_type: 'iPhone 6',
			location: 'Seattle, WA',
			event_time: new Date(),
			event_type: 'login'
		}
	producer.sendMessage(event.event_type, JSON.stringify(event));
  res.json({hello: 'world'});
}

function loginEvent(req, res, next) {
	res.json({hello: 'world'});
}

export default { list, loginEvent };
