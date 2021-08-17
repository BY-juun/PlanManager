import React,{useCallback} from 'react';
import { styled, makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TodayIcon from '@material-ui/icons/Today';
import Router from 'next/router';

const useStyles = makeStyles({
  root: {
    position : "fixed",
    left : "0px",
    bottom : "0px",
    zIndex : 9999,
    width : "100%",
  },
});

const BottomLayout = ()=>{
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const onClickLogin = useCallback(()=>{
      Router.push('/login');
    },[])
  
    return (
      <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<HistoryIcon />} label="Past" />
        <Tab icon={<TodayIcon  />} label="Today" />
        <Tab icon={<ExitToAppIcon />} label="Login" onClick = {onClickLogin}/>  
      </Tabs>
    </Paper>
    );
};

export default BottomLayout;