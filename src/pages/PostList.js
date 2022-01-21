import React from "react";
import { Fragment } from "react";
import Bus from "../components/Bus";

const PostList = (props) => {
  return (
    <Fragment>
      <section>
        <h1>차고지</h1>
        <div>
            <Bus month={8}/>
        </div>
      </section>
    </Fragment>
  );
};

export default PostList;
