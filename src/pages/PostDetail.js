import React, { Fragment } from "react";

import classes from "./PostDetail.module.css";
import { Image, Grid } from "../element/index";
import { Viewer } from "@toast-ui/react-editor";

import CommentList from "../components/log/CommentList";
import CommentWrite from "../components/log/CommentWrite";
import { useSelector } from "react-redux";

const PostDetail = (props) => {
  const { history } = props;
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.log.post_list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  console.log(post_list);
  const its_me = post.user_info.user_id === user_info.uid? true :false ;

  return (
    <Fragment>
      <div className={classes.wrap}>
        <div className={classes["top-header"]}>
          <Image circle src={post.user_info.user_profile} />
          <p>{post.user_info.user_nick}</p>
          <p className={classes["time"]}>{post.insert_dt}</p>
          { its_me && (
            <button
              className={classes["btn-edit"]}
              onClick={() => {
                history.push(`/write/${props.id}`);
              }}
            >
              수정
            </button>
          )}
        </div>

        <div className={classes.header}>
          <div className={classes["header-is-closed"]}>
            <div> 로그기록 : {post.title}</div>
          </div>
        </div>

        <div className={classes.body}>
          <div className={classes.viewer}>
            <Viewer initialValue={post.content} height="auto" />
          </div>

          <div className={classes["body-footer"]}>
            <hr style={{ opacity: "0.8", borderColor: "#EF5A31" }} />
            <Grid is_flex width="auto">
              <p style={{ margin: "10px" }}>댓글 {post.comment_count}개</p>
            </Grid>
          </div>
        </div>
      </div>
      <CommentWrite />
      <CommentList />
    </Fragment>
  );
};

export default PostDetail;
