[![logo](https://i.imgur.com/3OtP3p8.png)](https://softwareengineeringdaily.com/)

# SEDaily Event Stream Processor

The real time event processing infrastructure gateway server for the Software Engineering Daily [Android](https://github.com/SoftwareEngineeringDaily/SEDaily-Android), [iOS](https://github.com/SoftwareEngineeringDaily/se-daily-iOS), and [web front end](https://github.com/SoftwareEngineeringDaily/sedaily-front-end). The SEDaily event stream is responsible for authenticating connecting clients and validating event payload schemas before putting the event on the SED event bus. Interested clients can subscribe to events on the stream.

<a href="https://travis-ci.org/andrewmarklloyd/sedaily-event-stream"><img src="https://travis-ci.org/andrewmarklloyd/sedaily-event-stream.svg?branch=develop"></img></a>

## Getting Started
```sh
$ git clone https://github.com/SoftwareEngineeringDaily/sedaily-event-stream.git
$ cd sedaily-event-stream
```

### Set up (local) 
<!-- Temporarily commented out until Redis Streams is in merged into the master branch  - Install and run a local [Redis](https://github.com/antirez/redis) client -->
  - Install and run a local [InfluxDB](https://github.com/influxdata/influxdb) client
  - `cp .env.local_example .env`
  - `npm install` or `yarn install`
  - `npm start` or `yarn start`
  - see package.json for other builds

### Set up (Docker)
  - `cp .env.docker_example .env`
  - Run `docker-compose up`
  - If dependencies are updated in package.json, run `docker-compose down` and then `docker-compose up --build`. This will remove the old container and rebuild the API image which installs the new dependencies.

## Current State

The current state of the SEDaily event stream is analytics focused. The event stream backend relies on Redis Streams, which is only currently available in the [`unstable`](https://github.com/antirez/redis/tree/unstable) branch. Until it is stable, the SEDaily event stream will only directly input events into InfluxDB. Data analytics can be run against queries on the InfluxDB events database.

## Contributing
We use the develop branch to perform work in. Fork the project and clone it, create a branch off of develop and perform your changes. Then  submit a pull request to merge your branch into the develop branch here. We have an active Slack community that you can reach out to for more information or just to chat with anyone. Check out the [<img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png" alt="Slack Channel" width="20px"/> SED app development](https://softwaredaily.slack.com/app_redirect?channel=sed_app_development) slack channel. Also see the [Open Source Guide](https://softwareengineeringdaily.github.io/).

## Example Events

We're currently building better client documentation
