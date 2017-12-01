import redis from 'redis';

import { Producer } from './Producer';

redis.add_command('xadd');

class RedisProducer extends Producer {
  constructor() {
    super();
    this.client = new redis.RedisClient();
  }

  sendMessage(topic, message, callback) {
    this.client.xadd([topic, '*', 'event', message], (error, ack) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, ack)
      }
    });
  }
}

export default { RedisProducer };
