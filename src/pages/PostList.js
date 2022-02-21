import React from "react";
import { Grid, Button } from "../element/index";
import { useSelector,useDispatch } from "react-redux";
import { actionCreators as LogActions } from "../redux/modules/log";

import Bus from "../components/Bus/Bus";
import Post from "../components/log/Post";
import classes from "./PostList.module.css";
import BusChart from "../components/Bus/BusChart";
import SelectDateFilter from "../components/selectDate/SelectDateFilter";

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

  const [listType, setListType] = React.useState(true);
  const post_list = useSelector((state)=> state.log.post_list);
  const user_info = useSelector((state)=> state.user.user);

  React.useEffect(()=> {
    if(post_list.length === 0){
      dispatch(LogActions.getPostFirebase());
    }
  },[])

  return (
    <React.Fragment>
      
        <section className={classes.wrap}>
          <h1>차고지</h1>

          <Grid is_flex>
            {/* 리스트 받아옴 */}
            <Button _onClick={() => { setListType(true); }} text="리스트"/>
            <Button _onClick={() => { setListType(false); }} text="버스"/>
          </Grid>
          <SelectDateFilter />
          {/* <SelectDate/> */}
          
          {listType ?  
          <div> {post_list.map((p,idx)=>{
            if(p.user_info.user_id === user_info?.uid){ 
              return <Post key={p.id} {...p} is_me/>;
            }else{
                return <Post key={p.id} {...p}/>;
              }
            })}</div>
             : 
             <div className={classes.bus}>
            <Bus bg="transparent" month={8} className={classes.busframe}>
              <BusChart data={DUMMY_DATA_2}/>
            </Bus>
          </div>  }
        </section>
      
    </React.Fragment>
  );
};

export default PostList;
