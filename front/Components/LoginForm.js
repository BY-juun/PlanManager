import React,{useCallback} from 'react';
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import Router from 'next/router';
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
    }
    :-ms-input-placeholder {
        text-align : center;
       color: grey;
    }
`;

const LoginFormWrapper = styled.div`
  margin: auto;
  margin-top : 30px;
  padding: 30px;
  height: 400px;
  width : 80%;
`;


const LoginForm = () => {

    const onClickSignup = useCallback(()=>{
        Router.push('/signup');
      },[])
    
    return (
        <>
            <LoginFormWrapper>
                <form>
                    <div style={{ textAlign: "center" }}>
                        <div>
                            <label htmlFor="user-email">이메일</label>
                            <br />
                            <LoginInput type="email"></LoginInput>
                        </div>
                        <div>
                            <label htmlFor="user-password">비밀번호</label>
                            <br />
                            <LoginInput type="password"></LoginInput>
                        </div>
                        <Button variant="outlined" color="secondary" 
                        style={{ display: "block", width: "250px", margin: "0 auto", marginTop: "15px" }}>
                            Login
                        </Button>
                        <Button variant="outlined" color="secondary" 
                        style={{ display: "block", width: "250px", margin: "0 auto", marginTop: "15px" }}
                        onClick = {onClickSignup}>
                            Signup
                        </Button>
                    </div>
                </form>
            </LoginFormWrapper>
        </>
    );
};

export default LoginForm;