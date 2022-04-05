import React, { Fragment } from "react";
import { Input, Grid } from "../../element/index";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Permit from '../../shared/Permit';

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_txt, setCommentText] = React.useState();
  const { post_id } = props;

  const saveCommentHandler = (e) => {
    setCommentText(e.target.value);
  };
  const writeCommentHandler = () => {
    dispatch(commentActions.addCommentFirebase(post_id, comment_txt));
    setCommentText("");
  };

  return (
    <Fragment>
      <Permit>
        <Grid padding="0 50px 40px 140px" is_flex>
        <Input
          width="73vw"
          value={comment_txt}
          is_submit
          _onChange={saveCommentHandler}
          placeholder="댓글을 작성해주세요 (:"
          onEnterSubmit={writeCommentHandler}
        />
        <SubmitBtn onClick={writeCommentHandler}>댓글 작성</SubmitBtn>
      </Grid>
      </Permit>
      
    </Fragment>
  );
};
const SubmitBtn = styled.button`
  background-color: #000;
  color:#fff;
  width: 7vw;
  border-radius:10px;
  border: none;
  font-size: 18px;
  padding: 0.8rem;
  margin: auto auto auto 20px;
  cursor:pointer;
  &:hover{
    background-color:#424240;
  }
  @media screen and (max-width:1050px){
    font-size:14px;
    width: 5vw;
    padding: 0.3rem;
  }
`;

export default CommentWrite;
