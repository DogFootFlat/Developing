from typing import List
import requests
import json
import serial
import time
import pymysql
import keyboard
## url = 호출할 api의 url
## headers = 호출할때 사용할 헤더 정보
## params = 호출할때 사용할 파라미터 정보
## data = 호출할떄 사용할 데이터 정보

T = serial.Serial('COM6',9600)
strTemp = ""
floor1 = []
floor2 = []
new_floor1 = []
new_floor2 = []
stopScan = 'f3 9a dd 11'

def send_list():
    headers = {
    'Content-Type':'application/json;',
    'charset':'UTF-8',
    'Accept': '*/*'
    }
    HOST = "http://localhost:8080"
    PATH = "/board/list"
    URL = HOST+PATH

    try:
        res =  requests.post(url=URL, headers=headers, 
            data=json.dumps(payload))
        print("response text :"+res.text)

    except Exception as ex :
        print(ex)
        
while True:
    strTemp = T.readline().decode('utf-8')
    strTemp1 = T.readline().decode('utf-8')
    strTemp = strTemp.replace("\n","").encode('utf-8')

    strTemp = str(strTemp)
    floorTest = strTemp[14:15]
    print(floorTest)
    if floorTest == '!':
        floor1.append(strTemp[3:14])
    else:
        floor2.append(strTemp[3:14])
    print("1층 리스트", floor1)
    print("2층 리스트", floor2)

    if strTemp[3:14] == '73 77 bf 11':
        
        for v in floor1:
            if v not in new_floor1:
                new_floor1.append(v)


        for v in floor2:
            if v not in new_floor2:
                new_floor2.append(v)
        new_floor2.pop()


        payload = {
            "floor1": new_floor1, "floor2":new_floor2
        }
        print(payload)

        send_list()
        floor1.clear()
        floor2.clear()
        new_floor1.clear()
        new_floor2.clear()
        
    
    
    
   



            


