import React, { Fragment, useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import styled from "styled-components";
import Loading from "react-loading";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  const handleCallNext = _.throttle(() => {
    if (loading) {
      return;
    }
    callNext();
  }, 300);

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
    
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current);
    };
  }, [is_next, loading]);
  return (
    <Fragment>
      {children}
      {is_next && (
        <Loader ref={spinnerRef}>
          <Loading type="spin" color="#A593E0" />
        </Loader>
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
  margin-bottom:10px;
`;
export default InfinityScroll;
