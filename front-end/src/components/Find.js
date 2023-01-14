import React, { Component }  from 'react';

class Find extends Component {
  id = 0
  state = {
    information: [
      {}
    ]
  }
  render() {
    document.body.style.backgroundColor = 'white';
    return (
      <div className="Find">
        <table>
          <thead>
            <tr>
              <th>도서 아이디</th>
              <th>도서 번호</th>
              <th>도서 제목</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>컴퓨터공학개론</td>
              <td>게임기획의 모든 것</td>
              <td>유니티교과서</td>
            </tr>
            <tr>
              <td>파이썬의 모든 것</td>
              <td>모든 비행기 안내서는 피로 쓰였다</td>
              <td>디자인 패턴</td>
            </tr>
            <tr>
              <td>여행으로 알아보는 세계 식문화</td>
              <td>자료구조와 알고리즘 플러스</td>
              <td>알고리즘구조</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Find;
