import TopLayOut from "../../components/LayOut/TopLayOut";
import BottomLayout from "../../components/LayOut/BottomLayOut";
import KakaoLogin from "../../public/KakaoLogin.png";
import GoogleLogin from "../../public/GoogleLogin.png";
import NaverLogin from "../../public/NaverLogin.png";
import { makeStyles } from "@material-ui/core/styles";
import useInput from "../../hooks/useInput";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { backUrl } from "../../config/config";
import { getMyInfoAPI, signUpApi } from "../../API/users";
import { GetServerSidePropsContext } from "next";
import { useMutation } from "react-query";
import { Input, InputDescription } from "../Login/styles";
import Link from "next/link";
import Image from "next/image";
import { ErrorMesssage, SignUpBottomWrapper, SignUpBtn, SingUpWrapper } from "./styles";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    textAlign: "center",
    marginTop: "30px",
  },
  wrapper: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  inputWrapper: {
    marginTop: "17px",
    marginBottom: "15px",
  },
  inputField: {
    width: "200px",
  },
  snackbar: {
    marginBottom: "70px",
  },
  snackbar2: {
    marginTop: "350px",
  },
}));

const signup = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();

  const mutation = useMutation("signUp", signUpApi, {
    onError: (error: any) => {
      setErrorMessage(error.data);
      setIsError(true);
    },
    onSuccess: (response) => {
      if (response.status === 403) signUpFailure(response.data);
      else signUpSuccess();
    },
  });

  const signUpSuccess = useCallback(() => {
    alert("성공");
    router.push("/");
  }, []);

  const signUpFailure = useCallback((res: string) => {
    alert(res);
  }, []);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      const signUpData = {
        email: email,
        password: password,
        nickname: nickname,
      };
      mutation.mutate(signUpData);
    },
    [email, nickname, password, passwordCheck]
  );

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };

  return (
    <>
      <TopLayOut />
      <SingUpWrapper>
        <form onSubmit={onSubmitForm}>
          <InputDescription>ID(이메일주소)</InputDescription>
          <Input value={email} onChange={onChangeEmail} />
          <InputDescription>닉네임</InputDescription>
          <Input value={nickname} onChange={onChangeNickname} />
          <InputDescription>비밀번호</InputDescription>
          <Input value={password} onChange={onChangePassword} type="password" />
          <InputDescription>비밀번호확인</InputDescription>
          <Input value={passwordCheck} onChange={onChangePasswordCheck} type="password" />
          {passwordError && <ErrorMesssage>비밀번호가 일치하지 않습니다.</ErrorMesssage>}
          <SignUpBtn>회원가입</SignUpBtn>
        </form>
        <SignUpBottomWrapper>
          <Link href={`${backUrl}/user/kakao`}>
            <Image src={KakaoLogin} width={30} height={30} />
          </Link>
          <Link href={`${backUrl}/user/google`}>
            <Image src={GoogleLogin} width={30} height={30} />
          </Link>
          <Link href={`${backUrl}/user/facebook`}>
            <Image src={NaverLogin} width={30} height={30} />
          </Link>
        </SignUpBottomWrapper>
      </SingUpWrapper>
      <Snackbar open={isError} autoHideDuration={2000} className={classes.snackbar} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <BottomLayout value=""></BottomLayout>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const response = await getMyInfoAPI();
  if (response?.data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

export default signup;
