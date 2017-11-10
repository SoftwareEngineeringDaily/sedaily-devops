const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.Client();
const _ = require('lodash');

const producer = require('./producer');
const consumer = require('./consumer');

function showTopics() {
	client.once('connect', function () {
    client.loadMetadataForTopics([], function (error, results) {
      if (error) {
      	return console.error(error);
      }
      console.log('Topics:', JSON.stringify(_.get(results, '1.metadata')), '\n');
    });
	});
}

function sendTestMessages() {
	setTimeout(() => {
		var event = {
			client_id: '235823455',
			device_type: 'iPhone 6',
			location: 'Seattle, WA',
			event_time: new Date(),
			event_type: 'login'
		}
		producer.sendMessage(event.event_type, JSON.stringify(event));

		event = {
			client_id: '793986933',
			device_type: 'Galaxy 5',
			location: 'Miami, FL',
			event_time: new Date(),
			event_type: 'logout'
		}
		producer.sendMessage(event.event_type, JSON.stringify(event));

	}, 2000)
}

showTopics();
sendTestMessages();