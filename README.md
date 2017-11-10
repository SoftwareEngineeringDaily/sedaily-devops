
# Kafka Event Stream

Small proof of concept for using Kafka event streams

## Set up (local)
  - `npm install`
  - `cd kafka-docker/; docker-compose up -d`
  - The docker-compose.yml file is configured to create several topics at container creation time

## Usage
  - Running `npm start` will log the all of the topics created, start the consumer, and send a few test messages via the producer, which are logged to the console
