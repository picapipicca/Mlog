import React from "react";
import styled from "styled-components";

const Bus = (props) => {
  const { carNumber, postId, bg, _onClick ,width,height, month } = props;

  const styles = { bg ,width, height};

  return (
      <BusBtn {...styles} onClick={_onClick}>
        <p>{props.carNumber? props.carNumber : props.month}</p>
      </BusBtn>
  );
};
Bus.defaultProps = {
  _onClick: () => {},
  carNumber: "sexy kingkong",
  postId: "10",
  bg: "#CACACA",
  month: '8월',
};
const BusBtn = styled.div`

max-width: 30vw;
min-width: 10vw;
cursor:pointer;
padding: 10px;
margin: 10px;
${(props) => (props.width ? `width: ${props.width};` : "")}
${(props) => (props.height ? `height: ${props.height};` : "")}
${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
font-weight: 700;
color: #093680;
`;

export default Bus;
