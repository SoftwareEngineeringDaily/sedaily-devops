[![logo](https://i.imgur.com/3OtP3p8.png)](https://softwareengineeringdaily.com/)

# SEDaily Logging, Monitoring, and Analytics

The real time event processing infrastructure gateway server for the Software Engineering Daily [Android](https://github.com/SoftwareEngineeringDaily/SEDaily-Android), [iOS](https://github.com/SoftwareEngineeringDaily/se-daily-iOS), and [web front end](https://github.com/SoftwareEngineeringDaily/sedaily-front-end). The SEDaily event stream is responsible for validating event payload schemas before putting the event into InfluxDB. The resulting database is queried using Grafana to get up to the second analytics reporting.

<div>
  <a href="https://travis-ci.org/SoftwareEngineeringDaily/sedaily-devops"><img src="https://travis-ci.org/SoftwareEngineeringDaily/sedaily-devops.svg?branch=develop"></img></a>
  <img src="https://wt-1364ed7c3f0364e6608ffd3c14d53518-0.run.webtask.io/coverage-badge" hspace="10"></img>
</div>

## Getting Started
```sh
$ git clone https://github.com/SoftwareEngineeringDaily/sedaily-devops.git
$ cd sedaily-devops
```

### Set up (local) 
  - Install and run a local [InfluxDB](https://github.com/influxdata/influxdb) client
  - `cp .env.local_example .env`
  - `npm install` or `yarn install`
  - `npm start` or `yarn start`
  - see package.json for other builds

### Set up (Docker)
  - `cp .env.docker_example .env`
  - Run `docker-compose up`
  - If dependencies are updated in package.json, run `docker-compose down` and then `docker-compose up --build`. This will remove the old container and rebuild the API image which installs the new dependencies.

## Contributing
We use the develop branch to perform work in. Fork the project and clone it, create a branch off of develop and perform your changes. Then  submit a pull request to merge your branch into the develop branch here. We have an active Slack community that you can reach out to for more information or just to chat with anyone. Check out the [<img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png" alt="Slack Channel" width="20px"/> SED app development](https://softwaredaily.slack.com/app_redirect?channel=sed_app_development) slack channel. Also see the [Open Source Guide](https://softwareengineeringdaily.github.io/).

## Examples
For clients wanting to post events to the API, there should be a base URL variable declared in the config already. Send a post command to the event stream API for the desired event. For the full list of possible events see the [parameter validation schema](https://github.com/SoftwareEngineeringDaily/sedaily-event-stream/blob/develop/config/param-validation.js).

```
/*
* Sending a login event to the event stream
*/
loginEvent: (username) => {
  return axios.post(`${EVENTS_API_BASE_URL}`, {
    clientId: username,
    deviceType: 'Browser',
    eventTime: new Date().getTime(),
    eventType: 'login',
    eventData: {}
  })
}
```

```
/*
* Sending a play episode event when the user presses the play button
*/
playEpisodeEvent: (username, playEvent) => {
  return axios.post(`${EVENTS_API_BASE_URL}`, {
    clientId: username,
    deviceType: 'Browser',
    eventTime: new Date().getTime(),
    eventType: 'playEpisode',
    eventData: {
      episodeName: playEvent.episodeName,
      minutesPlayed: playEvent.minutesPlayed,
      minutesRemaining: playEvent.minutesRemaining
    }
  })
}
```
