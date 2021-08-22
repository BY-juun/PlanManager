import React, { useState } from 'react';
import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import styled from 'styled-components';
import ScheduleList from '../components/ScheduleList';
import Chip from '@material-ui/core/Chip';

const TodayWrapper = styled.div`
    text-align : center;
    margin-top : 30px;
    height : 900px;
`;

const Today = () => {
    const today = new Date();
    const scheduleArr = ["수업듣고 과제하기", "블로그 글 2개 이상 쓰기", "plan Manager Today page 만들기","plan Manager Redux, Saga 구조잡기", "운동하기"];
    const dayinfo = String(today.getFullYear())+ " " + String(today.getMonth()+1)+ " " + String(today.getDate()) ;
    return(
        <>
            <TopLayout></TopLayout>
            <TodayWrapper>
                <h2>오늘의 일정!</h2>
                <Chip label={dayinfo}   color="primary" variant="outlined" />
                {scheduleArr.map((value,index)=>
                    <ScheduleList value = {value} index = {index} key = {index}/>
                )}
            </TodayWrapper>
            <BottomLayout></BottomLayout>
        </>
    );
};

export default Today;