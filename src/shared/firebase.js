import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";


//firebase config 변수 만들기

const firebaseConfig = {
    apiKey: "AIzaSyAgDpkdfNlZ2JFPE20rRMGthWBneIkuA2k",
    authDomain: "mlog-e2391.firebaseapp.com",
    projectId: "mlog-e2391",
    storageBucket: "mlog-e2391.appspot.com",
    messagingSenderId: "566022008311",
    appId: "1:566022008311:web:eb50b760f94e78f13d12f2",
    measurementId: "G-PM4FR3YR9L"
  };
//초기화해주기
  firebase.initializeApp(firebaseConfig);
  
  const apiKey = firebaseConfig.apiKey;
  const auth = firebase.auth();
  const firestore= firebase.firestore();

  export {auth,apiKey,firestore};