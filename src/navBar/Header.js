import React, { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderAlarmButton from './HeaderAlarmButton';
import AlarmIcon from '../assets/AlarmIcon';
import MapIcon from '../assets/MapIcon';
import MypageIcon from '../assets/MypageIcon';
import LicenseIcon from '../assets/LicenseIcon';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Mlog</h1>
        <div className={classes['icon-box']}>        
            <HeaderAlarmButton><MapIcon/></HeaderAlarmButton>
            <HeaderAlarmButton><LicenseIcon/></HeaderAlarmButton>
            <HeaderAlarmButton><MypageIcon/></HeaderAlarmButton>
            <HeaderAlarmButton><AlarmIcon/></HeaderAlarmButton>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
