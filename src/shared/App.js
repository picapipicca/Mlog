import React, { Fragment } from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Map from "../pages/Map";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Route path="/" exact component={Map} />
        <Route path="/login" component={Login} />
        <Route path="/singup" component={Signup} />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
