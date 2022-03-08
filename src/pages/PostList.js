import React from "react";
import { Grid, Button } from "../element/index";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as logActions } from "../redux/modules/log";

import Bus from "../components/Bus/Bus";
import Post from "../components/Log/Post";
import classes from "./PostList.module.css";
import BusChart from "../components/Bus/BusChart";
import SelectDateFilter from "../components/selectDate/SelectDateFilter";
import InfinityScroll from "../shared/InfinityScroll";

const DUMMY_DATA_2 = [
  {
    price: 23,
    name: "asdf",
    day: 20,
  },
  {
    price: 23,
    name: "hjgh",
    day: 28,
  },
  {
    price: 23,
    name: "klkjlj",
    day: 18,
  },
];

const PostList = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const [listType, setListType] = React.useState(true);
  // const { post_list, is_loading, paging } = useSelector((state) => state.log);
  const post_list = useSelector((state) => state.log.post_list);
  const is_loading = useSelector((state) => state.log.is_loading);
  const paging = useSelector((state) => state.log.paging);
  const user_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(logActions.getPostFirebase());
    }
  }, []);

  return (
    <React.Fragment>
      <section className={classes.wrap}>
        <h1>차고지</h1>

        <Grid is_flex>
          {/* 리스트 받아옴 */}
          <Button
            _onClick={() => {
              setListType(true);
            }}
            text="리스트"
          />
          <Button
            _onClick={() => {
              setListType(false);
            }}
            text="버스"
          />
        </Grid>
        <SelectDateFilter />
        {/* <SelectDate/> */}
          {listType ? (
              <InfinityScroll
              callNext={()=>{dispatch(logActions.getPostFirebase(paging.next))}}
              is_next={paging.next? true : false }
              loading={is_loading}
              >
            <div className={classes.display}>
              {" "}
              {post_list.map((p, idx) => {
                if (p.user_info.user_id === user_info?.uid) {
                  return (
                    <Grid
                      key={p.id}
                      _onClick={() => {
                        history.push(`/post/${p.id}`);
                      }}
                    >
                      {" "}
                      <Post key={p.id} {...p} its_me />{" "}
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      key={p.id}
                      _onClick={() => {
                        history.push(`/post/${p.id}`);
                      }}
                    >
                      <Post key={p.id} {...p} />;
                    </Grid>
                  );
                }
              })}
            </div>
            </InfinityScroll>
          ) : (
            <div className={classes.bus}>
              <Bus bg="transparent" month={8} className={classes.busframe}>
                <BusChart data={DUMMY_DATA_2} />
              </Bus>
            </div>
          )}
        
      </section>
      {/* <button
        onClick={() => {
          dispatch(logActions.getPostFirebase(paging.next));
        }}
      >
        추가로드
      </button> */}
    </React.Fragment>
  );
};

export default PostList;
