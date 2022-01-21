import React from 'react';
import classes from "./HeaderAlarmButton.module.css";

const HeaderAlarmButton = (props) => {
    return (
        <div className={classes.button}>
           <span>{props.children}</span> 
        </div>
    );
};

export default HeaderAlarmButton;