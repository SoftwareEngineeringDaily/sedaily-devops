import _ from 'lodash';
import { FieldType, escape } from 'influx';
import InfluxInterface from './InfluxInterface';
import paramValidation from '../../config/param-validation';

const fieldList = Object.keys(paramValidation.event.body);
fieldList.splice(fieldList.indexOf('eventData'), 1);

Object.keys(paramValidation).forEach((key) => {
  const inner = paramValidation[key]._inner;
  if (inner && inner.children) {
    inner.children.forEach((child) => {
      fieldList.push(child.key);
    });
  }
});

const fields = {};
Array.from(new Set(fieldList)).forEach((field) => {
  fields[field] = FieldType.STRING;
});

const databaseName = 'eventsDb';

export default class InfluxEventInterface extends InfluxInterface {
  constructor() {
    super(databaseName, [
      {
        measurement: 'events',
        fields,
        tags: []
      }
    ]);
  }

  write(topic, eventData, callback) {
    _.merge(eventData, eventData.eventData);
    delete eventData.eventData; // eslint-disable-line no-param-reassign
    this.influx.writeMeasurement('events', [
      {
        fields: { ...eventData }
      }
    ])
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(`Error saving data to InfluxDB! ${err.message}`);
      });
  }

  read(eventType) {
    return this.influx.query(`select * from events where eventType = ${escape.stringLit(eventType)}`);
  }
}
