import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { auth } from "../../shared/firebase";

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
const loginActionCreator = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(setUser(user));
    history.push("/");
  };
};

//받아오는값은 이메일,비밀번호,아이디
const signupFirebase = (email, pwd, user_nick) => {
  return function (dispatch, getState, { history }) {
    
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then((user) => {

        console.log(user);

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode,errorMessage);
        // ..
      });
  };
};

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
  loginActionCreator,
};

export { actionCreators };
