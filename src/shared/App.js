import React, { Fragment } from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../redux/configStore';

import Map from "../pages/Map";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../navBar/Header";
import Log from "../components/Log";
import PostWrite from "../pages/PostWrite";
import PostList from "../pages/PostList";

function App() {
  return (
    <Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <div className='wrap'>
          <Route path="/" exact component={Map}/>
          <Route path="/log" exact component={Log}/>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/postwrite" exact component={PostWrite} />
          <Route path="/postlist" exact component={PostList} />
        </div>
      </ConnectedRouter>
    </Fragment>
  );
}

export default App;
