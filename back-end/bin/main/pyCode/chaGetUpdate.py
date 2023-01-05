import requests
import json
#import serial
#import time


#T = serial.Serial('COM6',9600)
strTemp = "AB W3 AF 24"
url = "http://localhost:8080/userUid/"

def checkBookNum(n):
    ur="http://localhost:8080/bookNum/"
    response = requests.get(url+n)

#while True:
#strTemp = T.readline().decode('utf-8')
#strTemp = strTemp.replace("\n","").encode('utf-8')

#strTemp = str(strTemp)
#strTemp = strTemp[3:14]
#print(strTemp)

#uid값을 get방식으로 보냄
response = requests.get(url+strTemp)

booknum = response.json()
n = booknum.get('book')
#n = n.encode('utf8')
print(str(n))
checkBookNum(str(n))
#T.write(n)
#time.sleep(7)
print("준비 완료, 다음 UID 찍기")
#T.close()
