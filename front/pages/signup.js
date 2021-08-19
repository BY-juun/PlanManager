import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useInput from '../hooks/useInput';
import React, { useCallback, useState } from 'react';
import {RiKakaoTalkLine} from 'react-icons/ri';
import {AiOutlineFacebook} from 'react-icons/ai';
const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

const signup = () => {

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  const onSubmitForm = useCallback((e) => {
    console.log('dd');
    e.preventDefault();
    console.log("email : " + email);
    console.log("nickname : " + nickname);
    console.log("password : " + password);
  }, [email, nickname, password])
  return (
    <>
      <TopLayout></TopLayout>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <form onSubmit={onSubmitForm}>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="Email" value={email} onChange={onChangeEmail} style={{ width: "200px" }}></TextField>
          </div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="Nickname" value={nickname} onChange={onChangeNickname} style={{ width: "200px" }}></TextField>
          </div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="Password" type="password" value={password} onChange={onChangePassword} style={{ width: "200px" }}></TextField>
          </div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <TextField label="Password" type="password" value={passwordCheck} onChange={onChangePasswordCheck} style={{ width: "200px" }}></TextField>
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
          <Button variant="outlined" size="medium" color="primary" type="submit" style={{ width: "200px" }} startIcon = {<AiOutlineFacebook/>}>
            페이스북 회원가입
            </Button>
        </div>

      </div>
      <BottomLayout></BottomLayout>
    </>
  );
};

export default signup;