import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { realtime } from "../shared/firebase";

import { Grid } from "../element/index";
import classes from "./Notification.module.css";
import Card from "../components/comment/Card";

const Notification = (props) => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = React.useState([]);

  React.useEffect(() => {
    if (!user) {
      return;
    }
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild("insert_dt");
    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        
    // 댓글시간 역순으로 정렬
        let noti_list = Object.keys(_data).reverse().map(l => {
          return _data[l];
        })
        console.log(noti_list);
        setNoti(noti_list);
      }
    });
  }, [user]);
 
  return (
    <Fragment>
      <Grid padding="16px" bg="aliceblue" _onClick={() => {}}>
        <p className={classes.header}>알림</p>
        {noti.map((n,index) => {
          return <Card {...n} key={`noti_${index}`} />;
        })}
      </Grid>
    </Fragment>
  );
};

export default Notification;
