import React from 'react';
import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';

const Today = () => {
    return(
        <>
            <TopLayout></TopLayout>
            <div>
                아직 오늘 계획이없습니다.
            </div>
            <BottomLayout></BottomLayout>
        </>
    );
};

export default Today;