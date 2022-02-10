import React, { Fragment, useState, useEffect } from "react";
import classes from "./Header.module.css";
import { Grid, Button } from "../element/index";
import HeaderAlarmButton from "./HeaderAlarmButton";
import { licenseIcon, alarmIcon, mapIcon, mypageIcon } from "../assets/index";
import Permit from "../shared/Permit";

import { actionCreators as userActions } from "../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const session_key_check = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(session_key_check) ? true : false;

  const logOut = () => {
    dispatch(userActions.logoutFirebase());
  };

  //if(is_login && is_session ){ return(
  //   );}

  return (
    <Fragment>
      <Permit>
        <header className={classes.header}>
          <h1>Mlog</h1>
          <div className={classes["icon-box"]}>
            <HeaderAlarmButton>
              <a href="/"><img src={mapIcon} alt="" /></a>
            </HeaderAlarmButton>
            <HeaderAlarmButton>
            <a href="/log"><img src={licenseIcon} alt="" /></a>
            </HeaderAlarmButton>
            <HeaderAlarmButton>
            <a href="/mypage"><img src={mypageIcon} alt="" /></a>
            </HeaderAlarmButton>
            <HeaderAlarmButton>
            <a href="/alarm"><img src={alarmIcon} alt="" /></a>
            </HeaderAlarmButton>
            <Button margin='auto' _onClick={logOut}>로그아웃</Button>
          </div>
        </header>
      </Permit>
      <Grid is_flex padding="4px 10px">
        <Grid>
          <h1>Mlog</h1>
        </Grid>
        <Grid>
          <Button
            width="10vw"
            height="5vh"
            bgColor="#72acdb"
            color="#080538"
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            width="10vw"
            bgColor="#2ba677"
            color="#080538"
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Header;
