import EventStream from '../../../api/EventStream';
const consumer = new EventStream.EventStreamConsumer();

class ConsumerSlice {
  
  getLastTopicSlice(topic) {
    return new Promise((resolve, reject) => {
      consumer.getSlice({ topic: topic }, (err, data) => {
      	console.log(data)
        resolve(data.topic)
      })
    })
  }
}

export default { ConsumerSlice };
