import httpStatus from 'http-status';

import kafka from 'kafka-node';

const Consumer = kafka.Consumer;
const client = new kafka.Client();
const consumer = new Consumer(
    client,
    [
        { topic: 'login', partition: 0 },
        { topic: 'logout', partition: 0 },
        { topic: 'play_episode', partition: 0 },
        { topic: 'pause_episode', partition: 0 },
        { topic: 'like_episode', partition: 0 },
        { topic: 'completed_episode', partition: 0 }
    ],
    {autoCommit: false}
    );

function listenForMessages() {
    consumer.on('message', function (message) {
        console.log(message, '\n');
    })
}

consumer.on('error', function (error) {
    console.log("Consumer error:", error, '\n');
})


export default { listenForMessages };