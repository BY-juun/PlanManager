import React, { useEffect, useState } from 'react';
import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import { makeStyles } from '@material-ui/core/styles';
import ScheduleList from '../components/ScheduleList';
import Chip from '@material-ui/core/Chip';
import wrapper from "../store/configureStore";
import { END } from 'redux-saga';
import axios from 'axios';
import {  useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import Router from 'next/router';


const useStyles = makeStyles((theme) => ({
    TodayWrapper : {
      textAlign: "center", 
      marginTop: "30px",
      height : "900px",
    },
  }));

const Today = () => {
    const {User} = useSelector((state)=>state.user); 
    const classes = useStyles();
    const today = new Date();
    const scheduleArr = ["수업듣고 과제하기", "블로그 글 2개 이상 쓰기", "plan Manager Today page 만들기","plan Manager Redux, Saga 구조잡기", "운동하기"];
    const dayinfo = String(today.getFullYear())+ " " + String(today.getMonth()+1)+ " " + String(today.getDate()) ;
    useEffect(()=>{
        if(!User){
            alert("로그인 후 이용가능합니다");
            Router.push('/');
        }
    },[User])
    return(
        <>
            <TopLayout></TopLayout>
            <div className = {classes.TodayWrapper}>
                <h2>오늘의 일정!</h2>
                <Chip label={dayinfo}   color="primary" variant="outlined" />
                {scheduleArr.map((value,index)=>
                    <ScheduleList value = {value} index = {index} key = {index}/>
                )}
            </div>
            <BottomLayout></BottomLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store)=>
async ({req,res}) => {
    //원래 브라우저에서 cookie를 알아서 넣어주는데 , SSR시에는 브라우저 개입을 못하니까 프론트서버에서 헤더에 쿠키를 넣어서 보내줘야 한다.
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie){
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
      type : LOAD_MY_INFO_REQUEST,
    })
    store.dispatch(END);
    await store.sagaTask.toPromise();
  });

export default Today;