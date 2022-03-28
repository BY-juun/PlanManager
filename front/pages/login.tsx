import TopLayout from "../components/TopLayout";
import BottomLayout from "../components/BottomLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useRef, useState } from "react";
import { RiKakaoTalkLine } from "react-icons/ri";
import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/router";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { backUrl } from "../config/config";
import { GetServerSidePropsContext } from "next";
import { getMyInfoAPI, loginAPI } from "../API/users";
import { useMutation, useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    textAlign: "center",
    marginTop: "150px",
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
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const login = () => {
  const queryClient = useQueryClient();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const router = useRouter();
  const classes = useStyles();

  const mutation = useMutation("LoginRequest", loginAPI, {
    onError: (error: any) => {
      setIsError(true);
      setErrorMessage(error.data);
    },
    onSuccess: (data) => {
      if (data.status === 401) {
        setIsError(true);
        setErrorMessage(data.data);
        return;
      }
      queryClient.setQueryData("myInfo", data);
      setLoginSuccess(true);
      setNickname(data.nickname);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
  });

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
      mutation.mutate(loginData);
    }
  }, []);

  return (
    <>
      <TopLayout></TopLayout>
      <div className={classes.mainWrapper}>
        <form onSubmit={onSubmitForm}>
          <div className={classes.wrapper}>
            <TextField label="Email" inputRef={emailRef} className={classes.inputField}></TextField>
          </div>
          <div className={classes.wrapper}>
            <TextField label="Password" inputRef={passwordRef} type="password" className={classes.inputField}></TextField>
          </div>
          <div className={classes.wrapper}>
            <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.inputField}>
              Login
            </Button>
          </div>
        </form>
        <div className={classes.inputWrapper}>
          <Button
            href={`${backUrl}/user/kakao`}
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
            className={classes.inputField}
            startIcon={<RiKakaoTalkLine />}
          >
            카카오톡 로그인
          </Button>
        </div>
        <div className={classes.inputWrapper}>
          <Button
            href={`${backUrl}/user/facebook`}
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
            className={classes.inputField}
            startIcon={<AiOutlineFacebook />}
          >
            페이스북 로그인
          </Button>
        </div>
        <div className={classes.inputWrapper}>
          <Button
            href={`${backUrl}/user/google`}
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
            className={classes.inputField}
            startIcon={<AiOutlineGoogle />}
          >
            구글 로그인
          </Button>
        </div>
        <Snackbar open={loginSuccess} autoHideDuration={3000} className={classes.snackbar}>
          <Alert severity="success">환영합니다 {nickname}님</Alert>
        </Snackbar>
        <Snackbar open={isError} autoHideDuration={3000} onClose={handleClose} className={classes.snackbar}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
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

export default login;
