---
description: 도서관 사용자 정보 api입니다.
---

# 🧋 User

## Read user list

{% swagger baseUrl="http://localhost:8080" method="get" path="/api/users" summary="read book list" %}
{% swagger-description %}
parameter X
{% endswagger-description %}

{% swagger-response status="200" description="Read success" %}
```javascript
[
    {
        "id": 1,
        "uid": "abcd",
        "pw": "1234",
        "name": "루빔",
        "donate": null,
        "borrow1": "클린코드",
        "borrow2": null,
        "borrow3": null
    },
    {
        "id": 2,
        "uid": "a9oe12v",
        "pw": "1234",
        "name": "류환",
        "donate": null,
        "borrow1": "하이큐",
        "borrow2": "귀멸의 칼날"
        "borrow3": null
    },
]
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Error" %}

{% endswagger-response %}
{% endswagger %}
