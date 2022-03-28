import React from "react";
import classes from "./Mypage.module.css";
import { Button, Image } from "../element/index";
import Permit from "../shared/Permit";

const Mypage = (props) => {
  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        
        <h2>MY ACCOUNT</h2>
        <p className={classes.ptag}>
          welcome back {props.user_info.user_nick} !{" "}
        </p>
        <div className={classes.image}>
          <Image circle size={200} src={props.user_info.user_profile} />
        </div>
        <div className={classes.user__info}>
            <Permit>
                <div>email : {props.user_info.email}</div>
            </Permit>
          
          <div>nickname : {props.user_info.user_nick}</div>
          <div>내가 쓴 글 : 10개</div>
          
          <Permit>
            <button className={classes.btn__edit}>EDIT</button>
          </Permit>
        </div>
      </div>
    </div>
  );
};
Mypage.defaultProps = {
  user_info: {
    email: "mlog@mlog.com",
    user_nick: "unknown",
    user_profile:
      "https://media.istockphoto.com/photos/the-brown-bear-welcomes-picture-id98124449?k=20&m=98124449&s=612x612&w=0&h=WNTknidAVp6o-mhURA46_K1LGKVb7BXtyrXw31Ks7iY=",
  },
};

export default Mypage;
