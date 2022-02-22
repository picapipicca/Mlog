import React, { Fragment } from "react";
import classes from "./Post.module.css";
import { Grid, Button, Image } from "../../element/index";
import { history } from "../../redux/configStore";
import { Viewer } from "@toast-ui/react-editor";

const Post = (props) => {
  return (
    <div className={classes.wrap}>
      
        {props.its_me && (
          <button
            className={classes["btn-edit"]}
            onClick={() => {
              history.push(`/write/${props.id}`);
            }}
          >
            수정{" "}
          </button>
        )}
        <div className={classes.header}>
          <div className={classes["header-is-closed"]}>
            <div> 로그기록 : {props.content}</div>
            <Image circle src={props.user_info.user_profile} />
            <p>{props.user_info.user_nick}</p>
          </div>
        </div>
      

      <div className={classes.body}>
        <div className={classes.viewer}><Viewer initialValue={props.title} height="auto"/></div>
      
        <div className={classes["body-footer"]}>
          <hr style={{ opacity: "0.8", borderColor: "#EF5A31" }} />
          <Grid is_flex width="auto">
            <p style={{ margin: "0px 10px 0px 0px" }}>{props.insert_dt}</p>
            <p style={{ margin: "0px" }}>댓글 {props.comment_count}개</p>
          </Grid>
        </div>
      </div>
    </div>
  );
};
Post.defaultProps = {
  user_info: {
    user_email: "sexy@sexy.com",
    user_nick: "sexyking_kong",
    user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-iHViR_a2AhgBem1vrDk2rS9HLOigXU913w&usqp=CAU",
  },
  image_url: "",
  content: "우울이 인사이드아웃에 나와용 내기분이그래",
  comment_count: 10,
  insert_dt: "2021-02-27 10:00:00",
  its_me: false,
};
export default Post;
