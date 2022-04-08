# Mood Log


# 🗂Summary
* 서비스명 : 무드로그 
* 서비스 설명 : 나의 생각과 추억을 다양한 글쓰기 Editing 방식으로 작성하여 재미있게 기록으로 남기고 타인과 소통할수있는 플랫폼입니다

  💁🏻‍♀️ [사이트 바로가기](https://mlog-e2391.web.app)



## 🛠 기술 스텍 및 라이브러리

- 개발언어 : Javascript
- 라이브러리 : React
- 상태관리 :redux , redux-thunk , redux-logger , immer

- 배포 : firebase distribution

- 스타일
styled-component ,
CSS Module

- 라이브러리 & 패키지
antd , 
react-swiper , 
material ui 




## 페이지 구성📖

- 메인
- 로그인
- 마이페이지/프로필 수정
- 로그/작성/수정

## ⛔️ Trouble Shooting & Project Details


> Firebase Auth / Firestore DB 등을 이용해서 회원관리
- 이슈 ) 회원가입 시 Firebase Auth 에서 유효성 검사 규칙을 추가하고 처리해도되지만 프론트단에서 유효성검사 위해 Input값 onChange에 event 함수를 설정하고 이메일, 비밀번호 ,닉네임을 정규표현식에 따라 즉각적으로 문구를 출력하여 유효성검사 실행

> Toast UI editor 이용해서 code Editing 방식 글쓰기 구현
- 이슈 ) Tui editor 와 antd 사용 시 source map parsing error 발생 이유는 react-scripts 버전이 업그레이드 되면서 CRA 5 에서 source maps을 처리하는것에관한 설정이 변경되면서 충돌이 일어난것으로 예상. 유일한 해결책으로 나와있는 package.json 에서 start script를 이하* 처럼 수정 해줬으나 에러는 없어지지 않음. 각 라이브러리에서는 부정확하거나 사라진 source map 이 버전에맞는 업데이트가 필요함(* ”scripts”: { "start": "GENERATE_SOURCEMAP=false react-scripts start", ... },)

- 이슈 ) 글 작성중 이미지 업로드 시 이미지가 base64로 인코딩된 스트링 형태로 자동 변환되어 업로드 됨.  파일로 저장하기 위해서는 이미지가 들어오면 tui editor 의 addImageBlobHook을 이용하여 업로드된 이미지를 캐치하여 콜백함수로 비동기처리하여 Firebase Storage에 저장 후 해당 사진의 url 을 리턴값으로 받아서 에디터에 출력. 이후에 Firestore에 image로 저장 

> 데이터 출력 및 글쓰기 수정 /삭제
- 이슈 ) 수정시 사용자가 이미 있는 이미지 삭제 후 새이미지로 변경시 Storage에 이미 저장된 이미지를 삭제할수없음.  이미지를 비교하여 같은 이미지가 아닐경우 삭제하는 로직이 필요함

> 레이아웃 
- figma를 통해 와이어프레임 작업
- Masonry layout 으로 데이터를 화면에 출력
- Swiper Custom을 통해 메인페이지 배너 작성
- Css 클래스 중첩을 방지하기위해 CSS Module을 주류로 사용. 재사용성이 높은 컴포넌트는 Styled-components로 사용. 추후 SCSS 로 전체 코드 바꿀까 검토했으나 클래스명 중복사용 방지와 css파일과 js파일 분리를 위해 css module로 유지

> Intersection Observer를 통한 무한스크롤 구현
- FirebaseDB에서 데이터 받아올때 비동기방식으로 처리 -> Firebase version 호환성을 위해 promise로 비동기처리했지만 async await 키워드를 사용하여 처리했다면 코드가 간결해지고 에러확인이 더 쉬웠을것으로 예상.
- 이슈 ) DB설계 미스로 전체 data list 중 로그인한 유저의 data만 보려면 불러온 전체 data를 클라이언트 단에서 filter해서 보여줌. 그렇기에 Inifinite Scroll을 사용하여 특정갯수만큼 페이징해서 보려한다면 일정하지않은 data 갯수가 화면에 출력됨. 수정후 redux 미들웨어에서 복합쿼리를 사용하여 Firestore에 저장되어있는 data list 에서 session에 저장되어있는 uid와 로그인한 유저의 uid가 같은 data만 출력하는 것으로 해결.

> 알람 기능 
- Firebase Realtime Database 를 사용하여 다른 사용자가 자신의 게시물에 댓글 작성시 헤더 알람표시

> 메인페이지 랜덤 데이터 출력 
- 버튼 클릭시 지정된 숫자만큼 다음 랜덤 data 불러옴. 불러올 data가 있는지 확인하는 로직을 작성하여 비동기 처리.

> redux (React-redux,redux-thunk) 
- 데이터 전역관리를 위하여 사용. Redux-thunk를 사용함으로써 미들웨어에서 비동기통신 처리해서 firebase DB에서 데이터 가져옴

> Web vitals
- 사용해서 Firebase analytics service로 보냄. 실제 사용자가 사이트를 사용할때 성능이 어느정도 나오는지 확인할수있도록 firebase analytics 서비스로 성능지표를 보내 성능측정


