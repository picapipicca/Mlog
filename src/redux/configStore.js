import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Log from "./modules/log";
import Image from "./modules/image";
import Comment from "./modules/comment";
// import Image from "./modules/image";

//history 객체 만들기
export const history = createBrowserHistory();

//root reducer 만들기 ( 라우터와 히스토리 연결시켜주기 -> 그럼 이제 스토어에 브라우저 히스토리가 다 저장된다)
const rootReducer = combineReducers({
  comment: Comment,
  user: User,
  log:Log,
  image:Image,
  router: connectRouter(history),
//   image : Image,
});

//미들웨어 준비
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

//크롬 확장 프로그램, redux devTools도 사용 설정하기
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

    //미들웨어 묶기 ( composeEnhancer 사용해서 (applymiddleware로 지금까지 있었던 모든미들웨어들을 사용한다고 설정해주고) 묶어준다)
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));

    //미들웨어하고 루트 리듀서를 엮어서 스토어를 만든다!
    let store = (initialStore) => createStore(rootReducer, enhancer);

    export default store();