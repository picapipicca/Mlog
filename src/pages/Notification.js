import React, { Fragment } from "react";
import classes from "./Notification.module.css";
import { Grid } from "../element/index";
import Card from "../components/comment/Card";

const Notification = (props) => {
  let noti = [
    {day:'2022 년 01월 29일', user_name: "hae1", post_id: "post1" },
    {day:'2022 년 01월 30일', user_name: "hae1", post_id: "post2" },
    {day:'2022 년 01월 01일', user_name: "hae1", post_id: "post3" },
    {day:'2022 년 01월 24일', user_name: "hae1", post_id: "post4" },
  ];
  return (
    <Fragment>
      <Grid padding="16px" bg="aliceblue" _onClick={() => {}}>
        <p className={classes.header}>알림</p>
        {noti.map((n)=>{
            return <Card {...n} key={n.post_id}/>
        })}
      </Grid>
    </Fragment>
  );
};

export default Notification;
