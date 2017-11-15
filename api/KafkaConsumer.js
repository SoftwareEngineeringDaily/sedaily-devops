import kafka from 'kafka-node';

import { Consumer } from './Consumer';

class KafkaConsumer extends Consumer {
  constructor() {
    super();
    this.consumer = null;
  }

  subscribe(args, callback, errorCallback) {
    this.consumer = new kafka.Consumer(
      new kafka.Client(),
      args.topics,
      { autoCommit: false }
    );

    this.consumer.on('message', message => callback(message));
    this.consumer.on('error', error => errorCallback(error));
  }
}


export default { KafkaConsumer };
