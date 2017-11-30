import sinon from 'sinon';
import { expect } from 'chai';

import { RedisProducer } from '../RedisProducer';

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

    it('Calls client error callback when there is an error publishing message', () => {
      const redisClientStub = {
        xadd: (args, errorCallback) => errorCallback('Error publishing message'),
      };

      const producer = new RedisProducer(redisClientStub);
      const errorCallback = sinon.spy();
      producer.sendMessage('topic1', 'Hello', errorCallback);

      expect(errorCallback.calledOnce).to.equal(true);
    });
  });
});
