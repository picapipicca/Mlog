import React, { Fragment } from "react";
import { Grid } from "../../element/index";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { useSelector } from "react-redux";

const MonthButton = (props) => {

  const Month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const SelectMonthHandler=(e)=>{
        console.log(e.target.value);
    }
  return (
    <Fragment>
      <Grid is_flex>
        <ButtonGroup variant="text" aria-label="text button group">
          {Month.map((m,idx)=>{
              return <Button onClick={SelectMonthHandler} key={idx}>{m}</Button>
          })}
        </ButtonGroup>
      </Grid>
    </Fragment>
  );
};

export default MonthButton;
