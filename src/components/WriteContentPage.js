import React, { Fragment, createRef, useState } from "react";
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

const WriteContentPage = (props) => {
  const editorRef = createRef();
  const [content,setContent] = useState('');
  const [title,setTitle] = useState('');

  // const onChangeEditorTextHandler = () => {
  //   console.log(editorRef.current.getInstance().getMarkdown());
  // };
  const onSaveContentHandler = () => {
   const content_wrote=  editorRef.current.getInstance().getMarkdown();
   setContent(content_wrote);
    console.log(content_wrote);
  };
  const onSaveTitleHandler = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  }
  const onSaveHandler=()=>{
    if(content.trim().length ===0 && title.trim().length === 0){
      alert('제목 또는 내용 중 한곳은 적어주세요!')
      editorRef.current.focus();
    }
    props.onAddContent(title,content);
  }
  return (
    <Fragment>
      <div>
        <div className={classes.headline}>
        <p className={classes.title}>제목</p>
        <Input className={classes.input} _onChanage={onSaveTitleHandler} bottomLined label='제목' placeholder='제목을 입력해주세요'/>
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

        <Button
          bgColor="#CACACA"
          type="submit"
          _onClick={onSaveHandler}
          className={classes.submitBtn}
        >
          작성하기
        </Button>
        <Button bgColor="#CACACA" className={classes.cancelBtn}>
          취소하기
        </Button>
      </div>
      <div>
        <h1>result</h1>
        <textarea readOnly='readOnly' value={content}></textarea>
      </div>
    </Fragment>
  );
};

export default WriteContentPage;
