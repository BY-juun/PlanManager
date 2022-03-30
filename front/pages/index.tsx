import React from "react";
import Image from "next/image";
import TopLayOut from "../components/LayOut/TopLayOut";
import BottomLayout from "../components/LayOut/BottomLayOut";
import todolist from "../public/todolist.png";
import { useUserInfoQuery } from "../_Query/user";
import { makeStyles } from "@material-ui/core/styles";
import ButtonSet from "../components/MainPage/ButtonSet";

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
      <TopLayOut />
      <div className={classes.mainWrapper}>
        <Image src={todolist} alt="Picture of the author" width={100} height={100} />
        <ButtonSet mode={UserData ? true : false} />
      </div>
      <BottomLayout value={null}></BottomLayout>
    </>
  );
};

export default Home;
