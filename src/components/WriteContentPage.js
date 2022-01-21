import React, { Fragment,createRef } from "react";
import { Button } from "../element";
import classes from "./WriteContentPage.module.css";
// TOAST UI Editor import
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
//plugin
import Prism from "prismjs";
import "prismjs/themes/prism.css";

//code-syntax-highlight
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

//color-syntax
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';



const WriteContentPage = (props) => {

  const editorRef = createRef();

  const onChangeEditorTextHandler = () => {
    console.log(editorRef.current.getInstance().getMarkdown());
  };

  return (
    <Fragment>
      <textarea type="title" placeholder="제목을 입력하세요" />
      <Editor
        previewStyle="vertical"
        height="79vh"
        initialEditType="markdown"
        initialValue="내용을 입력하세요"
        useCommandShortcut={true}
        ref={editorRef}
        plugins={[colorSyntax,[codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={onChangeEditorTextHandler}
      />
    
      <Button bgColor='#CACACA' type="submit" className={classes.submitBtn}>
        작성하기
      </Button>
      <Button bgColor='#CACACA' className={classes.cancelBtn}>취소하기</Button>
    </Fragment>
  );
};

export default WriteContentPage;
