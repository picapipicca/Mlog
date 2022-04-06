import React, { Fragment, useEffect } from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";

import Map from "../pages/Map";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../navBar/Header";

import PostWrite from "../pages/PostWrite";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";
import Post from "../components/Log/Post";
import Mypage from "../pages/Mypage";
import Permit from "./Permit";
import { Button } from "../element/index";

function App() {
  const dispatch = useDispatch();

  const session_key_check = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(session_key_check) ? true : false;

  useEffect(() => {
    //loginCheckFirebase 해주는조건 :session 에 key가 있나없나
    if (is_session) {
      dispatch(userActions.loginCheckFirebase());
    }
  }, []);

  return (
    <Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <div className="wrap">
          <Route path="/" exact component={Map} />
          
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/write/:id" exact component={PostWrite} />
          <Route path="/list" exact component={PostList} />
          <Route path="/post" exact component={Post} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/noti" exact component={Notification} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/mypage/:id" exact component={Mypage} />
        </div>
      </ConnectedRouter>
      <Permit>
        <Button
          floatBtn
          text="+"
          _onClick={() => {
            history.replace("/write");
          }}
        ></Button>
      </Permit>
    </Fragment>
  );
}

export default App;
