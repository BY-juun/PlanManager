
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import { useCallback } from "react";
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

    const onSubmitForm = useCallback(()=>{
        
    })
    return(
        <>
        <LoginFormWrapper>
        <form onSubmit = {onSubmitForm}>
            <LoginInput placeholder = "email" type = "email"></LoginInput>
            <LoginInput placeholder = "password" type = "password"></LoginInput>
            <LoginInput placeholder = "nickname" type = "text"></LoginInput>
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