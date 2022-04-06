import React, { Fragment } from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiBadge = (props) => {
  const { _onClick } = props;
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid);

  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({read:true});
    _onClick();
  };

  //realtime database 구독 DB.on() / 구독해지 DB.off()
  //함수형 컴포넌트에서 리스너 구독 : UseEffect
  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);

    notiDB.on("value", (snapshot) => {
      //(바뀐값)=>{값이 바뀌었을때 무엇을 동작했으면 좋겠어?}

      setIsRead(snapshot.val()?.read);
    });

    //파이어베이스의 실시간 데이터베이스 구독해제
    return () => notiDB.off();
  }, []);

  
  return (
    <Fragment>
      <Badge
        color="secondary"
        variant="dot"
        invisible={is_read}
        onClick={notiCheck}
      >
        <NotificationsIcon style={{ fill: "#000" }} fontSize="large" />
      </Badge>
    </Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
