const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.Client();
const producer = new Producer(client)
    
producer.on('ready', function () {
    console.log('Producer ready\n');
});

function sendMessage(topic, message) {
    producer.send([{ topic: topic, messages: message }], function (err, data) {
        if (err) {
            return console.log(err)
        }
    });
}


module.exports = {
    sendMessage: sendMessage
}


/*
Client id /  username
Device type (IOS, Android, Browser)
Location (where is the request originating from)
EventTime (UTC time the event was published)
EventType:
*/
