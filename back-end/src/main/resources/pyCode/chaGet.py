import requests
import json
import serial
import time
import pymysql
        
T = serial.Serial('COM6',9600)
strTemp = ""
url = "http://localhost:8080/board/list/"

while True:
    strTemp = T.readline().decode('utf-8')
    strTemp = strTemp.replace("\n","").encode('utf-8')
   
    strTemp = str(strTemp)
    strTemp = strTemp[3:14]
    print(strTemp)

    #uid값을 get방식으로 보냄 
    response = requests.get(url+strTemp)
    
    booknum = response.json()
    n = booknum.get('book')
    n = n.encode('utf-8')
    print(str(n)[2:13])
    T.write(n)
    time.sleep(7)
    print("준비 완료, 다음 UID 찍기")
T.close()


