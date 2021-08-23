import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "cornflowerblue",
  },
  title: {
    flexGrow: 1,
    textAlign : "center",
  },
  mainTitle : {
    textDecoration : "none", color : "white"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href = "/"><a className = {classes.mainTitle}>PlanManager</a></Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}