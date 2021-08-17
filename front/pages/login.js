import React from 'react';
import BottomLayout from '../Components/BottomLayout';
import TopLayout from '../Components/TopLayout';
import LoginForm from '../Components/LoginForm';
const login = () => {
    return(
        <>
            <TopLayout></TopLayout>
            <LoginForm></LoginForm>
            <BottomLayout></BottomLayout>
        </>
    );
};

export default login;