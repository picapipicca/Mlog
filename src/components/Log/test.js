// //infinityScroll.js using scrollTop

// // const { children, callNext, loading, is_next } = props;

// // const _handleCallNext = _.throttle(() => {
// //   if (loading) {
// //     return;
// //   }

// //   const { innerHeight } = window;
// //   const { scrollHeight } = document.body;

// //   const scrollTop =
// //     (document.documentElement && document.documentElement.scrollTop) ||
// //     document.body.scrollTop;

// //   if(scrollHeight-innerHeight-scrollTop <200){
// //       callNext();
// //   }
// // }, 300);

// // const handleScroll = useCallback(_handleCallNext, [loading]);

// // useEffect(() => {
// //   if (loading) {
// //     return;
// //   }

// //   if (is_next) {
// //     //이벤트 구독
// //     window.addEventListener("scrollEvent", handleScroll);
// //   } else {
// //     window.removeEventListener("scrollEvent", handleScroll);
// //   }

// //   //클린업
// //   return () => window.removeEventListener("scrollEvent", () => {});
// // }, [is_next, loading]);

// // return <Fragment>{children}</Fragment>;
// // };

// // InfinityScroll.defaultProps = {
// // children: null,

// // //다음post의 유무(알아야 callNext 부를건지 말건지 결정함)
// // is_next: false,

// // //추가로드 버튼이랑 같은기능의 함수실행
// // callNext: () => {},

// // //아직다음거 안가져왔는데 또 같은걸 부르는일을 방지
// // loading: false,
// // };

// {/* <header className={classes.header}>
// <h1>Mlog</h1>
// <div className={classes["icon-box"]}>
//   <HeaderAlarmButton>
//     <a href="/">
//       <img src={mapIcon} alt="" />
//     </a>
//   </HeaderAlarmButton>
//   <HeaderAlarmButton>
//     <a href="/log">
//       <img src={licenseIcon} alt="" />
//     </a>
//   </HeaderAlarmButton>
//   <HeaderAlarmButton>
//     <a href="/mypage">
//       <img src={mypageIcon} alt="" />
//     </a>
//   </HeaderAlarmButton>
//   <HeaderAlarmButton>
//     <NotiBadge
//       _onClick={() => {
//         history.push("/noti");
//       }}
//     />
//   </HeaderAlarmButton>
//   {/* <HeaderAlarmButton>
//   <a href="/noti"><img src={alarmIcon} alt="" /></a>
//   </HeaderAlarmButton>*/}
// //   <Button margin="auto" width="auto" _onClick={logOut}>
// //     로그아웃
// //   </Button>
// // </div>
// // </header> 

// // @import url("https://fonts.googleapis.com/css2?family=B612+Mono:wght@400;700&family=DM+Serif+Display&family=East+Sea+Dokdo&family=Gowun+Batang:wght@400;700&family=Nanum+Pen+Script&family=Permanent+Marker&family=Playfair+Display:wght@400;500;700;900&display=swap");
// // .wrap {
// //   font-family: "DM Serif Display", serif;
// //   padding: 45px 45px 0px 45px;
// //   margin-bottom: -50px;
// // }
// // .header {
// //   background-color: #000;
// //   border: 1px solid #000;
// //   transition: 0.3s ease all;
// // }

// // @media (min-width: 48em) {
// //   /* 768px */
// //   .wrap .header {
// //     padding: 0.3 rem;
// //   }
// // }

// // .wrap .header__nav ul {
// //   margin: 0px 0px;
// //   padding-left: 0.1px;
// //   display: grid;
// //   gap: 1px;
// //   grid-template-columns: repeat(4, 1fr);
// //   grid-template-rows: repeat(2, 60px);
// // }

// // .wrap .header__nav ul li {
// //   background-color: #fff;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
  
// // }

// // .wrap .header__nav ul li:nth-child(1) {
// //   display: grid;
// //   grid-template-columns: repeat(4,1fr);
// //   grid-template-rows: 40px;
// //   grid-column-start: span 4;
// //   font-size: 32px;
// //   padding: 10px;

// // }
// // .wrap .header__nav ul li:nth-child(1) svg{
// // grid-column: -1;
// // }
// // .wrap .header__nav ul li:nth-child(1) a{
// //   justify-self: center;
// //   grid-column: 2/4;
// //   }
// // .fixed {
// //   grid-column-start: span 1;
// //   padding: 20px;
// //   position: sticky;
// //   top: 1rem;
  
// // }
// a {
//   text-decoration: none;
//   color: #000;
//   box-sizing: border-box;
//   padding: 20px;
// }

// //login/signup header.js
// /* {/* <Grid is_flex padding="4px 10px">
//         <Grid>
//           <h1>Mlog</h1>
//         </Grid>
//         <Grid>
//           <Button
//             width="10vw"
//             height="5vh"
//             bgColor="#72acdb"
//             color="#080538"
//             text="로그인"
//             _onClick={() => {
//               history.push("/login");
//             }}
//           ></Button>
//           <Button
//             width="10vw"
//             bgColor="#2ba677"
//             color="#080538"
//             text="회원가입"
//             _onClick={() => {
//               history.push("/signup");
//             }}
//           ></Button>
//         </Grid>
//       </Grid> */
// //       import React from "react";
// // import { Grid, Button } from "../element/index";
// // import { useSelector, useDispatch } from "react-redux";
// // import { actionCreators as logActions } from "../redux/modules/log";

// // import classes from "./PostList.module.css";
// // import InfinityScroll from "../shared/InfinityScroll";

// // import SelectDateFilter from "../components/selectDate/SelectDateFilter";
// // import Post from "../components/Log/Post";
// // import LogChart from "../components/selectDate/LogChart";
// // import MonthSideBar from "../components/selectDate/MonthSideBar";

// // const PostList = (props) => {
// //   const dispatch = useDispatch();
// //   const { history } = props;

// //   // const { post_list, is_loading, paging } = useSelector((state) => state.log);
// //   const post_list = useSelector((state) => state.log.post_list);
// //   const is_loading = useSelector((state) => state.log.is_loading);
// //   const paging = useSelector((state) => state.log.paging);
// //   const user_info = useSelector((state) => state.user.user);

// //   const [yearFilter, setYearFilter] = React.useState("2022");
// //   const selectYear = (selectedYear) => {
// //     setYearFilter(selectedYear);
// //   };

// //   //년도에 따라 필터
// //   const filteredYearList = post_list.filter((p) => {
// //     return p.insert_dt.split("-")[0] === yearFilter;
// //   });

// //   React.useEffect(() => {
// //     if (post_list.length < 2) {
// //       dispatch(logActions.getPostFirebase());
// //     }
// //   }, []);

// //   const filteredList = filteredYearList ? filteredYearList : post_list;

// //   return (
// //     <>
// //       <Grid>
// //         <SelectDateFilter
// //           selected={yearFilter}
// //           onSelectYearFilter={selectYear}
// //         />
// //       </Grid>

// //       <section className={classes.wrap}>
// //         <InfinityScroll
// //           callNext={() => {
// //             dispatch(logActions.getPostFirebase(paging.next));
// //           }}
// //           is_next={paging.next ? true : false}
// //           loading={is_loading}
// //         >
// //           <div className={classes.display}>
// //             {filteredYearList.length === 0 ? (
// //               <h2 className={classes.none}> 로그 기록이 없습니다! </h2>
// //             ) : null}
// //             {filteredList.map((p, idx) => {
// //               if (p.user_info.user_id === user_info?.uid) {
// //                 return (
// //                   <Grid
// //                     key={p.id}
// //                     _onClick={() => {
// //                       history.push(`/post/${p.id}`);
// //                     }}
// //                   >
// //                     {" "}
// //                     <Post key={p.id} {…p} its_me />{" "}
// //                   </Grid>
// //                 );
// //               } else {
// //                 return (
// //                   <Grid
// //                     key={p.id}
// //                     _onClick={() => {
// //                       history.push(`/post/${p.id}`);
// //                     }}
// //                   >
// //                     <Post key={p.id} {…p} />;
// //                   </Grid>
// //                 );
// //               }
// //             })}
// //           </div>
// //         </InfinityScroll>
// //           {/* <div className={classes.stickybox}>
// //             <MonthSideBar month={filteredYearList} />
// //           </div> */}
// //       </section>
// //       <LogChart filtered={filteredYearList} />
// //     </>
// //   );
// // };

// // export default PostList;
// import * as React from 'react';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
   
//   );
// }

// <div className={classes.wrap}>
// <div className={classes["top-header"]}>
//   <Image circle src={props.user_info.user_profile} />
//   <p>{props.user_info.user_nick}</p>
//   {props.its_me && (
//     <button
//       className={classes["btn-edit"]}
//       onClick={() => {
//         history.push(`/write/${props.id}`);}}>
//           수정</button>)}
// </div>

// <div className={classes.header}>
//   <div className={classes["header-is-closed"]}>
//     <div> 로그기록 : {props.title}</div>
//   </div>
// </div>

// <div className={classes.body}>
//   <div className={classes.viewer}>
//     <Viewer initialValue={props.content} height="auto" />
//   </div>

//   <div className={classes["body-footer"]}>
//     <hr style={{ opacity: "0.8", borderColor: "#EF5A31" }} />
//     <Grid is_flex width="auto">
//       <p style={{ margin: "0px 10px 0px 0px" }}>{props.insert_dt}</p>
//       <p style={{ margin: "0px" }}>댓글 {props.comment_count}개</p>
//     </Grid>
//   </div>
// </div>
// </div>




// <Fragment>
// {!post && <Spinner size='200' is_dim type='page'/>}
// {post && (
// <div>
//   <div className={classes.wrap}>
//     <div className={classes["top-header"]}>
//       <Image circle src={post.user_info.user_profile} />
//       <p>{post.user_info.user_nick}</p>
//       <p className={classes["time"]}>{post.insert_dt}</p>
//       {its_me && (
//         <button
//           className={classes["btn-edit"]}
//           onClick={() => {
//             history.push(`/write/${props.id}`);
//           }}
//         >
//           수정
//         </button>
//       )}
//     </div>

//     <div className={classes.header}>
//       <div className={classes["header-is-closed"]}>
//         <div> 로그기록 : {post.title}</div>
//       </div>
//     </div>

//     <div className={classes.body}>
//       <div className={classes.viewer}>
//         <Viewer initialValue={post.content} height="auto" />
//       </div>
//     </div>
//   </div>
//   <div className={classes["body-footer"]}>
//     <Grid width="auto">
//       <p style={{ margin: "15px 80px" }}>댓글 {post.comment_count}개</p>
//       <hr
//         style={{
//           opacity: "0.8",
//           borderColor: "#CACACA",
//           width: "80vw",
//           margin: "0 80px",
//         }}
//       />
//     </Grid>
//   </div>{" "}
// </div>
// )}
// <Permit>
// <CommentWrite post_id={id} />
// </Permit>
// <CommentList post_id={id} />
// </Fragment>