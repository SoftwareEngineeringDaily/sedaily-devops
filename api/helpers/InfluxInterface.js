import { InfluxDB, FieldType, escape } from 'influx';

class InfluxInterface {

  constructor() {
    
    this.influx = new InfluxDB({
      host: 'influxdb',
      database: 'events_db',
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
    })

    this.influx.getDatabaseNames()
      .then(names => {
        if (!names.includes('events_db')) {
          return this.influx.createDatabase('events_db');
        }
      })
  }

  write(topic, eventData, callback) {
    this.influx.writeMeasurement('events', [
    {
      tags: { eventType: topic},
      fields: { eventData: JSON.stringify(eventData) }
    }
    ])
    .then(result => {
      callback(null);
    })
    .catch(err => {
      callback(`Error saving data to InfluxDB! ${err}`);
    })
  }

  read(eventType) {
    return this.influx.query(`select * from events where eventType = ${escape.stringLit(eventType)}`);
  }
    
}

export default InfluxInterface;
