import kafka from 'kafka-node';

const Producer = kafka.Producer;
const client = new kafka.Client();
const producer = new Producer(client)
    

function showTopics(callback) {
  console.log('getting topics')
  client.loadMetadataForTopics([], function (error, results) {
    if (error) {
      return console.error(error);
    }
    callback(results[1].metadata)
  });
}

producer.on('ready', function () {
    console.log('Producer ready\n');
});

function sendMessage(topic, message, callback) {
  console.log(topic, message)
    producer.send([{ topic: topic, messages: message }], function (err, data) {
      if (err) {
          callback(err)
      }
      callback(null, data)
    });
}

export default { sendMessage, showTopics };
