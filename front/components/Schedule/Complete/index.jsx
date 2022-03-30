import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  completetext: {
    marginTop: "20px",
    fontSize: "25px",
  },
  finalPage: {
    marginTop: "100px",
  },
  iconStyle: {
    color: "#3f51b5",
    fontSize: "50px",
  },
  mainredirectionbutton: {
    marginTop: "35px",
  },
}));

const Complete = () => {
  const classes = useStyles();
  const router = useRouter();
  const onClickMain = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className={classes.finalPage}>
      <CheckCircleOutlineIcon className={classes.iconStyle} />
      <div className={classes.completetext}>등록이 완료되었습니다.</div>
      <div className={classes.mainredirectionbutton}>
        <Button variant="contained" color="primary" size="medium" startIcon={<SendIcon />} onClick={onClickMain}>
          메인화면으로 이동하기
        </Button>
      </div>
    </div>
  );
};

export default Complete;
