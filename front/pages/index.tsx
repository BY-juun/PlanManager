import React from "react";
import Image from "next/image";
import TopLayOut from "../components/LayOut/TopLayOut";
import BottomLayout from "../components/LayOut/BottomLayOut";
import MainLogo from "../public/MainLogo.png";
import { useUserInfoQuery } from "../_Query/user";
import ButtonSet from "../components/MainPage/ButtonSet";
import { MainTitleWrapper, MainWrapper } from "./styles";

const Home = () => {
  const { data: UserData } = useUserInfoQuery();

  return (
    <>
      <TopLayOut />
      <MainWrapper>
        <MainTitleWrapper>
          <Image src={MainLogo} alt="Picture of the author" width={30} height={30} />
          <div>TODO APP</div>
        </MainTitleWrapper>
        <ButtonSet mode={UserData ? true : false} />
      </MainWrapper>
      <BottomLayout value={null}></BottomLayout>
    </>
  );
};

export default Home;
