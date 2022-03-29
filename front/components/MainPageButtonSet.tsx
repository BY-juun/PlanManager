import React, { useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { LOGIN, NOT_LOGIN } from "../util/constant";
import { useLogoutMutation, useUserInfoQuery } from "../_Query/user";
import { useRouter } from "next/router";

interface Props {
  mode: boolean;
}

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

const MainPageButtonSet = ({ mode }: Props) => {
  const classes = useStyles();
  const { data: UserData } = useUserInfoQuery();
  const router = useRouter();

  const onClickLoginBtn = useCallback(() => {
    router.push("/login");
  }, [router]);

  const onClickSignUpBtn = useCallback(() => {
    router.push("/signup");
  }, [router]);

  const logoutMutation = useLogoutMutation();

  const onClickLogout = useCallback(() => {
    logoutMutation.mutate();
  }, []);

  return (
    <>
      {mode === NOT_LOGIN && (
        <>
          <Button variant="outlined" color="primary" className={classes.root} onClick={onClickLoginBtn}>
            Login
          </Button>
          <Button variant="outlined" color="primary" className={classes.root} onClick={onClickSignUpBtn}>
            SignUp
          </Button>
        </>
      )}
      {mode === LOGIN && (
        <>
          <Chip variant="outlined" size="medium" icon={<FaceIcon />} label={UserData?.nickname} clickable color="primary" className={classes.Userchip} />
          <Button variant="outlined" color="primary" className={classes.root} onClick={onClickLogout}>
            Logout
          </Button>
        </>
      )}
    </>
  );
};

export default MainPageButtonSet;
