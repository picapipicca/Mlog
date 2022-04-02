import React from "react";
import { Grid, Button, Spinner } from "../element/index";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as logActions } from "../redux/modules/log";

import classes from "./PostList.module.css";
import InfinityScroll from "../shared/InfinityScroll";

import SelectDateFilter from "../components/selectDate/SelectDateFilter";
import Post from "../components/Log/Post";
import LogChart from "../components/selectDate/LogChart";
import MonthSideBar from "../components/selectDate/MonthSideBar";
import Masonry from "react-masonry-css";
import moment from 'moment';

const PostList = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  // const { post_list, is_loading, paging } = useSelector((state) => state.log);
  const post_list = useSelector((state) => state.log.post_list);
  const is_loading = useSelector((state) => state.log.is_loading);
  const paging = useSelector((state) => state.log.paging);
  const user_info = useSelector((state) => state.user.user);

  const [yearFilter, setYearFilter] = React.useState(moment().format('YYYY'));
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
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    900: 2,
    425: 1,
  };
  return (
    <>
      <Grid>
        <SelectDateFilter
          selected={yearFilter}
          onSelectYearFilter={selectYear}
        />
      </Grid>
      <InfinityScroll
        callNext={() => {
          dispatch(logActions.getPostFirebase(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classes.my_masonry_grid}
          columnClassName={classes.my_masonry_grid_column}
        >
          {filteredYearList.length === 0 ? (
            <div className={classes.nolog}>로그기록이 없습니다 ;(</div>
          ) : null}

          {/* TODO: spinner or lazyLoading */}

          {filteredList.map((p, idx) => {
            if (p.user_info.user_id === user_info?.uid) {
              return <div className={classes.detail} key={p.id}><Post key={p.id} {...p} its_me /></div>;
            } else {
              return <Post key={p.id} {...p} />;
            }
          })}
        </Masonry>
      </InfinityScroll>
      <LogChart filtered={filteredYearList} />
    </>
  );
};

export default PostList;
