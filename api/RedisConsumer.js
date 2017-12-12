import redis from 'redis';
import Joi from 'joi';
import config from '../config/config';
import { Consumer } from './Consumer';

redis.add_command('xrange');
redis.add_command('xread');


const parseResponse = response => response.map(event => ({
  topic: event[0],
  eventId: event[1][0][0],
  eventData: event[1][0][1][1]
}));

const parseSliceResponse = response => response.map(event => ({
  eventId: event[0],
  eventData: event[1][1]
}));

const subscribeArgsSchema = Joi.object().keys({
  topics: Joi.array().items(Joi.string()),
  topicOffsets: Joi.array().length(Joi.ref('topics.length')).items(Joi.string()).optional(),
  readOnce: Joi.boolean().optional()

});

class RedisConsumer extends Consumer {
  constructor(client) {
    super();
    this.client = client || new redis.RedisClient({
      host: config.redis.host,
      port: config.redis.port
    });
  }


  subscribe(args, callback) {
    const result = Joi.validate(args, subscribeArgsSchema);
    if (result.error) {
      throw result.error;
    }
    const topicOffsets = args.topicOffsets || args.topics.map(_ => '$');
    const xreadParams = ['BLOCK', 0, 'STREAMS', ...args.topics, ...topicOffsets];

    const onMessage = (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, parseResponse(response));
      }
      if (!args.readOnce) {
        this.client.xread(xreadParams, onMessage);
      }
    };

    this.client.xread(xreadParams, onMessage);
  }

  getSlice(args, callback) {
    const startId = (args.startId) ? args.startId : '-';
    const stopId = (args.stopId) ? args.stopId : '+';
    const argsList = [args.topic, startId, stopId];
    const count = args.count ? args.count : 0;

    if (count) {
      argsList.push('COUNT');
      argsList.push(count);
    }

    this.client.xrange(argsList, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, parseSliceResponse(response));
      }
    });
  }

  disconect() {
    this.client.quit();
  }
}


export default { RedisConsumer };
