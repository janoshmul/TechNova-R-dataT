import network
import urequests
import time

ssid = 'your_SSID'
password = 'your_PASSWORD'

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)

# Wait for connection
while not wlan.isconnected():
    pass

print('network config:', wlan.ifconfig())

# Function to send data
def send_data():
    url = "localhost:3000/data"
    data = {"sensor": "temperature", "value": 23.4}
    response = urequests.post(url, json=data)
    print(response.text)

while True:
    send_data()
    time.sleep(10)