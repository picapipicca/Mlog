import React from "react";
import { Grid, Button } from "../element/index";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as logActions } from "../redux/modules/log";

import classes from "./PostList.module.css";
import InfinityScroll from "../shared/InfinityScroll";

import SelectDateFilter from "../components/selectDate/SelectDateFilter";
import Post from "../components/Log/Post";
import LogChart from "../components/selectDate/LogChart";
import MonthSideBar from "../components/selectDate/MonthSideBar";

const PostList = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  // const { post_list, is_loading, paging } = useSelector((state) => state.log);
  const post_list = useSelector((state) => state.log.post_list);
  const is_loading = useSelector((state) => state.log.is_loading);
  const paging = useSelector((state) => state.log.paging);
  const user_info = useSelector((state) => state.user.user);

  const [yearFilter, setYearFilter] = React.useState("2022");
  const selectYear = (selectedYear) => {
    setYearFilter(selectedYear);
  };

  //년도에 따라 필터
  const filteredYearList = post_list.filter((p) => {
    return p.insert_dt.split("-")[0] === yearFilter;
  });

  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(logActions.getPostFirebase());
    }
  }, []);

  const filteredList = filteredYearList ? filteredYearList : post_list;

  return (
      <Grid is_flex>
        <Grid>
          <section className={classes.wrap}>
            <h1>~~ 로그 기록 ~~</h1>

            <SelectDateFilter
              selected={yearFilter}
              onSelectYearFilter={selectYear}/>

            <LogChart filtered={filteredYearList} />
            {/* <SelectDate/> */}
              <InfinityScroll
                callNext={() => {
                  dispatch(logActions.getPostFirebase(paging.next));
                }}
                is_next={paging.next ? true : false}
                loading={is_loading}
              >
                <div className={classes.display}>
                  {filteredYearList.length === 0 ? (
                    <h2 className={classes.none}> 로그 기록이 없습니다! </h2>
                  ) : null}
                  {filteredList.map((p, idx) => {
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
          </section>
        </Grid>
        <div className={classes.stickybox}>
          <MonthSideBar month={filteredYearList}/>
        </div>
      </Grid>
  );
};

export default PostList;
