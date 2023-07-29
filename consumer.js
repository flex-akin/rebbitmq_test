const amqp = require("amqplib")

const connect = async() => {
    try {
        const connection = await amqp.connect("amqp://ec2-100-24-116-16.compute-1.amazonaws.com:5672") //extablish connection with docker rabbitmq
        const channel = await connection.createChannel(); //create a channel
        const result = await channel.assertQueue("jobs") //publish a queue
        
        console.log('waiting for messages')
        channel.consume("jobs", message => {
            // console.log(message, "message")
            console.log(message.content.toString())
            const input = JSON.parse(message.content.toString())

            if (input.number == 12){
                console.log(message)
                // channel.ack(message)
            }
        })

       


        
    } catch (error) {
        console.error(error)
    }
}
connect()

