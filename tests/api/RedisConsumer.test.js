import sinon from 'sinon';
import { expect } from 'chai';
import { RedisConsumer } from '../../api/RedisConsumer';


describe('RedisConsumer', () => {
  const subscriptionArgs = {
    topics: ['sedaily-event-stream1', 'sedaily-event-stream2'],
    topicOffsets: ['$', '$'],
    readOnce: true,
  };


  const getRedisClientStub = (testFor, testMethod) => {
    const errorMessage = (testFor === 'error') ? 'Error retrieving data' : null;
    const responseData = (testFor === 'validResponse') ? [['sedaily-event-stream1', [[['123244'], [[], ['data']]]]]] : null;

    return {
      [testMethod]: (params, callback) => {
        callback(errorMessage, responseData);
      }
    };
  };

  describe('# subscribe', () => {
    it('Invokes client callback on new message and passes message content to second arg of callback function', () => {
      const consumer = new RedisConsumer(getRedisClientStub('validResponse', 'xread'));
      const callback = sinon.spy();

      consumer.subscribe(
        subscriptionArgs,
        callback
      );

      expect(callback.calledWith(
        null,
        {
          topic: 'sedaily-event-stream1',
          eventId: ['123244'],
          eventData: ['data'],
        }
      )).to.equal(true);
    });

    it('Invokes client callback on error and passes error content as first argument of callback function', () => {
      const consumer = new RedisConsumer(getRedisClientStub('error', 'xread'));
      const callback = sinon.spy();

      consumer.subscribe(
        subscriptionArgs,
        callback
      );

      expect(callback.calledWith('Error retrieving data', null)).to.equal(true);
    });
  });

  describe('# getSlice', () => {
    it('Invokes client callback on retrieving slice and passes slice content to second arg of callback function', () => {
      const consumer = new RedisConsumer(getRedisClientStub('validResponse', 'xrange'));
      const callback = sinon.spy();

      consumer.getSlice(
        subscriptionArgs,
        callback
      );

      expect(callback.calledWith(
        null,
        {
          topic: 'sedaily-event-stream1',
          eventId: ['123244'],
          eventData: ['data'],
        }
      )).to.equal(true);
    });

    it('Invokes client callback on error and passes error content as first argument of callback function', () => {
      const consumer = new RedisConsumer(getRedisClientStub('error', 'xrange'));
      const callback = sinon.spy();

      consumer.getSlice(
        subscriptionArgs,
        callback
      );

      expect(callback.calledWith('Error retrieving data', null)).to.equal(true);
    });
  });
});

