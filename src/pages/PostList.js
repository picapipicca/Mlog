import React, { Fragment, useState,useEffect } from "react";
import { Grid, Button } from "../element/index";
import { useSelector,useDispatch } from "react-redux";
import { actionCreators as LogActions } from "../redux/modules/log";

import Permit from "../shared/Permit";
import Bus from "../components/Bus/Bus";
import Post from "../components/Log/Post";
import classes from "./PostList.module.css";
import BusChart from "../components/Bus/BusChart";
import SelectDateFilter from "../components/selectDate/SelectDateFilter";
// import SelectDate from "../components/selectDate/SelectDate";
// import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
// import ViewStreamIcon from '@material-ui/icons/ViewStream';

  const DUMMY_DATA_2 = [
    {
      price:23,
      name:'asdf',
      day:20,
    }, {
      price:23,
      name:'hjgh',
      day:28,
    },
    {
      price:23,
      name:'klkjlj',
      day:18,
    }];

const PostList = (props) => {

  const dispatch = useDispatch();
  const [showList, setShowList] = useState(true);
  const post_list = useSelector((state)=> state.log.post_list);

  useEffect(()=>{
    dispatch(LogActions.getPostFirebase());
  },[])

  return (
    <Fragment>
      <Permit>
        <section className={classes.wrap}>
          <h1>차고지</h1>
          <Grid is_flex>
            {/* 리스트 받아옴 */}
            <Button
              _onClick={() => {
                setShowList(true);
              }}
              text="리스트"
            ></Button>
            <Button
              _onClick={() => {
                setShowList(false);
              }}
              text="버스"
            ></Button>
          </Grid>

          <SelectDateFilter />
          {/* <SelectDate/> */}
          {showList ?  <div>{post_list.map((p,idx)=>{
            return <Post key={p.id} {...p}/>})}</div>
             : <div className={classes.bus}>
            <Bus bg="transparent" month={8} className={classes.busframe}>
              <BusChart data={DUMMY_DATA_2}/>
            </Bus>
          </div>  }
         
         
        </section>
      </Permit>
    </Fragment>
  );
};

export default PostList;
