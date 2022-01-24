import React, { Fragment, useState } from "react";
import classes from "./Signup.module.css";
import Modal from "../element/Modal";
import { Input, Button } from "../element/index";
import { useDispatch } from "react-redux";
import { actionCreators as signupActions } from "../redux/modules/user";

const Signup = (props) => {
  const dispatch = useDispatch();
  //이메일,비밀번호,닉네임 확인
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_confirm, setPwdConfirm] = useState("");
  const [user_nick, setUserNick] = useState("");
  //모달창
  const [showModal, setShowModal] = useState();

  //오류메세지 상태저장
  const [nickMessage, setNickMessage] = useState ("");
  const [emailMessage, setEmailMessage] = useState ("");
  const [passwordMessage, setPasswordMessage] = useState ("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState ("");

  // // 유효성 검사
  // const [isName, setIsName] = useState(false);
  // const [isEmail, setIsEmail] = useState(false);
  // const [isPassword, setIsPassword] = useState(false);
  // const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const userEmailHandler = (e) => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅠ.ㅠ')
      // setIsEmail(false);
    }else {
      setEmailMessage('올바른 이메일 형식이에요 ;) ')
      // setIsEmail(true);
    }
  };
  const userPwdHandler = (e) => {
    setPwd(e.target.value);
  };
  const userPwdConfirmHandler = (e) => {
    setPwdConfirm(e.target.value);
  };
  const userNickHandler = (e) => {
    setUserNick(e.target.value);
  };

  const signup = () => {
    if (
      email.trim().length === 0 ||
      pwd.trim().length === 0 ||
      pwd.trim().length === 0
    ) {
      setShowModal({
        title: "입력되지 않은곳이 있습니다",
        message: "이메일, 비밀번호, 비밀번호 재입력칸을 확인해주세요!",
      });
    }

    if (pwd !== pwd_confirm) {
      setShowModal({
        title: "비밀번호 입력오류",
        message: "비밀번호와 비밀번호 재입력값이 다릅니다!",
      });
    }

    dispatch(signupActions.signupFirebase(email, pwd, user_nick));
  };
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
        <Input
          label="이메일"
          placeholder="이메일을 입력해주세요"
          type="text"
          _onChange={userEmailHandler}
        />
        <Input
          label="닉네임"
          placeholder="활동은 닉네임으로 하게됩니다"
          type="text"
          _onChange={userNickHandler}
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          _onChange={userPwdHandler}
        />
        <Input
          placeholder="비밀번호를 다시 입력해주세요"
          _onChange={userPwdConfirmHandler}
        />
        <Button text="가입하기" _onClick={signup}></Button>
      </div>
    </Fragment>
  );
};

export default Signup;
