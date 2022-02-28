import React, { Fragment, useState, useCallback } from "react";
import classes from "./Signup.module.css";
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

  //오류메세지 상태저장
  const [nickMsg, setNickMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdConfirmMsg, setPwdConfirmMsg] = useState("");

  // 유효성 검사
  const [isNick, setIsNick] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isPwdConfirm, setIsPwdConfirm] = useState(false);

  const userEmailHandler = useCallback((e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    if (emailRegex.test(emailCurrent)) {
      setEmailMsg("올바른 이메일 형식이에요 ;) ");
      setIsEmail(true);
    } else {
      setEmailMsg("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅠ.ㅠ");
      setIsEmail(false);
    }
  }, []);

  const userPwdHandler = useCallback((e) => {
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const pwdCurrent = e.target.value;
    setPwd(pwdCurrent);
    if (!pwdRegex.test(pwdCurrent)) {
      setPwdMsg("숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPwd(false);
    } else {
      setPwdMsg("안전한 비밀번호입니다 :)");
      setIsPwd(true);
    }
  }, []);

  const userPwdConfirmHandler = useCallback(
    (e) => {
      const pwdConfirmCurrnet = e.target.value;
      setPwdConfirm(pwdConfirmCurrnet);

      if (pwd === pwdConfirmCurrnet) {
        setPwdConfirmMsg("비밀번호가 일치합니다!");
        setIsPwdConfirm(true);
      } else {
        setPwdConfirmMsg("비밀번호가 틀려요. 다시 확인해 주세요");
        setIsPwdConfirm(false);
      }
    },
    [pwd]
  );

  const userNickHandler = useCallback((e) => {
    setUserNick(e.target.value);
    if (e.target.value.trim().length < 2 || e.target.value.trim().length > 10) {
      setNickMsg("2글자 이상 9글자 미만으로 입력해주세요");
      setIsNick(false);
    } else {
      setNickMsg("올바른 닉네임 형식입니다");
      setIsNick(true);
    }
  }, []);

  return (
    <Fragment>
      <div className={classes.wrap}>
        <div className={classes.formbox}>
          <Input
          value={email}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="text"
            _onChange={userEmailHandler}
          />
          {email.length > 0 && (
            <span
              className={`${classes.message} ${
                isEmail ? classes.success : classes.error
              }`}
            >
              {emailMsg}
            </span>
          )}
        </div>

        <div>
          <Input
          value={user_nick}
            label="닉네임"
            placeholder="활동은 닉네임으로 하게됩니다"
            type="text"
            maxlength="9"
            _onChange={userNickHandler}
          />
          {user_nick.length > 0 && (
            <span
              className={`${classes.message} ${
                isNick ? classes.success : classes.error
              }`}
            >
              {nickMsg}
            </span>
          )}
        </div>
        <div>
          <Input
          value={pwd}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={userPwdHandler}
            type="password"
          />
          {pwd.length > 0 && (
            <span
              className={`${classes.message} ${
                isPwd ? classes.success : classes.error
              }`}
            >
              {pwdMsg}
            </span>
          )}
        </div>
        <div>
          <Input
          value={pwd_confirm}
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            _onChange={userPwdConfirmHandler}
          />
          {pwd_confirm.length > 0 && (
            <span
              className={`${classes.message} ${
                isPwdConfirm ? classes.success : classes.error
              }`}
            >
              {pwdConfirmMsg}
            </span>
          )}
        </div>

        <Button
          text="가입하기"
          _disabled={!(isNick && isEmail && isPwd && isPwdConfirm)}
          _onClick={() => {
            dispatch(signupActions.signupFirebase(email, pwd, user_nick));
          }}
        ></Button>
      </div>
    </Fragment>
  );
};

export default Signup;
