import React, { Fragment, useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import styled from "styled-components";
// import HashLoader from "react-spinners/HashLoader";
import Loading from 'react-loading';

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  const handleCallNext = _.throttle(() => {
    if (loading) {
      return;
    }
    callNext();
  }, 1000);

  const spinnerRef = useRef(null);

  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      handleCallNext();
    }
  });

  useEffect(() => {
    if (!is_next) return;
    if (!spinnerRef.current) return;

    handleObserver.observe(spinnerRef.current);

    return () => {
      // return () => handleObserver && handleObserver.disconnect();
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current);
    };
  }, [is_next]);
  return (
    <Fragment>
      {children}
      {is_next && (
        <h2>로딩</h2>
        // <Loader ref={spinnerRef}>
        //   <Loading type='spin' color='#A593E0'/>
        // </Loader>
      )}
    </Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};
const Loader = styled.div`
   width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
export default InfinityScroll;