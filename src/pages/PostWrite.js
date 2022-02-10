import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as logActions } from "../redux/modules/log";

import classes from "./PostWrite.module.css";
import { Button, Grid } from "../element/index";
import moment from "moment";
import "moment/locale/ko";
import WriteContentPage from "../components/WriteContentPage";

const PostWrite = (props) => {
  const { history } = props;
  const is_login = useSelector((state) => state.user.is_login);
  const [contentList, setContentList] = useState([]);
  const dispatch = useDispatch();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString("ko-KR", { month: "long" });
  const day = date.toLocaleString("ko-KR", { day: "2-digit" });
  const time = moment().format("LT");

  const onSavecontentHandler = (title, content) => {
    setContentList((prevContentList) => {
      return [...prevContentList, { title: title, content: content }];
    });
  };
  console.log(contentList);

  const onSaveHandler = () => {
    // if (
    //   contentList.content.trim().length === 0 &&
    //   contentList.title.trim().length === 0
    // ) {
    //   alert("제목 또는 내용 중 한곳은 적어주세요!");
    // }
    dispatch(logActions.addPostFirebase(contentList));
  };
  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <p className={classes.headline}>앗 잠깐!</p>
        <p className={classes.explain}>로그인 후에만 글을 쓸 수 있어요!</p>
        <Button
          width="80vw"
          margin="auto"
          text="로그인 하러가기"
          _onClick={() => {
            history.replace("/login");
          }}
        />
      </Grid>
    );
  }
  return (
    <Fragment>
      <section className={classes["post-write__header"]}>
        <h1>오늘의 무드 기록하기</h1>
        <div className={classes["post-write__date"]}>
          Today is
          <span className={classes.moment}>
            {" "}
            {year}년 {month} {day} {time}
          </span>
        </div>
      </section>
      <div className={classes["post-write__content"]}>
        <WriteContentPage onAddContent={onSavecontentHandler} />
      </div>
      <Button
        bgColor="#CACACA"
        type="submit"
        _onClick={onSaveHandler}
        className={classes.submitBtn}
      >
        작성하기
      </Button>
      <Button bgColor="#CACACA" className={classes.cancelBtn}>
        취소하기
      </Button>
    </Fragment>
  );
};

export default PostWrite;
