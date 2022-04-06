import React from "react";
import classes from "./Post.module.css";
import { Grid,Button } from "../../element/index";
import { history } from "../../redux/configStore";
import { Viewer } from "@toast-ui/react-editor";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
// import { grey, red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu } from "@mui/material";

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

const Post = React.memo((props) => {
  const [expanded, setExpanded] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // const handleClick = (e) => {
  //   setAnchorEl(e.target.value);
  // };
  // const handleClose =()=>{
  //   setAnchorEl(null);
  // }
  // const open = Boolean(anchorEl);

  return (
    <div className={classes.wrap}>
      <Card sx={{ maxWidth: 345, gridAutoRows: "auto" }}>
      {/* <Menu
        anchorEl={anchorEl} 
        keepMounted onClose={handleClose} 
        open={open}>
          <Button text='삭제' _onClick={handleClose}/>
      </Menu> */}
        <CardHeader
        //   action={
        //     <IconButton 
        //     aria-label="more"
        // onClick={handleClick}
        // aria-haspopup="true"
        // aria-controls="long-menu">
        //       <MoreVertIcon />
        //     </IconButton>
            
        //   }
          titleTypographyProps={{
            fontSize: 18,
            fontFamily: "Monospace"
          }}
          subheaderTypographyProps={{
            fontSize: 13,
          }}
          title={props.title}
          subheader={props.insert_dt}
        />
       
        {props.image_url ? (
          <>
          <Grid
            _onClick={() => {
              history.push(`/post/${props.id}`);
            }}
          >
            <CardMedia
              component="img"
              height="194"
              image={props.image_url}
              alt="img"
            />
          </Grid> 
           <CardActions disableSpacing>
            <p className={classes.comment}>댓글 {props.comment_count}개</p>
            {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton> */}
            {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          </>
        ) : (
          <>
          <Grid
            className={classes.list__content}
            padding="0 20px"
            _onClick={() => {
              history.push(`/post/${props.id}`);
            }}
          >
            <div className={classes.viewer}>
              <Viewer initialValue={props.content} height='25vh'/>
            </div>
            
          </Grid>
           <CardActions disableSpacing>
           <p className={classes.comment}>댓글 {props.comment_count}개</p>
         </CardActions>
         </>
        )}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Viewer initialValue={props.content} height="auto" />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
});

Post.defaultProps = {
  user_info: {
    user_email: "coding@coding.com",
    user_nick: "king",
    user_profile:
      "https://media.istockphoto.com/photos/the-brown-bear-welcomes-picture-id98124449?k=20&m=98124449&s=612x612&w=0&h=WNTknidAVp6o-mhURA46_K1LGKVb7BXtyrXw31Ks7iY=",
  },
  image_url: "",
  content: "안녕하세요 좋은하루되세요! 푸항항",
  comment_count: 10,
  insert_dt: "2021-02-27 10:00:00",
  its_me: false,
};
export default Post;
