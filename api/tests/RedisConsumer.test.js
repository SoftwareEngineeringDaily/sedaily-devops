import sinon from 'sinon';
import { expect } from 'chai';
import { RedisConsumer } from '../RedisConsumer';


describe('RedisConsumer', () => {
  const subscriptionArgs = {
    topics: ['sedaily-event-stream1', 'sedaily-event-stream2'],
    topicOffsets: ['$', '$'],
    readOnce: true,
  };


  const getRedisClientStub = (testFor, testMethod) => {
    const errorMessage = (testFor === 'errorCallback') ? 'Error retrieving data' : null;
    const responseData = (testFor === 'callback') ? [['sedaily-event-stream1', [[['123244'], [[], ['data']]]]]] : null;

    return {
      [testMethod]: (params, callback) => {
        callback(errorMessage, responseData);
      }
    };
  };

  describe('# subscribe', () => {
    it('Invokes client callback on new message', () => {
      const consumer = new RedisConsumer(getRedisClientStub('callback', 'xread'));
      const callback = sinon.spy();

      consumer.subscribe(
        subscriptionArgs,
        callback
      );

      expect(callback.calledOnce).to.equal(true);
    });

    it('Invokes client error callback on error', () => {
      const consumer = new RedisConsumer(getRedisClientStub('errorCallback', 'xread'));
      const callback = sinon.spy();

      consumer.subscribe(
        subscriptionArgs,
        callback
      );

      expect(callback.calledOnce).to.equal(true);
    });
  });

  describe('# getSlice', () => {
    it('Invokes client callback on retrieving slice', () => {
      const consumer = new RedisConsumer(getRedisClientStub('callback', 'xrange'));
      const callback = sinon.spy();

      consumer.getSlice(
        subscriptionArgs,
        callback
      );

      expect(callback.calledOnce).to.equal(true);
    });

    it('Invokes client error callback on error retrieving slice', () => {
      const consumer = new RedisConsumer(getRedisClientStub('errorCallback', 'xrange'));
      const callback = sinon.spy();

      consumer.getSlice(
        subscriptionArgs,
        callback
      );

      expect(callback.calledOnce).to.equal(true);
    });
  });
});

