import React,{Fragment, useState} from 'react';
import classes from "./Login.module.css";
import { Input,Button } from "../element/index";
import Modal from "../element/Modal";

import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';
import { emailCheck } from '../shared/regEx';



const Login = (props) => {
    const dispatch = useDispatch();
    
    const [email,setEmail]= useState('');
    const [pwd,setPwd] = useState('');
    const [showModal,setShowModal] = useState();

   const login = () => {


       if(email === "" || pwd.trim().length === 0){
           setShowModal({
               title: '잘못입력하셨습니다',
               message: "이메일 혹은 비밀번호가 공란입니다! 입력해주세요 "})}

       if(!emailCheck(email)){
           setShowModal({
               title:'잘못입력하셨습니다',
               message:'이메일을 다시 확인해주세요!',
           })
       }        
       dispatch(userActions.loginFirebase(email,pwd));
   };

    const {history} = props;

    const closeModalHandler = ()=>{
        setShowModal(null);
    }

    return (
        <Fragment>
            {showModal && <Modal onCloseModal={closeModalHandler} title={showModal.title} message={showModal.message}/>}
            <div className={classes.wrap}>
                <Input label='이메일' value={email} placeholder='이메일을 입력해주세요' is_submit onEnterSubmit={login} _onChange={(e)=>{setEmail(e.target.value);}}/>
                <Input label='비밀번호' value={pwd} placeholder='비밀번호를 입력해주세요' type='password' is_submit onEnterSubmit={login} _onChange={(e)=>{setPwd(e.target.value)}}/>
                <Button _onClick={()=>{console.log('로그인했어'); login();}}>로그인</Button>
                <Button>카카오 로그인</Button>
                <Button>페이스북 로그인</Button>
                <Button>Google 로그인</Button>
                <Button _onClick={()=>{history.push('/signup');}}>회원가입</Button>
            </div>
        </Fragment>
       
    );
};

export default Login;