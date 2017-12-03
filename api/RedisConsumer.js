import redis from 'redis';


import { Consumer } from './Consumer';

redis.add_command('xrange');
redis.add_command('xread');


const parseResponse = response => ({
  topic: response[0][0],
  eventId: response[0][1][0][0],
  eventData: response[0][1][0][1][1]
});


class RedisConsumer extends Consumer {
  constructor(client) {
    super();
    this.client = client || new redis.RedisClient();
  }


  subscribe(args, callback) {
    const xreadParams = ['BLOCK', 0, 'STREAMS', ...args.topics, ...args.topicOffsets];

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
        callback(null, response);
      }
    });
  }
}


export default { RedisConsumer };
