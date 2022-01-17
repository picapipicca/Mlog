import React from "react";
import classes from "./Signup.module.css";
import { Input, Button } from "../element/index";

const Signup = (props) => {
  return (
    <div className={classes.wrap}>
      <Input label="아이디" placeholder="아이디를 입력해주세요" type="text" />
      <Input label="비밀번호" placeholder="비밀번호를 입력해주세요" />
      <Input  placeholder="비밀번호를 다시 입력해주세요"/>
      <Button>가입하기</Button>
    </div>
  );
};

export default Signup;