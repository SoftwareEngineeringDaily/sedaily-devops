#!/usr/bin/env node

import commander from 'commander';
import chalk from 'chalk';
import { EventStreamConsumer, EventStreamProducer } from '../api/EventStream';


commander
  .command('publish')
  .option('-t, --topic <required>', 'Topic to publish the event on')
  .option('-m, --message <required>', 'Message to publish')
  .action((options) => {
    const producer = new EventStreamProducer();
    producer.sendMessage(
      options.topic,
      JSON.stringify({ message: options.message }),
      (error, resposne) => {
        if (error) {
          console.log(chalk.redBright(`Error publishing event. Server response: ${error}`));
        } else {
          console.log(chalk.greenBright(`Successfully published event. Event ID is: ${resposne}`));
        }
        producer.disconnect();
      }

    );
  });


commander
  .command('listen')
  .option('-t, --topic <required>', 'Topic to listen on for events')
  .action((options) => {
    const consumer = new EventStreamConsumer();
    consumer.subscribe(
      { topics: [options.topic] },
      (error, response) => {
        if (error) {
          console.log(chalk.redBright(`Error listening to events. Server returned ${error}`));
        } else {
          console.log(response);
        }
      }
    );
  });


commander.parse(process.argv);

