import React, { Fragment, useState, useRef } from "react";
import classes from "./SelectDateFilter.module.css";

import { Grid } from "../../element/index";

const SelectDateFilter = (props) => {

  const selectYearHandler = (e) => {
    props.onSelectYearFilter(e.target.value);
  };

  return (
    <Fragment>
      <Grid is_flex>
        <div className={classes["expenses-filter"]}>
          <div className={classes["expenses-filter__control"]}>
            <select value={props.selected} onChange={selectYearHandler}>
              
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

export default SelectDateFilter;
