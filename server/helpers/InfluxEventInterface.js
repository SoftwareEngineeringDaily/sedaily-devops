import { FieldType, escape } from 'influx';
import InfluxInterface from './InfluxInterface';

const databaseName = 'eventsDb';

export default class InfluxEventInterface extends InfluxInterface {
  constructor() {
    super(databaseName, [
      {
        measurement: 'events',
        fields: {
          eventData: FieldType.STRING
        },
        tags: [
          'eventType'
        ]
      }
    ]);
  }

  write(topic, eventData, callback) {
    this.influx.writeMeasurement('events', [
      {
        tags: { eventType: eventData.eventType },
        fields: { eventData: JSON.stringify(eventData) }
      }
    ])
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(`Error saving data to InfluxDB! ${err}`);
      });
  }

  read(eventType) {
    return this.influx.query(`select * from events where eventType = ${escape.stringLit(eventType)}`);
  }
}
