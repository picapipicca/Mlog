import React from "react";
import classes from "./Mypage.module.css";
import Permit from "../shared/Permit";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as imageActions } from "../redux/modules/image";

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const Mypage = (props) => {
  const user_email = props.match.params.id;
  const one_user = useSelector((state) => state.user.user);
  const _user_profile= useSelector((state)=> state.user.user?.user_profile);
  const uid = sessionStorage.getItem("is_login");
  const is_edit = user_email ? true : false;
  const dispatch = useDispatch();
  const fileInput = React.useRef(null);

  const [nickMsg, setNickMsg] = React.useState("");
  const [isNick, setIsNick] = React.useState(false);
  const [nick, setNick] = React.useState("");
  const [profile, setProfile] = React.useState(
    _user_profile ? _user_profile : "/broken-image.jpg"
  );

  React.useEffect(() => {
    if (is_edit && !one_user) {
      alert("사용자 정보가 없어요!");
      history.goBack();
      return;
    }
  }, []);
  console.log(one_user);

  const changeNick = React.useCallback((e) => {
    setNick(e.target.value);

      if (e.target.value.trim().length < 2 || e.target.value.trim().length > 10) {
        setNickMsg("2글자 이상 9글자 미만으로 입력해주세요");
        setIsNick(false);
      } else {
        setNickMsg("올바른 닉네임 형식입니다");
        setIsNick(true);
      }},[]);

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
    const file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const onSubmitHandler = () => {
    dispatch(
      userActions.editUserFirebase(uid, {
        user_nick: nick,
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
                src={one_user?.user_profile}
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
              <Avatar icon={<UserOutlined />} src={one_user?.user_profile} size={200} />
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
                {nick.length > 0 && (
            <div
              className={`${classes.message} ${
                isNick ? classes.success : classes.error
              }`}
            >
              {nickMsg}
            </div>
          )}
            </div>
            
          ) : (
            <div>nickname : {one_user?.user_nick}</div>
          )}

          <Permit>
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
                <button className={classes.btn__edit} onClick={onSubmitHandler} disabled={!(isNick)}>
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
          </Permit>
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
