import { InfluxDB } from 'influx';
import config from '../../config/config';

class InfluxInterface {
  constructor(databaseName, schema) {
    this.influx = new InfluxDB({
      host: config.influx.host,
      database: databaseName,
      username: config.influx.username,
      password: config.influx.password,
      schema
    });

    this.influx.getDatabaseNames()
      .then((names) => {
        if (!names.includes(databaseName)) {
          this.influx.createDatabase(databaseName);
        }
      });
  }
}

export default InfluxInterface;
