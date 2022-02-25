import React, { Fragment } from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { size,circle,is_flex, width, margin, padding, bg, children, center, _onClick } =
    props;

  const styles = {
    is_flex: is_flex,
    margin: margin,
    width: width,
    padding: padding,
    bg: bg,
    center: center,
    size,
  };
  if (circle) {
      return(
          <Fragment>
      <Circle {...styles} onClick={_onClick}>
        {children}
      </Circle>
    </Fragment>
      );
  }
  return (
    <Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  size:36,
};
const Circle = styled.div`
 text-align: center;
 ${(props) => (props.bg ? `background: radial-gradient(white,${props.bg});` : "")}
  /* background: radial-gradient(white, green); */
  --size: ${(props)=> props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  font-weight: 700;
`;
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding : ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin : ${props.margin};` : "")}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""}
    ${(props) => (props.center ? `text-align : center;` : "")}
`;

export default Grid;
