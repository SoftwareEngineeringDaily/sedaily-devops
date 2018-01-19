[![logo](https://i.imgur.com/3OtP3p8.png)](https://softwareengineeringdaily.com/)

# SEDaily Event Stream Processor

The real time event processing infrastructure gateway server for the Software Engineering Daily [Android](https://github.com/SoftwareEngineeringDaily/SEDaily-Android), [iOS](https://github.com/SoftwareEngineeringDaily/se-daily-iOS), and [web front end](https://github.com/SoftwareEngineeringDaily/sedaily-front-end). The SEDaily event stream is responsible for authenticating connecting clients and validating event payload schemas before putting the event on the SED event bus. Interested clients can subscribe to events on the stream.

## Set up (local) 
<!-- Temporarily commented out until Redis Streams is in merged into the master branch  - Install and run a local [Redis](https://github.com/antirez/redis) client -->
  - Install and run a local [InfluxDB](https://github.com/influxdata/influxdb) client
  - `cp .env.local_example .env`
  - `npm install` or `yarn install`
  - `npm start` or `yarn start`
  - check package.json for other builds

## Set up (Docker)
  - `cp .env.docker_example .env`
  - Run `docker-compose up`
  - If dependencies are updated in package.json, run `docker-compose down` and then `docker-compose up --build`. This will remove the old container and rebuild the API image which installs the new dependencies.

## Current State

The current state of the SEDaily event stream is analytics focused. The event stream backend relies on Redis Streams, which is only currently available in the [`unstable`](https://github.com/antirez/redis/tree/unstable) branch. Until it is stable, the SEDaily event stream will only directly input events into InfluxDB. Data analytics can be run against queries on the InfluxDB events database.

## Example Events

Here is a list of example events that can be sent to the event stream. See the [validation schema](https://github.com/SoftwareEngineeringDaily/sedaily-event-stream/blob/master/config/param-validation.js) for a full list of available events.

```
[
  {
    "clientId": "941C523D1576",
    "deviceType": "Browser",
    "location": "Paris",
    "eventTime": 1516334544024,
    "eventType": "login",
    "eventData": {
      "userId": "CE2EEC6DA9A4"
    }
  },
  {
    "clientId": "941C523D1576",
    "deviceType": "Browser",
    "location": "Paris",
    "eventTime": 1516334544024,
    "eventType": "logout",
    "eventData": {
      "userId": "272FF39B2DE3"
    }
  },
  {
    "clientId": "941C523D1576",
    "deviceType": "Browser",
    "location": "Paris",
    "eventTime": 1516334544024,
    "eventType": "likeEpisode",
    "eventData": {
      "episodeName": "Hacker Noon with David Smooke",
      "minutesPlayed": 55,
      "minutesRemaining": 21
    }
  },
  {
    "clientId": "941C523D1576",
    "deviceType": "Browser",
    "location": "Paris",
    "eventTime": 1516334544024,
    "eventType": "playEpisode",
    "eventData": {
      "episodeName": "Hacker Noon with David Smooke",
      "minutesPlayed": 5,
      "minutesRemaining": 24
    }
  },
  {
    "clientId": "941C523D1576",
    "deviceType": "Browser",
    "location": "Paris",
    "eventTime": 1516334544024,
    "eventType": "completedEpisode",
    "eventData": {
      "episodeName": "React Components with Max Stoiber"
    }
  }
]
```

