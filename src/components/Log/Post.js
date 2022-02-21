import React, { Fragment } from "react";
import classes from "./Post.module.css";
import { Grid, Button } from "../../element/index";
import { history } from "../../redux/configStore";
// import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import { Viewer } from "@toast-ui/react-editor";

const Post = (props) => {
  // const markup = () => {
  //   return {__html : props.title}
  // }

  return (
    <Fragment>
      <Grid>
        <Grid padding="16px" is_flex>
          <Grid is_flex width="auto">
          <div className={classes.title}> 로그기록 : {props.content}</div>
            {/* <img alt="사용자 이미지" src={props.user_info.user_profile} /> */}
            <p>{props.user_info.user_nick}</p>
          </Grid>
          <Grid is_flex width="auto" padding='16px'>
            <p>{props.insert_dt}</p>
            {!props.is_me && (
              <Button
                width="auto"
                padding="4px"
                margin="4px"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              >
                수정
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.circle}>
        
        <Grid padding="10px">
          {/* <img
            className={classes["inserted-img"]}
            src={props.image_url}
            alt="삽입 이미지"
          ></img> */}
          <Viewer initialValue={props.title} height="600px"/>
        </Grid>
      </div>
      <Grid padding="10px">
        <p>댓글 {props.comment_count}개</p>
      </Grid>
    </Fragment>
  );
};
Post.defaultProps = {
  user_info: {
    user_email: "bbb@bbb.com",
    user_nick: "sexyking_kong",
    user_profile:
      "https://media.comicbook.com/uploads1/2015/02/insideout-123439.jpg",
  },
  image_url:
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
  content: "우울이 인사이드아웃에 나와용 내기분이그래",
  comment_count: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};
export default Post;
