import React, { Fragment } from "react";
import classes from "./Post.module.css";
import { Grid } from "../../element/index";

const Post = (props) => {
  return (
    <Fragment>
      <Grid>
        <Grid padding="10px" is_flex>
          <Grid is_flex width="auto">
            <img alt="사용자 이미지" src={props.user_info.user_profile} />
            <p>{props.user_info.user_nick}</p>
          </Grid>
          <Grid is_flex width="auto">
            <p>{props.insert_dt}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        padding="10px"
        circle
        bg="green"
        size="400"
        className={classes.circle}
      >
        <Grid is_flex padding="10px">
          <p className={classes.content}>{props.content}</p>
        </Grid>
      </Grid>

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
};
export default Post;
