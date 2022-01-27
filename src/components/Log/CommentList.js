import React, { Fragment } from "react";
import { Grid } from "../../element/index";

const CommentList = (props) => {
  return (
    <Fragment>
      <Grid padding="10px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </Fragment>
  );
};

export default CommentList;

export const CommentItem = (props) => {
  const { user_nick, user_profile, email, post_id, insert_dt, content } = props;
  //유저정보,게시물정보,코멘트내용,작성시간
  return (
    <Grid is_flex>
      <Grid is_flex width='auto'>
        <Grid circle>
          <img alt="profile example" src={user_profile} />
        </Grid>
        <p style={{fontWeight:'700'}}>{user_nick}</p>
      </Grid>
      <Grid is_flex margin='0px 10px'>
        <p style={{margin:'0'}}>{content}</p>
        <p style={{margin:'0'}}>{insert_dt}</p>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile:
    "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/22/1437565136335/769f4dc9-a5c0-45b7-b5e5-16014a52c225-712x1020.jpeg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fc911815795962e2eb23ad345e69dd80",
  user_nick: "sexyking_kong",
  email: "",
  post_id: "",
  content: "분노는 화를 참지 못해",
  insert_dt: "2022-01-27 19:00:00",
};
