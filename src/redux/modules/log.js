import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

//action type
const SET_POST = "SET_POST"; //목록 가지고와서 리덕스에 넣어주는애
const ADD_POST = "ADD_POST"; //이미있는 리덕스 데이터에 하나 추가하기

//action creator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//initialState(기본상태값) : 배열 (포스트목록)

//이 reducer가 사용할 initialState
const initialState = {
  post_list: [],
};
//Post 하나에 기본적으로 들어가있어야 할 initialState
const initialPost = {
  id: 0,
  user_info: {
    user_nick: "sexyking_kong",
    user_profile:
      "https://media.comicbook.com/uploads1/2015/02/insideout-123439.jpg",
  },
  content: "우울이 인사이드아웃에 나와용 내기분이그래",
  comment_count: 10,
  insert_dt: "2021-02-27 10:00:00",
};

//post가지고오기
const getPostFirebase = ()=>{
  return function(dispatch,getState,{history}){
    const postDB = firestore.collection('post');
    postDB.get().then((docs)=>{
      docs.forEach((doc)=>{
        console.log(doc.id,doc.data());
      })
    })
  }
}

//reducer
export default handleActions({
    [SET_POST]:(state,action)=> produce(state,(draft)=>{
         
    }),
    [ADD_POST]:(state,action) => produce(state,(draft)=>{

    }),
},initialState);

//action creator(액션생성자) export
const actionCreators ={
    setPost,
    addPost,
    getPostFirebase,
};

export {actionCreators};