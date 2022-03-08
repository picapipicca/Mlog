//infinityScroll.js using scrollTop

// const { children, callNext, loading, is_next } = props;

// const _handleCallNext = _.throttle(() => {
//   if (loading) {
//     return;
//   }

//   const { innerHeight } = window;
//   const { scrollHeight } = document.body;

//   const scrollTop =
//     (document.documentElement && document.documentElement.scrollTop) ||
//     document.body.scrollTop;

//   if(scrollHeight-innerHeight-scrollTop <200){
//       callNext();
//   }
// }, 300);

// const handleScroll = useCallback(_handleCallNext, [loading]);

// useEffect(() => {
//   if (loading) {
//     return;
//   }

//   if (is_next) {
//     //이벤트 구독
//     window.addEventListener("scrollEvent", handleScroll);
//   } else {
//     window.removeEventListener("scrollEvent", handleScroll);
//   }

//   //클린업
//   return () => window.removeEventListener("scrollEvent", () => {});
// }, [is_next, loading]);

// return <Fragment>{children}</Fragment>;
// };

// InfinityScroll.defaultProps = {
// children: null,

// //다음post의 유무(알아야 callNext 부를건지 말건지 결정함)
// is_next: false,

// //추가로드 버튼이랑 같은기능의 함수실행
// callNext: () => {},

// //아직다음거 안가져왔는데 또 같은걸 부르는일을 방지
// loading: false,
// };