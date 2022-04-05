import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    _disabled,
    radius,
    bgColor,
    opacity,
    color,
    className,
    // smallBtn,
    floatBtn,
  } = props;

  const styles = {
    margin,
    width,
    padding,
    _disabled,
    radius,
    bgColor,
    opacity,
    color,
    className,
  };

  // if (smallBtn) {
  //   return (
  //     <SmallBtn {...styles} onClick={_onClick}>
  //       {text ? text : children}
  //     </SmallBtn>
  //   );
  // }
  if (floatBtn) {
    return (
      <FloatButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </FloatButton>
    );
  }

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} disabled={_disabled}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  margin: false,
  width: "100%",
  children: null,
  _onClick: () => {},
  _disabled: false,
};
const ElButton = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props._disabled ? `background-color: #fc4e5d` : "")};
  position: ${(props) => (props.position ? `${props.position}` : "")};
  background-color: ${(props) => (props.bgColor ? `${props.bgColor}` : "")};
  color: ${(props) => (props.color ? `${props.color}` : "")};
  ${(props) => (props.className ? `className: ${props.className}` : "")};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
// const SmallBtn = styled.button`
//   color: white;
//   background: orange;
//   font-weight: 800;
//   width: 4.5em;
//   margin-right: 1em;
//   border: none;
//   border-radius: 5px;
// `;

const FloatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 30px;
  width: 60px;
  height: 60px;
  background: orange;
  opacity: 0.7;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export default Button;
