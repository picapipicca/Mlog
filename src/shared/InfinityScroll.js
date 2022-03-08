import React, { Fragment, useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  const handleCallNext = _.throttle(() => {
    callNext();
  }, 300);

  const spinnerRef = useRef(null);

  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      handleCallNext();
    }
  });

  useEffect(() => {
      if(!is_next)return;
      if(!spinnerRef.current)return;

    handleObserver.observe(spinnerRef.current)
   return ()=> {spinnerRef.current && handleObserver.unobserve(spinnerRef.current)} 
  }, [is_next]);
  return (
    <Fragment>
        {children}
        {is_next && 
        <Spinner ref={spinnerRef}>
            <HashLoader color="rgba(202, 142, 241, 100)" size={50}/>
        </Spinner>}
    </Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};
const Spinner = styled.div`
  text-align: center;
  padding: 20px 0 40px 0;
`
export default InfinityScroll;
