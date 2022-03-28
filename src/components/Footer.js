import React from "react";
import classes from "./Footer.module.css";
import insta from "../assets/instagram.svg";
import git from "../assets/github-60.svg";
import feedback from "../assets/feedback-100.png";

const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <a href="megan09106@gmail.com">
        <div>
          <p>Website Feedback</p>
          <img alt="" src={feedback} />
        </div>
      </a>
      <a href="megan09106@gmail.com">
        <div>
          <p>Github</p>
          <img alt="" src={git} />
        </div>
      </a>
      <a href="megan09106@gmail.com">
        <div>
          <p>Follow me on instagram</p>
          <img alt="" src={insta} />
        </div>
      </a>
    </div>
  );
};

export default Footer;