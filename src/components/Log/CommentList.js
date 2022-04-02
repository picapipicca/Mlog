import React, { Fragment } from "react";
import { Grid } from "../../element/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import Moment from 'react-moment';
import 'moment/locale/ko';

const CommentList = (props) => {
  const { post_id } = props;

  const comment_list = useSelector((state) => state.comment.list);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFirebase(post_id));
    }
  }, []);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }
  return (
    <Fragment>
      <Grid padding="10px">
        {comment_list[post_id].map((c) => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </Fragment>
  );
};
CommentList.defaultProps = {
  post_id: null,
};
export default CommentList;

export const CommentItem = (props) => {
  const { user_nick, user_profile, email, post_id, insert_dt, content } = props;
  
  //유저정보,게시물정보,코멘트내용,작성시간
  // const displayCreatedAt = ({insert_dt}) => {
    
  //   let startTime = new Date(insert_dt);
  //   let nowTime = Date.now();
  //   if (parseInt(startTime - nowTime) > -60000) {
  //     return <Moment format="방금 전">{startTime}</Moment>;
  //   }
  //   if (parseInt(startTime - nowTime) < -86400000) {
  //     return <Moment format="MMM D일">{startTime}</Moment>;
  //   }
  //   if (parseInt(startTime - nowTime) > -86400000) {
  //     return <Moment fromNow>{startTime}</Moment>;
  //   }
  //   console.log(startTime)
  //   console.log(nowTime)
  // };

  return (
    <Grid is_flex >
      <Grid is_flex width='auto'>
        <Grid circle>
          <img alt="" src={user_profile} />
        </Grid>
        <p style={{ fontWeight: "700" }}>{user_nick}</p>
      </Grid>
      <Grid is_flex margin="0px 15px">
        <p style={{ margin: "0" }}>{content}</p>
        {/* <p style={{ margin: "0" }}>{displayCreatedAt}</p> */}
        <Moment locale='ko' fromNow>{insert_dt}</Moment>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile:
    "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/22/1437565136335/769f4dc9-a5c0-45b7-b5e5-16014a52c225-712x1020.jpeg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fc911815795962e2eb23ad345e69dd80",
  user_nick: "sexyking_",
  email: "",
  post_id: "",
  content: "물보라를 일으켜",
  insert_dt: "2022-01-27 19:00:00",
};
