import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { auth } from "../../shared/firebase";
import firebase from "firebase/compat/app";

//initialState = defaultProps
const initialState = {
  //로그인하기전에는 일단 유저정보가 없어야하니까 null
  user: null,
  is_login: false,
};

const user_initial = {
  email: "asdf@gmail.com",
  pwd: "12341234",
  pwd_confirm: "12341234",
  user_nick: "sexykingkong",
};

//action
//login,signup = SET_USER
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

//action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//middleware actions

// const loginActionCreator = (user) => {
//   return function (dispatch, getState, { history }) {
//     console.log(history);
//     dispatch(setUser(user));
//     history.push("/");
//   };
// };

//받아오는값은 이메일,비밀번호,아이디
const loginFirebase = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(email, pwd)
        .then((user) => {
          //로그인한다음에 뭘할거야?
          console.log(user);
          dispatch(
            setUser({
              email: email,
              user_nick: user.user.displayName,
              user_profile: "",
              uid: user.user.uid,
            })
          );
          history.push("/");
          // dispatch(setUser({
          //   //auth.currentUser에서 nick 가져오거나, then에 있는 user에서 가져와도됨
          //   email: email,
          //   user_nick: user_nick,
          //   user_profile: "",
          // })
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

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
            console.log(error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

//리덕스에서 새로고침해도 로그인안날아가고 유지시켜주는방법 -> app.js에서 useEffect로 적용시켜줌
//처음에 딱 들어가면 app.js 에서 session 유무 체크-> session있으면 있네? 리덕스에 로그인체크 보내봐야겠다-> 해봤더니 여기 정보가 있네 이정보 넣어줄게 해준것! 
const loginCheckFirebase = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_nick: user.displayName,
            user_profile: "",//profile.photo.url이 들어감
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

const logoutFirebase = ()=>{
  return function( dispatch,getState,{history} ){
    auth.signOut().then(()=>{
      dispatch(logOut());
      history.replace('/');
    })
  }
}
//reducer
export default handleActions(
  {
    //produce로 원본값을 복사한값을 받아온게 draft
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.setItem("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
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
  // loginActionCreator,
};

export { actionCreators };
