import React from "react";
import classes from "./Mypage.module.css";
import Permit from "../shared/Permit";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const Mypage = (props) => {

  const user_email = props.match.params.id;
  const one_user = useSelector((state) => state.user.user);
  const uid = one_user?.uid;
  const is_edit = user_email ? true : false;
  const dispatch = useDispatch();
  const fileInput = React.useRef(null);

  const [nick, setNick] = React.useState(one_user ? one_user.user_nick : "");
  const [profile, setProfile] = React.useState(
    one_user ? one_user?.user_profile : "/broken-image.jpg"
  );

  React.useEffect(() => {

    if (is_edit && !one_user) {
      alert("사용자 정보가 없어요!");
      history.goBack();
      return;
    }
  }, []);

  const changeNick = (e) => {
    setNick(e.target.value);
  };
  const selectFile = (e) => {
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onEditUserHandler = () => {
    dispatch(
      userActions.editUserFirebase(uid, {
        user_nick: nick,
        user_profile: profile,
      })
    );
  };
  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        <h2>MY ACCOUNT</h2>
        <p className={classes.ptag}>welcome back , {one_user?.user_nick} ! </p>
        <div className={classes.image}>
          {is_edit ? (
            <div>
              <Avatar
                icon={<UserOutlined />}
                src={profile}
                style={{ cursor: "pointer", backgroundColor: "#CACACA" }}
                size={200}
                onClick={() => {
                  fileInput.current.click();
                }}
              />

              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,impge/png,image/jpeg"
                name="profile_img"
                onChange={selectFile}
                ref={fileInput}
              />
            </div>
          ) : (
            <div>
              <Avatar icon={<UserOutlined />} src={profile} size={200} />
            </div>
          )}
        </div>
        <div className={classes.user__info}>
          <Permit>
            <div>email : {one_user?.email}</div>
          </Permit>

          {is_edit ? (
            <div>
              nickname :{" "}
              <input
                className={classes.nick}
                onChange={changeNick}
                value={nick}
                placeholder="변경할 닉네임을 입력해주세요"
              />
            </div>
          ) : (
            <div>nickname : {one_user?.user_nick}</div>
          )}
         

          {/* <Permit>
            {is_edit ? (
              <div className={classes.btn__space}>
                <button
                  className={classes.btn__edit}
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  CANCEL
                </button>
                <button
                  className={classes.btn__edit}
                  onClick={onEditUserHandler}
                >
                  DONE
                </button>
              </div>
            ) : (
              <button
                className={classes.btn__edit}
                onClick={() => {
                  history.push(`/mypage/${one_user.email}`);
                }}
              >
                EDIT
              </button>
            )}
          </Permit> */}
        </div>
      </div>
    </div>
  );
};

Mypage.defaultProps = {
  user_info: {
    email: "mlog@mlog.com",
    user_nick: "unknown",
    user_profile:
      "https://media.istockphoto.com/photos/the-brown-bear-welcomes-picture-id98124449?k=20&m=98124449&s=612x612&w=0&h=WNTknidAVp6o-mhURA46_K1LGKVb7BXtyrXw31Ks7iY=",
  },
};

export default Mypage;
