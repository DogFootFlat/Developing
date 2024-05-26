import React, {} from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to={'./sign-in'}><div>로그인</div></Link>
        <Link to={'./sign-up'}><div>회원가입</div></Link>
        <Link to={'./prod-list'}><div>상품목록</div></Link>
      </div>
    </div>
  );
}

export default Home;
