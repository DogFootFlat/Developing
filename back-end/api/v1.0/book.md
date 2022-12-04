---
description: DB에 저장된 책 정보 api입니다.
---

# 📔 Book

## Read book list

{% swagger baseUrl="http://localhost:8080" method="get" path="/api/books" summary="read book list" %}
{% swagger-description %}
parameter X
{% endswagger-description %}

{% swagger-response status="200" description="Read success" %}
```javascript
[
    {
        "id": 33,
        "uid": "2a",
        "smartUid": null,
        "name": "클린코드",
        "bookNum": 100,
        "borrower": "X",
        "bookCmp": 0,
        "bookFloor": 2,
        "donor": "X",
        "category": null,
        "writer": null,
        "count": null,
        "img": null
    },
    {
        "id": 34,
        "uid": "2b",
        "smartUid": null,
        "name": "유니티교과서",
        "bookNum": 200,
        "borrower": "서빈",
        "bookCmp": 0,
        "bookFloor": 2,
        "donor": "X",
        "category": null,
        "writer": null,
        "count": null,
        "img": null
    }
]
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Error" %}

{% endswagger-response %}
{% endswagger %}
