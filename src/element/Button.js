import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children , type , _onClick } = props;

  return (
    <Btn
      type={type}
      onClick={_onClick}
    >
      {children}
    </Btn>
  );
};

Button.defaultProps ={
    type : "button",
    _onClick: () => {},
}
const Btn = styled.button `
    border: 1px solid #4f005f;
    background: #CACACA;
    color: #212121;
    padding: 0.25rem 1rem;
    cursor: pointer;
    margin: 10px auto;
    ${(props) => (props.className ? `className: ${props.className};` : "")}

  &:hover {
    background: #741188;
    border-color: #741188;
  }
  &:active {
    background: #741188;
    border-color: #741188;
  }
  
  &:focus {
    outline: none;
  }
`;
export default Button;