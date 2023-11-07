const amqp = require('amqplib');

async function consumeMessages(){

    //connect to the rabbitMq server
    const connection = await amqp.connect('amqp://localhost');
    //create a channel on the connection
    const channel = await connection.createChannel();

    //create the exchange.
    await channel.assertExchange('logExchange',"direct");

    //create the queue
    const q = await channel.assertQueue("InfoQueue");

    //Bind the queue to the exhange
    await channel.bindQueue(q.queue, "logExchange","hii");

    //consume messages from the queue
    channel.consume(q.queue,(msg) => {
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg);
    });
}

consumeMessages();