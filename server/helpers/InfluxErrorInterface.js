import { FieldType, escape } from 'influx';
import InfluxInterface from './InfluxInterface';

const databaseName = 'errorsDb';

export default class InfluxErrorInterface extends InfluxInterface {
  constructor() {
    super(databaseName, [
      {
        measurement: 'errors',
        fields: {
          errorData: FieldType.STRING
        },
        tags: []
      }
    ]);
  }

  write(topic, errorData, callback) {
    this.influx.writeMeasurement('errors', [
      {
        fields: { errorData: JSON.stringify(errorData) }
      }
    ])
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(`Error saving data to InfluxDB! ${err}`);
      });
  }

  read(errorType) {
    return this.influx.query(`select * from errors where eventType = ${escape.stringLit(errorType)}`);
  }
}
