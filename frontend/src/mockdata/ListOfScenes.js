const listofscenes = [
    {
        id: 1,
        name: "Bathrooms after 10pm",
        content: "Alerts if detect people in the area over 1 hours",
        contextstate: true,
        tempstate: false,
        humidstate: true,
        tempstat: 34,
        humidstat: 50,
        detectstate: true,
        lighttimelimit: 1,
        day: "everyday",
        starttime: '00:00',
        endtime: '23:59',
        lightstate: true,
        lightcolor: 'yellow',
        fanstate: false,
        fanlevel: 5
    },
    {
        id: 2,
        name: "Hallway on weekend",
        content: "Only 2 lights turn on",
        contextstate: false,
        tempstate: true,
        humidstate: false,
        tempstat: 23,
        humidstat: 70,
        detectstate: true,
        lighttimelimit: 1,
        day: "weekend",
        starttime: '00:00',
        endtime: '23:59',
        lightstate: false,
        lightcolor: 'yellow',
        fanstate: true,
        fanlevel: 5
    }
]

export default listofscenes