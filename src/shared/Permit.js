import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
  const user_info_exist = useSelector((state) => state.user.user);
  const session_key_check = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(session_key_check) ? true : false;

  if (is_session && user_info_exist) {
    return <Fragment>{props.children}</Fragment>;
  }
  return null;
};

export default Permit;
