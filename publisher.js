const amqp = require("amqplib")
const msg = {
    number : process.argv[2]
}
const connect = async() => {
    try {
        const connection = await amqp.connect("amqp://ec2-100-24-116-16.compute-1.amazonaws.com:5672") //extablish connection with docker rabbitmq
        const channel = await connection.createChannel(); //create a channel
        const result = await channel.assertQueue("jobs") //publish a queue
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`job sent successfully ${msg.number}`)


        
    } catch (error) {
        console.error(error)
    }
}
connect()
