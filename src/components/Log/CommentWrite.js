import React, { Fragment } from 'react';
import {Input,Button,Grid} from "../../element/index";

const CommentWrite = (props) => {
    return (
        <Fragment>
            <Grid padding='0 80px' is_flex>
                <Input plcaholder='댓글을 작성해주세요'/>
                <Button width='60px' margin='0 10px'>작성</Button>
            </Grid>
        </Fragment>
    );
};

export default CommentWrite;