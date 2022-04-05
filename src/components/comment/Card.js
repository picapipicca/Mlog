import React, { Fragment } from "react";
import classes from "./Card.module.css";
import { history } from "../../redux/configStore";
import Paper from "@mui/material/Paper";

const Card = (props) => {
  const { post_title, image_url, insert_dt, user_nick, post_id } = props;

  return (
    <>
      <div className={classes.wrap}>
        <div
          onClick={() => {
            history.push(`/post/${post_id}`);
          }}
        >
          <div className={classes.box}>
            
            <Paper sx={{width:'90%',padding:'20px',textAlign:'center',height:'100%',margin:'auto',cursor:'pointer'}} elevation={4}>
              {`${post_title} 로그에 ${user_nick} 님의 댓글이 달렸습니다! `}
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
