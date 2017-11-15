import { KafkaConsumer } from './KafkaConsumer';
import { KafkaProducer } from './KafkaProducer';

const EventStreamConsumer = KafkaConsumer;
const EventStreamProducer = KafkaProducer;


export default { EventStreamConsumer, EventStreamProducer };
