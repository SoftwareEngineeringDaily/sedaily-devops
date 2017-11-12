import kafka from 'kafka-node';

import { Producer } from './Producer';

class KafkaProducer extends Producer {
  constructor() {
    super();
    this.producer = new kafka.Producer(new kafka.Client());
  }

  sendMessage(topic, message, errorCallback) {
    this.producer.send([{ topic, messages: message }], (err, data) => {
      if (err) {
        errorCallback(err);
      }
      errorCallback(null, data);
    });
  }
}


export default { KafkaProducer };
