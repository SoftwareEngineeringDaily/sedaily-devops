import InluxIF from './helpers/InfluxInterface';
import EventStream from './EventStream';

let consumer;
let influxIf;

class InfluxConsumer {
  constructor() {
    consumer = new EventStream.EventStreamConsumer();
    influxIf = new InluxIF();
  }

  writeAllEvents(topic) {
    consumer.subscribe({topics: [topic]}, (error, event) => {
      influxIf.write(event[0].topic, event[0].eventData, function(error){
        if (error) {
          console.log(error)
        }
      })
    })
  }

  queryEventType(eventType) {
    influxIf.read(eventType).then(result => {
      console.log(result)
    })
  }
}


export default InfluxConsumer;