import React, { Fragment, createRef, useState, useEffect } from "react";
import { Button, Input } from "../element";
import classes from "./WriteContentPage.module.css";
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
// lodash 부르기
import _ from "lodash";

const WriteContentPage = (props) => {
  const editorRef = createRef();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");

  const debounce = _.debounce((e) => {
    console.log('debounce :::',e.target.value);}, 1000);
  const keyPress = React.useCallback(debounce, []);

  useEffect(() => {
    props.onAddContent(title, content,imageURL);
  }, []);

  const onChangeTitle = (e) => {
    keyPress(e);
    setTitle(e.target.value);
    
  };

  const onSaveContentHandler = () => {
    const contentHTML = editorRef.current.getInstance().getHTML();
    const contentMarkdown = editorRef.current.getInstance().getMarkdown();
    const imageUrl = contentHTML.split("=")[1]?.split('"')[1];
    const content_wrote = contentMarkdown.replaceAll("#", "").split("!")[0];
    console.log(content_wrote);
  
    //  const d_content = keyPress(content_wrote);
    keyPress(content_wrote);
    setContent(content_wrote);
    setImageURL(imageUrl);
  };

  return (
    <Fragment>
      <div>
        <div className={classes.headline}>
          <p className={classes.title}>제목</p>
          <Input
            className={classes.input}
            _onChange={onChangeTitle}
            bottomLined
            
            placeholder="제목을 입력해주세요"
          />
        </div>
        <Editor
          previewStyle="vertical"
          height="79vh"
          initialEditType="markdown"
          initialValue="내용을 입력하세요"
          useCommandShortcut={true}
          ref={editorRef}
          plugins={[
            colorSyntax,
            chart,
            [codeSyntaxHighlight, { highlighter: Prism }],
          ]}
          onChange={onSaveContentHandler}
        />
      </div>
    </Fragment>
  );
};

export default WriteContentPage;
