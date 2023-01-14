from typing import List
import requests
import json

## url = 호출할 api의 url
## headers = 호출할때 사용할 헤더 정보
## params = 호출할때 사용할 파라미터 정보
## data = 호출할떄 사용할 데이터 정보

uid_test = list = ["C5 F3 AF 75","AB W3 AF 24","HT F3 JU 75","HQ F3 KT H5","ZT F3 PC 75","K3 FA AF 75","73 77 bf 11"]
#2번째 값 다름
uid_error = list = ["C5 F3 AF 75","C5 I5 AF 75","HT F3 JU 75","HQ F3 KT H5","ZT F3 PC 75","K3 FA AF 75","73 77 bf 11"]
fPath = "/user"
ePath = "/members/check"
stopScan = "73 77 bf 11"
flist = 1

list = []
payload = {
    "id": list
}

def scan_uid() :
    for uid in uid_test:
        if(uid!="stopScan"):
            list.append(uid)

def send_list() :

    headers = {
        'Content-Type':'application/json;',
        'charset':'UTF-8',
        'Accept': '*/*'
    }

    HOST = "http://localhost:8080"
    PATH = fPath
    URL = HOST+PATH

    try:
        res =requests.post(url=URL, headers=headers,
                             data=json.dumps(payload))
        print("response text :"+res.text)

    except Exception as ex :
        print(ex)

scan_uid();
send_list();
