import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useInput from '../hooks/useInput';
import React, { useCallback } from 'react';
import { RiKakaoTalkLine } from 'react-icons/ri';
import { AiOutlineFacebook } from 'react-icons/ai';
const login = () => {
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback((e) => {
        console.log('dd');
        e.preventDefault();
        console.log("email : " + email);
        console.log("password : " + password);
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