import React, { Fragment, useState, useEffect } from "react";
import classes from "./Header.module.css";
// import { Grid, Button } from "../element/index";
// import HeaderAlarmButton from "./HeaderAlarmButton";
// import { licenseIcon, alarmIcon, mapIcon, mypageIcon } from "../assets/index";
// import Permit from "../shared/Permit";
import NotiBadge from "./NotiBadge";
import { RiLogoutCircleRLine } from "react-icons/ri";

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
 
  if (is_login && is_session) {
    return (
      
        <div className={classes.wrap}>
          <header className={classes.header}>
            <div className={classes.header__nav}>
              <ul>
                <li>
                  <a href="/">Mood Log</a>{" "}
                  <RiLogoutCircleRLine style={{cursor:'pointer'}} onClick={logOut} />
                </li>
                <li className={classes.fixed}>
                  <a href="/">Home</a>
                </li>
                <li className={classes.fixed}>
                  <a href="/list">Log</a>
                </li>
                <li className={classes.fixed}>
                  {" "}
                  <a href="/mypage">Mypage</a>
                </li>
                <li className={classes.fixed}>
                  {" "}
                  <a href="/noti">
                    Alarm
                    <NotiBadge _onClick={() => { history.push('/noti')}}/>
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className={classes.header__toggle}>
            <BiMenuAltRight />
          </div> */}
          </header>
        </div>
      
    );
  }
else{
  return (
    <Fragment>
      <div className={classes.wrap}>
          <header className={classes.header}>
            <div className={classes.header__nav}>
              <ul>
                <li>
                  <a href="/">Mood Log</a>{" "}
                  
                </li>
                <li className={classes.login}>
                  <a href="/login">LogIn</a>
                </li>
                <li className={classes.signup}>
                  <a  href="/signup">Signup</a>
                </li>
              </ul>
            </div>
            {/* <div className={classes.header__toggle}>
            <BiMenuAltRight />
          </div> */}
          </header>
        </div>
    </Fragment>
  );
}
};

export default Header;
