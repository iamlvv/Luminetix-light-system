import mqtt from 'mqtt';

const options = {
  username: process.env.REACT_APP_ADAFRUIT_USERNAME,
  password: process.env.REACT_APP_ADAFRUIT_KEY
};
const client = mqtt.connect('mqtt://io.adafruit.com', options);

client.on('connect', () => {
  console.log('Connected to Adafruit MQTT broker');
});

client.on('error', (err) => {
  console.error(`MQTT error: ${err}`);
});

client.subscribe('Tori0802/feeds/w-light', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-light');
  }
});
client.subscribe('Tori0802/feeds/w-temp', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-temp');
  }
});
client.subscribe('Tori0802/feeds/w-humi', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-hmi');
  }
});
client.subscribe('Tori0802/feeds/w-led', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-led');
  }
});
client.subscribe('Tori0802/feeds/w-fan', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-fan');
  }
});
client.subscribe('Tori0802/feeds/w-s-light', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-s-light');
  }
});
client.subscribe('Tori0802/feeds/w-s-temp', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-s-temp');
  }
});
client.subscribe('Tori0802/feeds/w-s-humi', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-s-hmi');
  }
});
client.subscribe('Tori0802/feeds/w-human', (err) => {
  if (err) {
    console.error(`Failed to subscribe to topic: ${err}`);
  } else {
    console.log('Subscribed to topic w-human');
  }
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

export default client;

