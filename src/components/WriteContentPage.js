import React, { Fragment, createRef, useState,useEffect } from "react";
import { Button,Input } from "../element";
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
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
// lodash 부르기
import _ from "lodash"; 

const WriteContentPage = (props) => {
  const editorRef = createRef();
  const [content,setContent] = useState('');
  const [title,setTitle] = useState('');

  // const onChangeEditorTextHandler = () => {
  //   console.log(editorRef.current.getInstance().getMarkdown());
  // };
  const debounce = _.debounce((k)=> console.log('디바운스! :::', k),2000);
  const keyPress = React.useCallback(debounce,[]);

  useEffect(()=>{
    props.onAddContent(title,content);
  },[title,content])

  const onSaveTitleHandler = (e) => {
    const d_title = keyPress(e.target.value);
    setTitle(d_title);
    console.log(d_title);
  }
  const onSaveContentHandler = () => {
   const content_wrote=  editorRef.current.getInstance().getMarkdown();
   const d_content = keyPress(content_wrote);
   setContent(d_content);
  };



  return (
    <Fragment>
      <div>
        <div className={classes.headline}>
        <p className={classes.title}>제목</p>
        <Input className={classes.input} _onChange ={onSaveTitleHandler} bottomLined  placeholder='제목을 입력해주세요'/>
        </div>
        <Editor
          previewStyle="vertical"
          height="79vh"
          initialEditType="markdown"
          initialValue="내용을 입력하세요"
          useCommandShortcut={true}
          ref={editorRef}
          plugins={[colorSyntax,chart, [codeSyntaxHighlight, { highlighter: Prism }]]}
          onChange={onSaveContentHandler}
        />
      </div>
    </Fragment>
    
  );
};

export default WriteContentPage;
