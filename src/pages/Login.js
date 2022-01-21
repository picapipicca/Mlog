import React from 'react';
import classes from "./Login.module.css";
import { Input,Button } from "../element/index";


const Login = (props) => {
    
    const {history} = props;

    return (
        <div className={classes.wrap}>
            <Input label='아이디' placeholder='아이디를 입력해주세요' type='text'/>
            <Input label='비밀번호' placeholder='비밀번호를 입력해주세요'/>
            <Button>로그인</Button>
            <Button _onClick={()=>{history.push('/signup');}}>회원가입</Button>
            <Button>카카오 로그인</Button>
        </div>
    );
};

export default Login;