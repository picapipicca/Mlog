import React from 'react'
import { history } from "../../redux/configStore";

import classes from '../../pages/Map.module.css';
import logo2 from "../../assets/logo2.jpeg";


const MapPost = (props) => {
    const { image_url, title, insert_dt, comment_count} = props;
    return (
      <div
        onClick={() => {
          history.push(`/post/${props.id}`);
        }}
      >
        <article className={classes.log}>
          <div className={classes.log__photo}>
            <img alt="" src={image_url ? image_url : logo2} />
          </div>
          <span className={classes.log__title}>{title}</span>
          <div className={classes.log__content}>
            <span>{insert_dt}</span>
            <span>댓글 {comment_count}</span>
          </div>
        </article>
      </div>
    );
  };
  export default MapPost;
