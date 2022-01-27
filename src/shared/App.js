import React, { Fragment,useEffect } from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../redux/configStore';

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";

import Map from "../pages/Map";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../navBar/Header";
import Log from "../components/Log";
import PostWrite from "../pages/PostWrite";
import PostList from "../pages/PostList";

function App() {
  const dispatch = useDispatch();

  const session_key_check = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(session_key_check) ? true : false;

  useEffect(()=>{ 
    //loginCheckFirebase 해주는조건 :session 에 key가 있나없나
    if(is_session){
      dispatch(userActions.loginCheckFirebase())
    }
  },[])

  return (
    <Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <div className='wrap'>
          <Route path="/" exact component={Map}/>
          <Route path="/log" exact component={Log}/>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/list" exact component={PostList} />
        </div>
      </ConnectedRouter>
    </Fragment>
  );
}

export default App;
