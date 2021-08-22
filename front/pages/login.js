import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useInput from '../hooks/useInput';
import React, { useCallback, useEffect } from 'react';
import { RiKakaoTalkLine } from 'react-icons/ri';
import { AiOutlineFacebook } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOG_IN_REQUEST } from '../reducers/user';

const login = () => {
    const [email, onChangeEmail,setEmail] = useInput('');
    const [password, onChangePassword,setPassword] = useInput('');
    const dispatch = useDispatch();
    const {User, logInDone, logInError} = useSelector((state)=>state.user); 
    const nickname = User?.nickname;
    useEffect(()=>{
        if(logInError)
        {
            alert(logInError);
            setEmail('');
            setPassword('');
        }
    },[logInError]);

    useEffect(()=>{
        if(logInDone)
        {
            alert("환영합니다!" + nickname);
            setTimeout(()=>{
                Router.push('/');
            },1000)
        }
    },[logInDone]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        return dispatch({
            type : LOG_IN_REQUEST,
            data : {
                email,password
            }
        })
    }, [email, password])

    return (
        <>
            <TopLayout></TopLayout>
            <div style={{ textAlign: "center", marginTop: "120px" }}>
                <form onSubmit={onSubmitForm}>
                    <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <TextField label="Email" value={email} onChange={onChangeEmail} style={{ width: "200px" }}></TextField>
                    </div>
                    <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <TextField label="Password" type="password" value={password} onChange={onChangePassword} style={{ width: "200px" }}></TextField>
                    </div>
                    <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <Button variant="outlined" size="medium" color="primary" type="submit" style={{ width: "200px" }}>
                            Login
                        </Button>
                    </div>
                </form>
                <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <Button variant="outlined" size="medium" color="primary" type="submit" style={{ width: "200px" }} startIcon={<RiKakaoTalkLine />}>
                        카카오톡 로그인
                    </Button>
                </div>
                <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <Button variant="outlined" size="medium" color="primary" type="submit" style={{ width: "200px" }} startIcon={<AiOutlineFacebook />}>
                        페이스북 로그인
                    </Button>
                </div>
            </div>
            <BottomLayout></BottomLayout>
        </>
    );
};

export default login;