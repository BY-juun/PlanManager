import React,{useState, useCallback} from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import useInput from "../hooks/useInput";
import { useDispatch } from 'react-redux';
import {SIGN_UP_REQUEST} from '../reducers/user';
const LoginInput = styled.input`
    display : block;
    margin : 0 auto;
    margin-top : 15px;
    margin-bottom : 15px;
    color: darkgrey;
    border : 1px solid darkgrey;
    width : 250px;
    height : 30px;
    border-radius : 4px;

    ::placeholder,
    ::-webkit-input-placeholder {
        text-align : center;
      color: grey;
      font-size : 0.875rem
    }
    :-ms-input-placeholder {
        text-align : center;
       color: grey;
       font-size : 0.875rem
    }
`;


const LoginFormWrapper = styled.div`
  margin: auto;
  margin-top : 30px;
  padding: 30px;
  height: 400px;
  width : 80%;
`;

const SignUpForm = ()=>{
    const dispatch = useDispatch();
    const [email,onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onSubmit = useCallback(()=>{
        console.log("dd");   
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }

        dispatch({
            type : SIGN_UP_REQUEST,
            data : {
                email, nickname, password
            }
        })
    },[email, password, passwordCheck, nickname])

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
      }, [password,passwordCheck]);

 
    return(
        <>
        <LoginFormWrapper>
        <form onSubmit = {onSubmit}>
            <LoginInput placeholder = "이메일" type = "email" value={email} onChange={onChangeEmail}></LoginInput>
            <LoginInput placeholder = "닉네임" value={nickname}  type = "text" onChange={onChangeNickname}></LoginInput>
            <LoginInput placeholder = "비밀번호" value={password} type = "password"  onChange={onChangePassword}></LoginInput>
            <LoginInput placeholder = "비밀번호확인" value={passwordCheck} type = "password" onChange={onChangePasswordCheck}></LoginInput>
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
            <Button variant="outlined" color="secondary" 
                        style={{ display: "block", width: "250px", margin: "0 auto", marginTop: "15px" }}>
                            SignUp
                        </Button>
        </form>
        </LoginFormWrapper>
        </>
    );
};

export default SignUpForm;