import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  const { day,user_name, post_id } = props;

  return (
    <div className={classes.box}>
      <div className={classes.noti}>
        <p className={classes.day}>{props.day}</p> 로그에 <b>{user_name}</b>님의 댓글이 달렸습니다!
      </div>
    </div>
  );
};
export default Card;
