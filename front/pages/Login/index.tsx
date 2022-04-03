import TopLayOut from "../../components/LayOut/TopLayOut";
import BottomLayout from "../../components/LayOut/BottomLayOut";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useRef, useState } from "react";
import KakaoLogin from "../../public/KakaoLogin.png";
import GoogleLogin from "../../public/GoogleLogin.png";
import NaverLogin from "../../public/NaverLogin.png";
import { useRouter } from "next/router";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { backUrl } from "../../config/config";
import { GetServerSidePropsContext } from "next";
import { getMyInfoAPI } from "../../API/users";
import { useLoginMutation } from "../../_Query/user";
import { GotoSignUp, Input, InputDescription, LoginBottomWrapper, LoginBtn, LoginWrapper, SocialBtnWrapper } from "./styles";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  snackbar: {
    marginBottom: "70px",
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const classes = useStyles();

  const LoginSuccess = useCallback((data) => {
    if (data?.status === 401) {
      setIsError(true);
      setErrorMessage(data.data);
      return;
    }
    alert(`*환엽합니다 ${data?.nickname}님`);
    router.push("/");
  }, []);

  const loginMutation = useLoginMutation(LoginSuccess);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
    setErrorMessage("");
  };

  const onSubmitForm = useCallback(async (e) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const loginData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      loginMutation.mutate(loginData);
    }
  }, []);

  return (
    <>
      <TopLayOut />
      <LoginWrapper>
        <form onSubmit={onSubmitForm}>
          <div className={classes.wrapper}>
            <InputDescription>ID(이메일주소)</InputDescription>
            <Input ref={emailRef} />
          </div>
          <div className={classes.wrapper}>
            <InputDescription>비밀번호</InputDescription>
            <Input ref={passwordRef} type="password" />
          </div>
          <div className={classes.wrapper}>
            <LoginBtn>로그인</LoginBtn>
          </div>
        </form>
        <LoginBottomWrapper>
          <GotoSignUp>회원가입</GotoSignUp>
          <SocialBtnWrapper>
            <Link href={`${backUrl}/user/kakao`}>
              <Image src={KakaoLogin} width={30} height={30} />
            </Link>
            <Link href={`${backUrl}/user/google`}>
              <Image src={GoogleLogin} width={30} height={30} />
            </Link>
            <Link href={`${backUrl}/user/facebook`}>
              <Image src={NaverLogin} width={30} height={30} />
            </Link>
          </SocialBtnWrapper>
        </LoginBottomWrapper>
        <Snackbar open={isError} autoHideDuration={3000} onClose={handleClose} className={classes.snackbar}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </LoginWrapper>
      <BottomLayout value={"login"}></BottomLayout>
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
  if (response?.id) {
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

export default login;
