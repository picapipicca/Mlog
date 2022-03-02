import React, { Fragment } from "react";
import classes from "./Card.module.css";
import { Image, Grid } from "../../element/index";
import { history } from '../../redux/configStore';

const Card = (props) => {
  const { post_title, image_url, user_nick, post_id } = props;

  return (
    <Grid _onClick={()=>{history.push(`/post/${post_id}`)}}>
      <div className={classes.box}>
        <div className={classes.noti}>
          {/* {image_url && <Image size={85} shape="square" src={image_url} />} */}
          {`${post_title} 로그에 ${user_nick} 님의 댓글이 달렸습니다! `}
        </div>
      </div>
    </Grid>
  );
};
export default Card;
