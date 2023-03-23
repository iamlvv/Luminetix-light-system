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
        appliedroom: {
            room1: true,
            room2: true,
            room3: false
        }
    },
    {
        id: 2,
        name: "Hallway on weekend",
        content: "Only 2 lights turn on",
        contextstate: false,
        tempstate: false,
        humidstate: false,
        tempstat: 34,
        humidstat: 50,
        detectstate: false,
        lighttimelimit: 1,
        day: "weekend",
        starttime: '00:00',
        endtime: '23:59',
        appliedroom: {
            room1: true,
            room2: false,
            room3: false
        }
    }
]

export default listofscenes