import React, { Fragment } from 'react';
import classes from "./PostDetail.module.css";

import Post from '../components/Log/Post';
import CommentList from '../components/Log/CommentList';
import CommentWrite from '../components/Log/CommentWrite';

const PostDetail = (props) => {
    return (
        <Fragment>
            <Post/>
            <CommentWrite/>
            <CommentList/>
        </Fragment>
    );
};

export default PostDetail;