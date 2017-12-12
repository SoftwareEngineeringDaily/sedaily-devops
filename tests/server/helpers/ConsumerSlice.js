import EventStream from '../../../api/EventStream';
const consumer = new EventStream.EventStreamConsumer();

class ConsumerSlice {
  
  getLastTopicEvent(topic) {
    return new Promise((resolve, reject) => {
      consumer.getSlice({ topic: topic }, (err, data) => {
        resolve(data[data.length - 1].eventId)
      })
    })
  }
}

export default { ConsumerSlice };
