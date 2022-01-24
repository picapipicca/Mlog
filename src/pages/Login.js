import React,{useState} from 'react';
import classes from "./Login.module.css";
import { Input,Button } from "../element/index";

import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';


const Login = (props) => {
    const dispatch = useDispatch();

    const [email,setEmail]= useState('');
    const [pwd,setPwd] = useState('');

   const changeId = (e)=> {
       setEmail(e.target.value);
   }
   const changePwd = (e)=> {
    setPwd(e.target.value);
   }
   const login =()=> {
       dispatch(userActions.loginActionCreator({email: 'sexykingkong'}));
   }
    const {history} = props;

    return (
        <div className={classes.wrap}>
            <Input label='아이디' placeholder='아이디를 입력해주세요' type='text' _onChange={changeId}/>
            <Input label='비밀번호' placeholder='비밀번호를 입력해주세요' _onChange={changePwd}/>
            <Button _onClick={()=>{console.log('로그인했어'); login();}}>로그인</Button>
            <Button>카카오 로그인</Button>
            <Button>페이스북 로그인</Button>
            <Button>Google 로그인</Button>
            <Button _onClick={()=>{history.push('/signup');}}>회원가입</Button>
            
        </div>
    );
};

export default Login;