import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

//action type
const SET_POST = "SET_POST"; //목록 가지고와서 리덕스에 넣어주는애
const ADD_POST = "ADD_POST"; //이미있는 리덕스 데이터에 하나 추가하기
const EDIT_POST = 'EDIT_POST';

//action creator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST,(post_id,post)=>({post_id,post,}));

//initialState(기본상태값) : 배열 (포스트목록)

//이 reducer가 사용할 initialState
const initialState = {
  post_list: [],
};
//Post 하나에 기본적으로 들어가있어야 할 initialState
const initialPost = {
  //user정보는 user 안에있다
  // id: 0,
  // user_info: {
  //   user_nick: "sexyking_kong",
  //   user_profile:
  //     "https://media.comicbook.com/uploads1/2015/02/insideout-123439.jpg",
  // },
  image_url:
    "https://media.comicbook.com/uploads1/2015/02/insideout-123439.jpg",
  title:'안녕',
  content: "우울이 인사이드아웃에 나와용 내기분이그래",
  comment_count: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  // insert_dt: "2021-02-27 10:00:00",
};

const editPostFirebase = (post_id=null, post={})=> {
  return function(dispatch,getState,{history}) {
    if (!post_id){
      console.log('게시물 정보가 없어요!')
      return;
    }
    const post_index = getState().log.post_list.findIndex((p)=> p.id === post_id);
    const post = getState().log.post_list[post_index];
    console.log(post);

    const postDB = firestore.collection('post');
    
  }
}
const addPostFirebase = (title='',content='',image_url='') => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const getUserInfo = getState().user.user;
    const user_info = {
      user_email: getUserInfo.email,
      user_id: getUserInfo.uid,
      user_profile: getUserInfo.user_profile,
    };

    const _post = {
      ...initialPost,
      title: title,
      content: content,
      image_url:image_url,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    postDB.add({...user_info,..._post}).then((doc)=>{
      let post = {user_info,..._post,id:doc.id}
      dispatch(addPost(post));
      history.replace('/log');
    }).catch((err)=>{
      console.log('포스트 작성에 실패헸어요!',err);
    });
  };
};

//post가지고오기
const getPostFirebase = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach((d) => {
        let all_data = d.data();

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

        // let all_data = {id:d.id,...d.data()};
        // let post ={
        //   id: d.id,
        //   user_info:{
        //     user_nick:all_data.user_nick,
        //     user_profile:all_data.user_profile,
        //     user_email : all_data.email,
        //   },
        //   comment_count:all_data.comment_count,
        //   image_url: all_data.image_url,
        //   content : all_data.content,
        //   insert_dt: all_data.insert_dt,
        // };
        // post_list.push(post);
      });
      console.log(post_list);

      dispatch(setPost(post_list));
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.post_list.unshift(action.payload.post);
    }),
    [EDIT_POST]: (state,action) =>produce(state,(draft)=> {
      let index= draft.post_list.findIndex((p)=>p.id === action.payload.post_id);
      draft.post_list[index] = {...draft.post_list[index],...action.payload.post};
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

};

export { actionCreators };
