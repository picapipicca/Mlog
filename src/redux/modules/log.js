import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import "moment/locale/ko";


//action type
const SET_POST = "SET_POST"; //목록 가지고와서 리덕스에 넣어주는애
const ADD_POST = "ADD_POST"; //이미있는 리덕스 데이터에 하나 추가하기
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

//action creator
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//initialState(기본상태값) : 배열 (포스트목록)

//이 reducer가 사용할 initialState
const initialState = {
  post_list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};
//Post 하나에 기본적으로 들어가있어야 할 initialState
const initialPost = {
  image_url:
    "https://media.comicbook.com/uploads1/2015/02/insideout-123439.jpg",
  title: "내용",
  content: "제목",
  comment_count: 0,
  insert_dt: moment().format("YYYY-MM-DD a hh:mm "),
};

const editPostFirebase = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없네요!");
      return;
    }
    const _image = getState().image.image_url;

    const _post_idx = getState().log.post_list.findIndex(
      (p) => p.id === post_id
    );
    const _post = getState().log.post_list[_post_idx];
    console.log(_post);

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));

          history.replace("/list");
        });
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .put(_image, "data_url");
      _upload
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              return url;
            })
            .then((url) => {
              postDB
                .doc(post_id)
                .update({ ...post, image_url: url })
                .then((doc) => {
                  dispatch(editPost(post_id, { ...post, image_url: url }));

                  history.replace("/list");
                });
            })
            .catch((err) => {
              window.alert("이미지 업로드에 문제가 있습니다!");
              console.log("이미지 업로드에 문제가 있습니다!", err);
            });
        })
        .catch((err) => {
          console.log("포스트 작성에 실패헸어요!", err);
        });
    }
  };
};
const addPostFirebase = (content = "", title = "", image_url = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;
    const user_info = {
      user_nick:_user.user_nick,
      user_email: _user.email,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      content: content,
      title: title,
      image_url: image_url,
      insert_dt: moment().format("YYYY-MM-DD a hh:mm"),
    };

    postDB
      .add({ ...user_info, ..._post })
      .then((doc) => {
        let post = { user_info, ..._post, id: doc.id };
        dispatch(addPost(post));
        history.replace("/list");
      })
      .catch((err) => {
        console.log("포스트 작성에 실패헸어요!", err);
      });
  };
};

//post가지고오기
const getPostFirebase = (start = null, size = 9) => {
  return function (dispatch, getState, { history }) {

    let _paging = getState().log.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((d) => {
          let all_data = d.data();

          //['comment_count','contents', ..]
          let post = Object.keys(all_data).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: all_data[cur] },
                };
              }
              return { ...acc, [cur]: all_data[cur] };
            },
            { id: d.id, user_info: {} }
          );
          post_list.push(post);
        });
        //4개 넘어 갔으니까 마지막꺼 하나 없애기
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

//post 1개 가지고오기
const getOnePostFirebase = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc);
        // console.log(doc.data());

        let all_data = doc.data();
        let post = Object.keys(all_data).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: all_data[cur] },
              };
            }
            return { ...acc, [cur]: all_data[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        dispatch(setPost([post]));
      });
  };
};
//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(...action.payload.post_list);

        draft.post_list = draft.post_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        draft.is_loading = false;
        draft.paging = action.payload.paging;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.id === action.payload.post_id
        );

        draft.post_list[idx] = {
          ...draft.post_list[idx],
          ...action.payload.post,
        };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

//action creator(액션생성자) export
const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFirebase,
  addPostFirebase,
  editPostFirebase,
  getOnePostFirebase,
};

export { actionCreators };
