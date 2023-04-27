# Luminetix-light-system
This project is about managing hardware devices like sensors, LED and fan and setting up contexts using Web App and Mobile App. It is similar to a simple Smart Home System.
As the system's name (Luminetix), it helps user control devices manually in the network, and have a glance at what is going on in the system, including the status of devices, 
statistics. Especially, this system allows users to set up contexts based on the valued measured by sensors, and automatically triggers LED or Fan and some activities
like sending an email to users when the contexts happen, and create notifications when any devices are turned on or off, and when contexts are triggered. They can also make a schedule for context.
# Team size: 4
- Le Van Vy
- Huynh Ngoc Nhu
- Nguyen Tri Hieu
- Nguyen Ngoc Tri
# Technology:
- Web App: ReactJS, Tailwind CSS, NodeJS, MongoDB, ExpressJS
- Mobile App: React Native, Tailwind CSS, NodeJS, MongoDB, ExpressJS
- Gateway: Python
- Both apps use MQTT to get real time data from server Adafruit, which collects data from gateway, without frequently call API to get data, which may cause Error 429 and
heavy network traffic.
# How to run this project:
- Clone this repo
- Run this in terminal: ```npm install``` in the parent folder, and in mobile and frontend folder to install all dependencies.
- Paste 3 files .env given by team to parent, frontend and mobile folder.
- Install, config MQTT in frontend and mobile folder:
  - run ```npm i mqtt```
  - go to ```node_modules/mqtt``` and create a file named ```webpack.config.js``` with content below:
  ```
  const webpack = require('webpack')
  module.exports = {
    entry: "./lib/connect/index.js",
    //mode: "development",
    output: {
        library:  {
            type: "commonjs2"
        },
        filename: "mqtt.browser.js"
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
            Buffer: [ 'buffer', 'Buffer' ],
        }),
    ],
    resolve: {
        fallback: {
            assert: require.resolve('assert'),
            buffer: require.resolve('buffer'),
            console: require.resolve('console-browserify'),
            constants: require.resolve('constants-browserify'),
            crypto: require.resolve('crypto-browserify'),
            domain: require.resolve('domain-browser'),
            events: require.resolve('events'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            punycode: require.resolve('punycode'),
            process: require.resolve('process/browser'),
            querystring: require.resolve('querystring-es3'),
            stream: require.resolve('stream-browserify'),
            string_decoder: require.resolve('string_decoder'),
            sys: require.resolve('util'),
            timers: require.resolve('timers-browserify'),
            tty: require.resolve('tty-browserify'),
            url: require.resolve('url'),
            util: require.resolve('util'),
            vm: require.resolve('vm-browserify'),
            zlib: require.resolve('browserify-zlib'),
        }
    }
  }
  ```
  - Inside of ```node_modules/mqtt/package.json```:
  1. add ```"type": "common.js"```
  2. in ```"browser"```, change from ```"./mqtt.js": "./lib/connect/index.js"``` to ```"./mqtt.js": "./dist/mqtt.browser.js"``` like this below:
  ```
  {
  ...
  "type": "commonjs",
  "browser": {
    "./mqtt.js": "./dist/mqtt.browser.js"
    ...
  }
  ...
  }
  ```
  3. Inside of ```node_modules/mqtt``` execute respectively (ignore any errors happen):
  ```
  npm i 
  npm i buffer process
  npm i webpack webpack-cli
  npx webpack
  ```
  4. Clean folder ```.cache``` in folder ```node_modules``` of ```frontend``` and ```mobile``` folder (not ```node_modules``` in folder ```node_modules/mqtt```. Suggest using Windows Explorer and click ```View hidden folders``` to find and delete. If there is not any folder like this, can skip this step.
- Move out to the folder ```frontend``` or ```mobile```, build app:
  - With Web App: run ```npm start```. Done!
  - With Mobile App: First, you have to install Node, JDK and Android Studio. For this setup, you can refer to this link (sponsored by ReactNative): https://reactnative.dev/docs/environment-setup?guide=native. Read carefully and follow all stages, except for ```Running your React Native application``` stage. Secondly, run ```npx expo start``` in terminal from directory ```/mobile```, then type ```a``` to open Android Emulator you have installed recently. It may require you to install app Expo Go on that device, just do it. After that, you can build your app on Expo Go "on" Android Emulator. Last but not least, you notice that right below the QR code from Expo in terminal when you execute ```npx expo start```, there is an URL, which contains an IP Address. Copy that ipaddress and paste it in .env, assign it to ```IPADDRESS``` variable. You can restart the app to run it successfully.

  
