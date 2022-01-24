import React, { Fragment,useState,useEffect } from "react";
import classes from "./Header.module.css";
import {Grid,Button} from "../element/index";
import HeaderAlarmButton from './HeaderAlarmButton';
import AlarmIcon from '../assets/AlarmIcon';
import MapIcon from '../assets/MapIcon';
import MypageIcon from '../assets/MypageIcon';
import LicenseIcon from '../assets/LicenseIcon';

import { actionCreators as userActions } from "../redux/modules/user";
import { useSelector,useDispatch } from "react-redux";

const Header = (props) => {

  const dispatch = useDispatch();
  const is_login = useSelector((state)=> state.user.is_login);

  const logOut = () => {
    dispatch(userActions.logOut({}));
  }

  if(is_login){
    return(
      <header className={classes.header}>
      <h1>Mlog</h1>
      <div className={classes['icon-box']}>        
          <HeaderAlarmButton><MapIcon/></HeaderAlarmButton>
          <HeaderAlarmButton><LicenseIcon/></HeaderAlarmButton>
          <HeaderAlarmButton><MypageIcon/></HeaderAlarmButton>
          <HeaderAlarmButton><AlarmIcon/></HeaderAlarmButton>
          <Button _onClick={logOut}>로그아웃</Button>
      </div>
    </header>
    );
  }
  return (
    <Fragment>
      <Grid is_flex padding='4px 10px'>
        <Grid>
          <h1>Mlog</h1>
        </Grid>
        <Grid >
          <Button width='10vw' height='5vh' bgColor='#72acdb' color='#080538' text='로그인'></Button>
          <Button width='10vw' bgColor='#2ba677' color='#080538' text='회원가입'></Button>
        </Grid>
      </Grid>
      
    
    </Fragment>
  );
};

export default Header;
