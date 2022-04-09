import React, { Fragment } from "react";

import classes from "./PostDetail.module.css";
import { Image, Grid, Spinner, Button } from "../element/index";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { history } from "../redux/configStore";
import CommentList from "../components/comment/CommentList";
import CommentWrite from "../components/comment/CommentWrite";
import { Viewer } from "@toast-ui/react-editor";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as logActions } from "../redux/modules/log";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostDetail = (props) => {
  const dispatch = useDispatch();

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.log.post_list);
  const id = props.match.params.id;
  const post = post_list.find((p)=>p?.id === id);
  
  const [expanded, setExpanded] = React.useState(false);
  const its_me = post?.user_info.user_id === user_info?.uid ? true : false;
  
  React.useEffect(() => {
    if (post) {
      return;
    }
    
    dispatch(logActions.getOnePostFirebase(id));
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deletePosthandler = async function () {
    if (
      window.confirm(
        "해당 로그를 삭제하시겠습니까?\n삭제된 로그는 복구할 수 없어요 ;( "
      )
    ) {
      dispatch(logActions.deletePostFirebase(id));
    }
  };
  return (
    <Fragment>
      {!post && <Spinner size="200" is_dim type="page" />}
      {post && (
        <div className={classes.wrapper}>
          <div className={classes.wrap}>
            <div className={classes.header}>
              <div className={classes.title}>
                <div>{post.title}</div>
              </div>
            </div>

            <div className={classes["top-header"]}>
        
              <p className={classes.nick}>{post.user_info.user_nick}</p>
              <p className={classes.time}>{post.insert_dt}</p>
              {its_me && (
                <div className={classes.btn__edit}>
                  <Button
                    padding="0"
                    bgColor="transparent"
                    _onClick={() => {
                      history.push(`/write/${post.id}`);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    padding="0"
                    bgColor="transparent"
                    _onClick={deletePosthandler}
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>
            <div className={classes.body}>
              <div className={classes.viewer}>
                <Viewer initialValue={post.content} height="auto" />
              </div>
            </div>
          </div>
          <div className={classes.comment}>
            <Grid width="auto">
              <Grid is_flex>
                <p style={{ margin: "15px 50px" }}>
                  {post.comment_count} 개의 댓글
                </p>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
              </Grid>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <CommentList post_id={id} />
                </CardContent>
              </Collapse>
            </Grid>
          </div>{" "}
        </div>
      )}
      <CommentWrite post_id={id} />
    </Fragment>
  );
};

export default PostDetail;
