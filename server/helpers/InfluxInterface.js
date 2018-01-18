import { InfluxDB, FieldType, escape } from 'influx';
import config from '../../config/config';

const databaseName = 'eventsDb';

class InfluxInterface {
  constructor() {
    this.influx = new InfluxDB({
      host: config.influx.host,
      database: databaseName,
      schema: [
        {
          measurement: 'events',
          fields: {
            eventData: FieldType.STRING
          },
          tags: [
            'eventType'
          ]
        }
      ]
    });

    this.influx.getDatabaseNames()
      .then((names) => {
        if (!names.includes(databaseName)) {
          this.influx.createDatabase(databaseName);
        }
      });
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

export default InfluxInterface;
