import React from 'react';
import BottomLayout from '../Components/BottomLayout';
import TopLayout from '../Components/TopLayout';
import SignUpForm from '../Components/SignUpForm';
const signup = () => {
    return(
        <>
        <TopLayout></TopLayout>
        <SignUpForm></SignUpForm>
        <BottomLayout></BottomLayout>
        </>
    );
};

export default signup;