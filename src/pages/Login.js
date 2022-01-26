import React,{Fragment, useState} from 'react';
import classes from "./Login.module.css";
import { Input,Button } from "../element/index";
import Modal from "../element/Modal";

import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';



const Login = (props) => {
    const dispatch = useDispatch();
    
    const [email,setEmail]= useState('');
    const [pwd,setPwd] = useState('');
    const [showModal,setShowModal] = useState();

   const login = () => {
       if(email.trim().length ===0 || pwd.trim().length === 0){
           setShowModal({
               title: '잘못입력하셨습니다',
               message: "이메일과 비밀번호를 다시 확인해주세요!"})}
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
                <Input label='아이디' placeholder='아이디를 입력해주세요' _onChange={(e)=>{setEmail(e.target.value);}}/>
                <Input label='비밀번호' placeholder='비밀번호를 입력해주세요' type='password' _onChange={(e)=>{setPwd(e.target.value)}}/>
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