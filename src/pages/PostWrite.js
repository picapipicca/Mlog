import React, { Fragment, useState, useRef } from "react";
import { storage } from "../shared/firebase";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as logActions } from "../redux/modules/log";
import { actionCreators as imageActions } from "../redux/modules/image";

// TOAST UI Editor import
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
//plugin
import Prism from "prismjs";
import "prismjs/themes/prism.css";

//code-syntax-highlight
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

//color-syntax
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

//chart
import "@toast-ui/chart/dist/toastui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";

import classes from "./PostWrite.module.css";
import { Button, Grid, Input } from "../element/index";
import moment from "moment";
import "moment/locale/ko";

const PostWrite = (props) => {
  const editorRef = useRef();
  const { history } = props;
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.log.post_list);
  const image_url = useSelector((state) => state.image.image_url);
  const dispatch = useDispatch();

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [title, setTitle] = useState(_post ? _post.title : "없어");
  const [content, setContent] = useState(_post ? _post.content : "");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString("ko-KR", { month: "long" });
  const day = date.toLocaleString("ko-KR", { day: "2-digit" });
  const time = moment().format("LT");

  React.useEffect(() => {
    if (is_edit && !_post) {
      alert("로그 정보가 없어요!");
      history.goBack();
      return;
    }
    if (editorRef.current) {
      props.image_url && uploadImage();
    }
  }, [editorRef]);

  const uploadImage = (blob, callback) => {
    const fileName = blob?.name;
    dispatch(imageActions.uploadImageFirebase(fileName, blob, callback));
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const onSaveContenthandler = () => {
    const contentHTML = editorRef.current.getInstance().getHTML();
    setContent(contentHTML);
  };

  const onAddPostHandler = () => {
    const contentHTML = editorRef.current.getInstance().getHTML();
    const content = editorRef.current.getInstance().getMarkdown();
    // const image_url = contentHTML.split("=")[2]?.split('"')[1];
    // const contentMarkdown = editorRef.current.getInstance().getMarkdown();
    // const content = contentMarkdown.replaceAll("#", "").split("!")[0];
    // const content = editorRef.current.getInstance().getHTML();
    dispatch(logActions.addPostFirebase(content, title, image_url));
  };
  const onEditPostHandler = () => {
    const contentHTML = editorRef.current.getInstance().getHTML();
    const content = editorRef.current.getInstance().getMarkdown();

    // const image_url = contentHTML.split("=")[1]?.split('"')[1];
    dispatch(
      logActions.editPostFirebase(post_id, {
        title: title,
        content: content,
        image_url,
      })
    );
  };

  if (!is_login) {
    return (
      <Grid margin="auto" padding="80px" center>
        <p className={classes.headline}>앗 잠깐!</p>
        <p className={classes.explain}>로그인 후에만 글을 쓸 수 있어요!</p>
        <Button
          width="30vw"
          padding='10px'
          margin="30px auto auto auto"
          text="로그인 하러가기"
          _onClick={() => {
            history.replace("/login");
          }}
        />
      </Grid>
    );
  }
  return (
    <Fragment>
      <section className={classes["post-write__header"]}>
        {is_edit ? (
          <h1>오늘의 무드 수정하기</h1>
        ) : (
          <h1>오늘의 무드 기록하기</h1>
        )}
        <div className={classes["post-write__date"]}>
          Today is
          <span className={classes.moment}>
            {" "}
            {year}년 {month} {day} {time}
          </span>
        </div>
      </section>
      <div className={classes["post-write__content"]}>
        <div className={classes.headline}>
          <Input
            value={title}
            className={classes.input}
            _onChange={titleChangeHandler}
            bottomLined
            margin="10px"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <Editor
          height="80vh"
          previewStyle="vertical"
          placeholder="내용을 입력해주세요"
          initialEditType="markdown"
          onChange={onSaveContenthandler}
          initialValue={content}
          useCommandShortcut={true}
          usageStatistics={false}
          ref={editorRef}
          plugins={[
            colorSyntax,
            chart,
            [codeSyntaxHighlight, { highlighter: Prism }],
          ]}
          hooks={{
            addImageBlobHook: uploadImage,
          }}
        />
      </div>
      <div className={classes.btn}>
        <button
          className={classes.cancelBtn}
          onClick={() => {
            history.goBack();
          }}
        >
          CANCEL
        </button>
        {is_edit ? (
          <button
            type="submit"
            onClick={onEditPostHandler}
            className={classes.submitBtn}
          >
            EDIT
          </button>
        ) : (
          <button
            type="submit"
            onClick={onAddPostHandler}
            className={classes.submitBtn}
          >
            WRITE
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default PostWrite;
