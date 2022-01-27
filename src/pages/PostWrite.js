import React, { Fragment,useState } from 'react';
import classes from "./PostWrite.module.css";
import moment from 'moment';
import 'moment/locale/ko';
import WriteContentPage from '../components/WriteContentPage';


const PostWrite = (props) => {
    const [contentList,setContentList]=useState([]);
    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString('ko-KR',{month:"long"})
    const day = date.toLocaleString('ko-KR',{day:"2-digit"})
    const time = moment().format('LT')

    const onSavecontentHandler=(title,content)=>{
        setContentList((prevContentList)=> {
            return [...prevContentList,{title:title,content:content,id:Math.random().toString()},];
        });
    };
    return (
        
        <Fragment>
            <section className={classes['post-write__header']}>
                <h1>오늘의 무드 기록하기</h1>
                <div className={classes['post-write__date']}>
                    Today is
                    <span className={classes.moment}> {year}년 {month} {day} {time}</span> 
                </div>
            </section>
            <div className={classes['post-write__content']}>
             <WriteContentPage onAddContent={onSavecontentHandler}/>
            </div>
        </Fragment>
      
    );
};

export default PostWrite;