import React from "react";
import styled from "styled-components";

const Bus = (props) => {
  const { className,carNumber, postId, bg, _onClick ,width,height, month,children } = props;

  const styles = { className,bg ,width, height};

  return (
      <BusBtn {...styles} onClick={_onClick}>
        <p>{ carNumber ? carNumber : month+'월' }</p>
        {children}
      </BusBtn>
  );
};
Bus.defaultProps = {
  _onClick: () => {},
  carNumber: false,
  postId: "10",
  bg: false,
  month: false,
};
const BusBtn = styled.div`

max-width: 30vw;
min-width: 10vw;
cursor:pointer;
padding: 10px;
margin: 10px;
${(props) => (props.className ? `className: ${props.className}` : "")};
${(props) => (props.width ? `width: ${props.width};` : "")}
${(props) => (props.height ? `height: ${props.height};` : "")}
${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
font-weight: 700;
color: #093680;
`;

export default Bus;
