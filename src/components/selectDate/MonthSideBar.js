import React, { Fragment } from "react";
import classes from "./MonthSideBar.modules.css";
import { Button } from "../../element/index";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";

// import { useSelector } from "react-redux";

const MonthSideBar = (props) => {
  // const month = props.month;

  // for (const month of props.month) {
  //   const filteredMonth = month.insert_dt.split('-')[1]; // starting at 0 => January => 0
  //   console.log(filteredMonth)
  //   const arr = new Set(filteredMonth);
  //   const uniqueArr = [...arr];
  //   console.log(uniqueArr);
  //   // chartDataPlots[logMonth-1].value += 1;
  // }
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const SelectMonthHandler = (e) => {
    console.log(e.target.value);
  };
  return (
    <Fragment>
      {month.map((m, idx) => {
        return (
          <div className={classes.box}>
              <Button
              
                bgColor="transparent"
                color="#0d5ad6"
                _onClick={SelectMonthHandler}
                key={idx}
              >
                {m}
              </Button>
              <hr style={{ opacity: "0.8", borderColor: "#0d5ad6" }} />
          </div>
        );
      })}
    </Fragment>
  );
};

export default MonthSideBar;
// return (
//   <Fragment>
//     <Grid is_flex>
//       <ButtonGroup variant="text" aria-label="text button group">
//         {Month.map((m,idx)=>{
//             return <Button onClick={SelectMonthHandler} key={idx}>{m}</Button>
//         })}
//       </ButtonGroup>
//     </Grid>
//   </Fragment>
// );
