import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Modal from "../basic/Modal";
import logincss from "./css/login.module.css";

const Login = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <Modal onClose={props.onClose}>
      <div className={logincss.input}>
        아이디
        비밀번호
      </div>
      <div className={logincss.actions}>
        <button className={logincss["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default Login