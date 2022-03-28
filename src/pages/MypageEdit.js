import React from "react";
import classes from "./Mypage.module.css";
import { Image } from "../element/index";
import Permit from "../shared/Permit";

export const MypageEdit = (props) => {
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
