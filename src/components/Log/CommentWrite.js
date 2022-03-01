import React, { Fragment } from "react";
import { Input, Button, Grid } from "../../element/index";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_txt, setCommentText] = React.useState();
  const {post_id} = props;

  const saveCommentHandler = (e) => {
    setCommentText(e.target.value);
  };
  const writeCommentHandler = () => {
    dispatch(commentActions.addCommentFirebase(post_id,comment_txt));
    setCommentText("");
  };

  return (
    <Fragment>
      <Grid padding="0 80px" is_flex>
        <Input
          width="70vw"
          value={comment_txt}
          is_submit
          _onChange={saveCommentHandler}
          placeholder="댓글을 작성해주세요 (:"
        />
        <Button
          width="60px"
          margin="0 5px 0 5px"
          _onClick={writeCommentHandler}
        >
          작성
        </Button>
      </Grid>
    </Fragment>
  );
};

export default CommentWrite;
