import redis from 'redis';
import config from '../config/config';
import { Producer } from './Producer';

redis.add_command('xadd');

class RedisProducer extends Producer {
  constructor(client) {
    super();
    this.client = client || new redis.RedisClient({
      host: config.redis.host,
      port: config.redis.port
    });
  }

  sendMessage(topic, message, callback) {
    this.client.xadd([topic, '*', 'event', message], (error, eventId) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, eventId);
      }
    });
  }

  disconnect(){
    this.client.quit();
  }
}

export default { RedisProducer };
