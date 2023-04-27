# import thu vien ket noi noi tiep pyserial
import serial.tools.list_ports
# import thu vien random gia tri
import random
# import thu vien thoi gian (tao hieu ung doi)
import time
# import thu vien Adafruit_IO
import sys
from Adafruit_IO import MQTTClient

# Dien cac thong tin de ket noi voi server
AIO_FEED_IDS = ["w-led", "w-fan", "w-s-temp", "w-s-humi", "w-s-light", "w-alert"]
AIO_USERNAME = "Tori0802"
AIO_KEY = "aio_bJma94VSPvF5VMRiDSnSVtSTwNZw"

# Publish-subcribed
def  connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)
    if isMicrobitConnected:
        ser.write((str(payload)).encode())

# Tao mot doi tuong MQTT ten la client
client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

# Ham de tu dong tim ra cong COM ao co ten la "USB Serial CH340"
def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB-SERIAL CH340" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

# Goi ham va xac nhan da ket noi voi Yolobit
isMicrobitConnected = False
if getPort() != "None":
    ser = serial.Serial( port=getPort(), baudrate=115200)
    isMicrobitConnected = True

# Ham phan tach du lieu
def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[0] == "1":
            if splitData[1] == "TEMP":
                client.publish("w-temp", splitData[2])
            elif splitData[1] == "HUMI":
                client.publish("w-humi", splitData[2])
            elif splitData[1] == "LIGHT":
                client.publish("w-light", splitData[2])
            elif splitData[1] == "FAN":
                client.publish("w-fan", splitData[2])
            elif splitData[1] == "HUMAN":
                client.publish("w-human", splitData[2])
            elif splitData[1] == "ALERT":
                client.publish("w-alert", splitData[2])
            elif splitData[1] == "LED":
                splitData[2] = '#' + splitData[2]
                client.publish("w-led", splitData[2])
    except:
        pass

mess = ""
# Ham doc du lieu Serial
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

# Vong lap vo tan
while True:
    if isMicrobitConnected:
        readSerial()

    time.sleep(1)