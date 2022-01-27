import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { label, type, placeholder,multiLine, _onChange, length, bottomLined } = props;
  const styles = { length };

  const classes = props.className;

  if (multiLine) {
    return (
        <TextareaTag
          rows = {2}
          placeholder={placeholder}
          onChange={_onChange}
        ></TextareaTag>
    );
  }


  if (bottomLined) {
    return (
      <div className={classes}>
        <Underlined
          {...styles}
          type={type}
          // value={value}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </div>
    );
  }
  return (
    <div className={classes}>
      {label && <p margin="0px">{label}</p>}
      <InputTag
        {...styles}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
      />
    </div>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
};

const InputTag = styled.input`
  /* ${(props) => (props.className ? `className: ${props.className};` : "")} */

  /* ${(props) => (props.length ? `maxLength: ${props.length};` : "")} */
  margin: 1rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  border: 1px solid #212121;
  box-sizing: border-box;
  display: block;
  &:focus {
    outline: none;
    border-color: #4f005f;
  }
`;
const Underlined = styled.input`
line-height: 32px;
border: 2px solid #CACACA;
box-sizing :border-box;
margin: 10px;
width: 90vw;
&:focus {
    outline: none;
    border-color: #4f005f;
`;
const TextareaTag = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
