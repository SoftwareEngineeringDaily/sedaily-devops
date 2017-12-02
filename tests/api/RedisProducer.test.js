import sinon from 'sinon';
import { expect } from 'chai';

import { RedisProducer } from '../../api/RedisProducer';

describe('RedisProducer', () => {
  describe('# sendMessage', () => {
    it('Sends the correct message structure', () => {
      const xaddSpy = sinon.spy();
      const redisClientStub = {
        xadd: xaddSpy,
      };

      const producer = new RedisProducer(redisClientStub);
      producer.sendMessage('topic1', 'Hello', null);

      expect(xaddSpy.calledWithMatch(['topic1', '*', 'event', 'Hello'])).to.equal(true);
    });

    it('Invokes client callback on error and passes error content as first argument of callback function', () => {
      const redisClientStub = {
        xadd: (args, callback) => callback('Error publishing message', null),
      };

      const producer = new RedisProducer(redisClientStub);
      const callback = sinon.spy();
      producer.sendMessage('topic1', 'Hello', callback);

      expect(callback.calledWith('Error publishing message', null)).to.equal(true);
    });

    it('Invokes client callback on successful publish with eventId as first argument of callback function', () => {
      const eventId = '3474857496-0';
      const redisClientStub = {
        xadd: (args, callback) => callback(null, eventId)
      };

      const producer = new RedisProducer(redisClientStub);
      const callback = sinon.spy();
      producer.sendMessage('topic1', 'Hello', callback);

      expect(callback.calledWith(null, eventId)).to.equal(true);
    });
  });
});
