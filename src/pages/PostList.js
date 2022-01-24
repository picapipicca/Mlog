import React, { Fragment } from "react";

import Bus from "../components/Bus/Bus";
import classes from "./PostList.module.css";
import BusChart from '../components/Bus/BusChart';
import SelectDateFilter from "../components/selectDate/SelectDateFilter";
import SelectDate from "../components/selectDate/SelectDate";

const PostList = (props) => {
  return (
    <Fragment>
      <section className={classes.wrap}>
        <h1>차고지</h1>
        <SelectDateFilter/>
        <SelectDate/>
        <div className={classes.bus}>
          <Bus bg='transparent' month={8} className={classes.busframe}><BusChart/></Bus>
        </div>
      </section>
    </Fragment>
  );
};

export default PostList;