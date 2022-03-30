import TopLayOut from "../components/LayOut/TopLayOut";
import BottomLayout from "../components/LayOut/BottomLayOut";
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
import { useLoginMutation } from "../_Query/user";

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
    alert(`환엽합니다 ${data?.nickname}님`);
    setTimeout(() => {
      router.push("/");
    }, 500);
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
