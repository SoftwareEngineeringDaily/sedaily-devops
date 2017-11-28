import { RedisProducer } from './RedisProducer';
import { RedisConsumer } from './RedisConsumer';

const EventStreamConsumer = RedisConsumer;
const EventStreamProducer = RedisProducer;


export default { EventStreamConsumer, EventStreamProducer };
