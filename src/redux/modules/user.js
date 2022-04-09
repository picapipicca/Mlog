import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { auth } from "../../shared/firebase";
import firebase from "firebase/compat/app";
import { storage } from "../../shared/firebase";

//initialState
const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  email: "asdf@gmail.com",
  pwd: "12341234",
  pwd_confirm: "12341234",
  user_nick: "sexyking",
};

//action

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const EDIT_USER = "EDIT_USER";

//action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const editUser = createAction(EDIT_USER, (user) => ({
  
  user,
}));

//받아오는값은 이메일,비밀번호,아이디
const loginFirebase = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(email, pwd)
        .then((user) => {
          console.log(user);
          dispatch(
            setUser({
              email: email,
              user_nick: user.user.displayName,
              user_profile: user.user.photoURL,
              uid: user.user.uid,
            })
          );
          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          email.length !== 0 &&
            pwd.length !== 0 &&
            window.alert("회원정보가 잘못되었습니다!");
          console.log(errorCode, errorMessage);
        });
    });
  };
};
const signupFirebase = (email, pwd, user_nick) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then((user) => {
        console.log(user);
        auth.currentUser
          .updateProfile({
            displayName: user_nick,
          })
          .then(() => {
            dispatch(
              setUser({
                email: email,
                user_nick: user_nick,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log("에러", error);
          });
      })
      .catch((error) => {
        window.alert("이미 사용중인 이메일입니다!");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

const loginCheckFirebase = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_nick: user.displayName,
            user_profile: user.photoURL, //profile.photo.url이 들어감
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFirebase = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/");
    });
  };
};
const editUserFirebase = (uid, user_nick) => {
  return function (dispatch, getState, { history }) {
    if (!uid) {
      console.log("사용자 정보가 없습니다");
      return;
    }
    const _new_profile = getState().image.preview;

    if (!_new_profile) {
      auth.currentUser
      .updateProfile({
        displayName: user_nick,
      })
        .then((user) => {
          dispatch(editUser(uid, { ...user, user_nick: user_nick }));
          history.replace("/mypage");
        });
      return;
    } else {
      const _upload = storage
        .ref(`profile/${uid}_${new Date().getTime()}`)
        .putString(_new_profile, "data_url");

      _upload
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              return url;
            })
            .then((url) => {
              auth.currentUser
              .updateProfile({
                displaName: user_nick,
                photoURL: url,
              })
                .then((user) => {
                  dispatch(
                    editUser(uid, {
                      ...user,
                      user_nick: user_nick,
                      user_profile: url,
                    })
                  );
                  history.replace("/mypage");
                })
                .catch((err) => {
                  window.alert("앗 프로필 이미지 업로드에 문제가 있어요");
                  console.log("앗 프로필 설정에 문제가 있어요", err);
                });
            });
        })
        .catch((err) => {
          console.log("마이페이지 수정에 실패했어요", err);
        });
    }
  };
};
//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        const user = auth.currentUser;
        sessionStorage.setItem("is_login", user.uid);
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    // [GET_USER]: (state, action) => produce(state, (draft) => {}),

    [EDIT_USER]: (state, action) =>
      produce(state, (draft) => {
        const user = auth.currentUser;
        draft.user = {
          ...draft.user,
          ...action.payload.user,
        };
        console.log("user정보 들어갔음");
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  signupFirebase,
  logOut,
  getUser,
  loginFirebase,
  loginCheckFirebase,
  logoutFirebase,
  editUserFirebase,
  editUser,
};

export { actionCreators };
