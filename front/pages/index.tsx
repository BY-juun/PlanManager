import React from "react";
import Image from "next/image";
import TopLayout from "../components/TopLayout";
import BottomLayout from "../components/BottomLayout";
import todolist from "../public/todolist.png";
import { useUserInfoQuery } from "../_Query/user";
import MainPageButtonSet from "../components/MainPageButtonSet";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    textAlign: "center",
    marginTop: "130px",
  },
}));

const Home = () => {
  const classes = useStyles();

  const { data: UserData } = useUserInfoQuery();

  return (
    <>
      <TopLayout></TopLayout>
      <div className={classes.mainWrapper}>
        <Image src={todolist} alt="Picture of the author" width={100} height={100} />
        <MainPageButtonSet mode={UserData ? true : false} />
      </div>
      <BottomLayout value={null}></BottomLayout>
    </>
  );
};

export default Home;
