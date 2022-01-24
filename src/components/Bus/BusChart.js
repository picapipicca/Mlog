import React, { Fragment } from "react";
import classes from "./BusChart.module.css";

const BusChart = (props) => {
    const { day,colorOftheDay } = props;

    function SpaceMatching(day){
        const num = Math.floor(Math.random()*31) +1;
        console.log(num)
        if(num === day) {
            //그에맞는 id를 찾아가서 props.colorOftheDay 에서 받은 색으로 칠해줘라
            //$("#one").css("background-color", "yellow")

        }
    }
  return (
    <Fragment>
      <div className={classes["front_item"]}>
        <div className={classes["front_item__handle"]}><div className={classes["front_item__handleinside"]}></div></div>
        <div className={classes['front_item__driver']}>운전석</div>
      </div>
      
      <div className={classes.wrap}>
        <div id="left_box" className={classes["main_box"]}>
          <div className={classes.item}>
            <div id='1' className={classes.seat}></div>
            <div id='2' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='3' className={classes.seat}></div>
            <div id='4' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='5' className={classes.seat}></div>
            <div id='6' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='7' className={classes.seat}></div>
            <div id='8' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='9' className={classes.seat}></div>
            <div id='10' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='11' className={classes.seat}></div>
            <div id='12' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='13' className={classes.seat}></div>
            <div id='14' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='15' className={classes.seat}></div>
            <div id='16' className={classes.seat}></div>
          </div>
        </div>

        <div id="right_box" className={classes["main_box"]}>
          <div className={classes.item}>
            <div id='17' className={classes.seat}></div>
            <div id='18' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='19' className={classes.seat}></div>
            <div id='20' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='21' className={classes.seat}></div>
            <div id='22' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='23' className={classes.seat}></div>
            <div id='24' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='25' className={classes.seat}></div>
            <div id='26' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='27' className={classes.seat}></div>
            <div id='28' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='29' className={classes.seat}></div>
            <div id='30' className={classes.seat}></div>
          </div>
          <div className={classes.item}>
            <div id='31' className={classes.seat}></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BusChart;
