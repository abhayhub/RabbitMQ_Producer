const amqp = require('amqplib');
const config = require('./config');
//step 1 : Connect to the rabbitmq server
// step 2 : Create a new channel on that connection.
// step 3 : Create the exchange
// step 4 : Publish the message to the exchange with a routing key

class Producer{
    channel;

    async createChannel () {
        //step 1 : Connect to the rabbitmq server
        const connection = await amqp.connect(config.rabbitMQ.url);
        // step 2 : Create a new channel on that connection.
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey , message) {
        if(!this.channel){
            await this.createChannel();
        }

        // step 3 : Create the exchange.
        const exchangename = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangename,"direct");

        const logDetails = {
            logType : routingKey,
            message : message,
            dataTime : new Date(),
        };

        await this.channel.publish(exchangename, routingKey , Buffer.from(JSON.stringify(logDetails)));
        console.log(`The message ${message} is sent to exchange ${exchangename}`);
    }
}

module.exports = Producer;