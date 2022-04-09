import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, realtime } from "../../shared/firebase";
import "moment";
import moment from "moment";

import firebase from "firebase/compat/app";

import { actionCreators as logActions } from "./log";

//action type
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

//action creator
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => is_loading);

//initialState
const initialState = {
  list: {},
  is_loading: false,
};

const getCommentFirebase = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    const commentDB = firestore.collection("comment");
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setComment(post_id, list));
      })
      .catch((error) => {
        console.log("댓글을 가져올수가 없습니다!", error);
      });
  };
};

//받아오는 content = comment_txt
const addCommentFirebase = (post_id, content) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user; //이댓글 누가적었어

    //comment 정보데이터
    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_profile: user_info.user_profile,
      user_nick: user_info.user_nick,
      content: content,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    //firestore에 저장
    commentDB.add(comment).then((doc) => {
      const postDB = firestore.collection("post");

      const post = getState().log.post_list.find((list) => list.id === post_id);

      //저장에 성공할경우 post collection 의 comment_count 에 +1 업데이트
      const increment = firebase.firestore.FieldValue.increment(1);

      comment = { ...comment, id: doc.id };

      postDB
        .doc(post_id)
        .update({ comment_count: increment })
        .then((_post) => {
          //업데이트 성공할시 comment redux에 추가
          dispatch(addComment(post_id, comment));

          //post가 있는 경우, post 하나에 대한 댓글갯수 리덕스 수정
          if (post) {
            dispatch(
              logActions.editPost(post_id, {
                comment_count: parseInt(post.comment_count) + 1,
              })
            );
            const noti_item = realtime
              .ref(`noti/${post.user_info.user_id}/list`)
              .push();
            noti_item.set(
              { post_title: post.title,
                post_id: post.id,
                user_nick: comment.user_nick,
                image_url: post.image_url,
                insert_dt: comment.insert_dt,
              },
              (err) => {
                if (err) {
                  console.log("알림 저장에 실패했어요!");
                }else{
                  const notiDB = realtime.ref(`noti/${post.user_info.user_id}`)
                  notiDB.update({read:false});
                }
              }
            );

            
          }
        });
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

//action creator export

const actionCreators = {
  setComment,
  addComment,
  getCommentFirebase,
  addCommentFirebase,
};

export { actionCreators };
