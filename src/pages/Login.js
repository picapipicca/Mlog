import React, { Fragment, useState } from "react";
import classes from "./Login.module.css";
import { Input, Button } from "../element/index";
import Modal from "../element/Modal";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/regEx";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showModal, setShowModal] = useState();

  const login = () => {
    if (email === "" || pwd.trim().length === 0) {
      setShowModal({
        title: "잘못입력하셨습니다",
        message: "이메일 혹은 비밀번호가 공란입니다! 입력해주세요 ",
      });
    }

    if (!emailCheck(email)) {
      setShowModal({
        title: "잘못입력하셨습니다",
        message: "이메일을 다시 확인해주세요!",
      });
    }
    dispatch(userActions.loginFirebase(email, pwd));
  };

  const { history } = props;

  const closeModalHandler = () => {
    setShowModal(null);
  };

  return (
    <Fragment>
      {showModal && (
        <Modal
          onCloseModal={closeModalHandler}
          title={showModal.title}
          message={showModal.message}
        />
      )}
      <div className={classes.wrap}>
        <div className={classes.box}>
          <Input
            width="30vw"
            label="EMAIL"
            value={email}
            placeholder="이메일을 입력해주세요"
            is_submit
            onEnterSubmit={login}
            _onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            width="30vw"
            label="PASSWORD"
            value={pwd}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            is_submit
            onEnterSubmit={login}
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
          <Button
            width="30vw"
            padding="15px"
            margin='auto'
            className={classes.button}
            _onClick={() => {
              console.log("로그인했어");
              login();
            }}
          >
            Enter
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
