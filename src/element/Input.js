import React, { Fragment } from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    width,
    label,
    type,
    placeholder,
    multiLine,
    _onChange,
    length,
    bottomLined,
    value,
    is_submit,
  } = props;
  const styles = { length, width };

  const classes = props.className;

  if (multiLine) {
    return (
      <Fragment>
        {is_submit ? (
          <TextareaTag
            value={value}
            rows={2}
            placeholder={placeholder}
            onChange={_onChange}
          ></TextareaTag>
        ) : (
          <TextareaTag
            rows={2}
            placeholder={placeholder}
            onChange={_onChange}
          ></TextareaTag>
        )}
      </Fragment>
    );
  }

  if (bottomLined) {
    return (
      <div className={classes}>
        {label && <p margin="0px">{label}</p>}
      {is_submit?   <Underlined
          {...styles}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        />:  <Underlined
        {...styles}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
      />}
      </div>
    );
  }
  return (
    <div className={classes}>
      {label && <p margin="0px">{label}</p>}
     {is_submit?  <InputTag
        {...styles}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={_onChange}
      />:  <InputTag
      {...styles}
      type={type}
      placeholder={placeholder}
      onChange={_onChange}
    /> }
    </div>
  );
};

Input.defaultProps = {
  multiLine: false,
  bottomLined: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  // className:false,
  is_submit:false,
  _onChange: () => {},
};

const InputTag = styled.input`
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  /* ${(props) => (props.length ? `maxLength: ${props.length};` : "")} */
  margin: 1rem auto;
  padding: 1rem;
  width: ${(props) => props.width};
  /* max-width: 40rem; */
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
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
