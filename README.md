# Luminetix-light-system
This project is about managing hardware devices like sensors, LED and fan and setting up contexts using Web App and Mobile App. It is similar to a simple Smart Home System.
As the system's name (Luminetix), it helps user control devices in the network, and have a glance at what is going on in the system, including the status of devices, 
statistics. Especially, this system allows users to set up contexts based on the valued measured by sensors, and automatically triggers LED or Fan and some activities
like send an email to users when the contexts happen. They can also make a schedule for context.
# Technology:
- Web App: ReactJS, Tailwind CSS, NodeJS, MongoDB, ExpressJS
- Mobile App: React Native, Tailwind CSS, NodeJS, MongoDB, ExpressJS
- Gateway: Python
- Both apps use MQTT to get real time data from server Adafruit, which collects data from gateway, without frequently call API to get data, which may cause Error 429 and
heavy network traffic.
# How to run this project:
- Clone this repo
- Run this in terminal: ```npm install``` in the parent folder, and in mobile and frontend folder to install node_modules.
- Paste 2 files .env in the parent folder and in frontend folder.

