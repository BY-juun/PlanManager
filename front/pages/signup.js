import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useInput from '../hooks/useInput';
import React, { useCallback, useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RiKakaoTalkLine} from 'react-icons/ri';
import {AiOutlineFacebook} from 'react-icons/ai';
import Router from 'next/router';
import { SIGN_UP_REQUEST } from '../reducers/user';
const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

const signup = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const {User, signUpDone, signUpError} = useSelector((state)=>state.user);

  useEffect(()=>{
    if(signUpDone)
    {
      alert("회원가입이 완료되었습니다. 메인화면으로 돌아갑니다");
      setTimeout(()=>{
        Router.push('/');
      },1000)
    }
  },[signUpDone])

  useEffect(()=>{
    if(User)
    {
      alert("이미 로그인한 회원은 회원가입을 할 수 없습니다. 메인화면으로 돌아갑니다");
      setTimeout(()=>{
        Router.push('/');
      },1000)
    }
  },[User]);

  useEffect(()=>{
    if(signUpError)
    {
      alert(signUpError);
      setEmail('');
      setNickname('');
      setPassword('');
      setPasswordCheck('');
    }
  },[signUpError])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    console.log('dd');
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
      },
    });
  }, [email, nickname, password,passwordCheck]);


  return (
    <>
      <TopLayout></TopLayout>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <form onSubmit={onSubmitForm}>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="Email" value={email} required onChange={onChangeEmail} style={{ width: "200px" }}></TextField>
          </div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="Nickname" value={nickname}  required onChange={onChangeNickname} style={{ width: "200px" }}></TextField>
          </div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="Password" type="password" value={password} required onChange={onChangePassword} style={{ width: "200px" }}></TextField>
          </div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="PasswordCheck" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} style={{ width: "200px" }}></TextField>
          </div>
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <Button variant="outlined" size="medium" color="primary" type="submit" style={{ width: "200px" }}>
              SignUp
            </Button>
          </div>
        </form>
        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <Button variant="outlined" size="medium" color="primary" type="submit" style={{ width: "200px" }} startIcon = {<RiKakaoTalkLine/>}>
            카카오톡 회원가입
            </Button>
        </div>
        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <Button variant="outlined" size="medium" color="primary" type = "submit" style={{ width: "200px" }} startIcon = {<AiOutlineFacebook/>}>
            페이스북 회원가입
            </Button>
        </div>

      </div>
      <BottomLayout></BottomLayout>
    </>
  );
};

export default signup;