const mqtt = require("mqtt");

const connectMQTT = async (topics, credentials) => {
  try {
    const client = mqtt.connect("mqtt://io.adafruit.com", {
      username: credentials.username,
      password: credentials.password,
    });
    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      topics.forEach(async (topic) => {
        try {
          await client.subscribe(
            `${credentials.username}/${topic.topicName}`,
            (err) => {
              if (err) {
                console.error(
                  `Failed to subscribe to topic "${topic.topicName}": ${err}`
                );
              } else {
                console.log(`Subscribed to topic "${topic.topicName}"`);
              }
            }
          );
        } catch (err) {
          console.error(
            `Failed to subscribe to topic "${topic.topicName}": ${err}`
          );
        }
      });
    });

    client.on('error', (err) => {
        console.error('MQTT client error:', err);
      });
      
    client.on("message", async (topicReceived, message) => {
      const topic = topics.find(
        (t) => `${config.topicPrefix}/${t.topicName}` === topicReceived
      );
      if (!topic) {
        console.error(`Received message on unknown topic "${topicReceived}"`);
        return;
      }
      try {
        topic.messageHandler(message);
      } catch (err) {
        console.error(
          `Error handling message for topic "${topic.topicName}": ${err}`
        );
      }
    });

    return client;
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectMQTT;
