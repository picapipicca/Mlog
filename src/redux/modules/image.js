import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

//actions
//업로드 중인지 아닌지 판별
const UPLOADING = "UPLOADING";
//실제 업로드
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
// const SET_PREVIEW = 'SET_PREVIEW';

//action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
// const setPreview = createAction(SET_PREVIEW,(preview)=>({preview}));

//initialState
const initialState = {
  image_url: "",
  uploading: false,
};

//middleware
const uploadImageFirebase = (fileName, blob, callback) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));

    const _upload = storage
      .ref(`images/${fileName}_${new Date().getTime()}`)
      .put(blob);

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          const image_url = url;
          callback(image_url, "image");
          dispatch(uploadImage(image_url));
        })
        .catch((error) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log(error);
        });
    });
  };
};

//reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    // [SET_PREVIEW]: (state,action) => produce(state,(draft)=>{
    //     draft.preview = action.payload.preview;
    // })
  },
  initialState
);

const actionCreators = {
  uploadImage,
  uploadImageFirebase,
  // setPreview,
};
export { actionCreators };
