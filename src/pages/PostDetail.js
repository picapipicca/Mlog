import React, { Fragment } from "react";

import classes from "./PostDetail.module.css";
import { Image, Grid } from "../element/index";
import { Viewer } from "@toast-ui/react-editor";

import CommentList from "../components/Log/CommentList";
import CommentWrite from "../components/Log/CommentWrite";
import Permit from "../shared/Permit";

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as logActions } from "../redux/modules/log";

const PostDetail = (props) => {
  const { history } = props;
  const id = props.match.params.id;
  const dispatch = useDispatch();

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.log.post_list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  // const [post, setPost] = React.useState(post_data ? post_data : null);

  const its_me = post?.user_info.user_id === user_info?.uid ? true : false;

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(logActions.getOnePostFirebase(id));
  }, []);

  return (
    <Fragment>
      {post && (
        <div>
          <div className={classes.wrap}>
            <div className={classes["top-header"]}>
              <Image circle src={post.user_info.user_profile} />
              <p>{post.user_info.user_nick}</p>
              <p className={classes["time"]}>{post.insert_dt}</p>
              {its_me && (
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
            </div>
          </div>
          <div className={classes["body-footer"]}>
            <Grid width="auto">
              <p style={{ margin: "15px 80px" }}>댓글 {post.comment_count}개</p>
              <hr
                style={{
                  opacity: "0.8",
                  borderColor: "#CACACA",
                  width: "80vw",
                  margin: "0 80px",
                }}
              />
            </Grid>
          </div>{" "}
        </div>
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </Fragment>
  );
};

export default PostDetail;
