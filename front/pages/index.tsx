import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import TopLayout from "../components/TopLayout";
import BottomLayout from "../components/BottomLayout";
import todolist from "../public/todolist.png";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
    display: "block",
    margin: "0 auto",
    width: "200px",
  },
  Userchip: {
    marginTop: "50px",
  },
  mainWrapper: {
    textAlign: "center",
    marginTop: "130px",
  },
  mainMessage: {
    fontSize: "30px",
    color: "grey",
    marginTop: "15px",
  },
}));

import Button from "@material-ui/core/Button";
import { GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getMyInfoAPI, logoutAPI } from "../API/users";
const Home = () => {
  const classes = useStyles();

  const onClickLogout = useCallback(() => {
    logoutAPI();
  }, []);

  const { data: UserData } = useQuery("myInfo", () => getMyInfoAPI());

  return (
    <>
      <TopLayout></TopLayout>
      <div className={classes.mainWrapper}>
        <Image src={todolist} alt="Picture of the author" width={100} height={100} />
        <div className={classes.mainMessage}>매일매일 후회없이</div>
        <div className={classes.mainMessage}>기록하자</div>
        {!UserData && (
          <>
            <Button variant="outlined" color="primary" className={classes.root} href="/login">
              Login
            </Button>
            <Button variant="outlined" color="primary" className={classes.root} href="/signup">
              SignUp
            </Button>
          </>
        )}
        {UserData && (
          <>
            <Chip variant="outlined" size="medium" icon={<FaceIcon />} label={UserData?.nickname} clickable color="primary" className={classes.Userchip} />
            <Button variant="outlined" color="primary" className={classes.root} onClick={onClickLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
      <BottomLayout value={null}></BottomLayout>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  //원래 브라우저에서 cookie를 알아서 넣어주는데 , SSR시에는 브라우저 개입을 못하니까 프론트서버에서 헤더에 쿠키를 넣어서 보내줘야 한다.
  //const { req } = context;
  const { req } = context;
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("myInfo", () => getMyInfoAPI());
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
