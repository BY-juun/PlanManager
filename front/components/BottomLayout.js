import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HistoryIcon from '@material-ui/icons/History';
import TodayIcon from '@material-ui/icons/Today';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
    root: {
        position : "fixed",
        left : "0px",
        bottom : "0px",
        zIndex : 9999,
        width : "100%",
    },
});



const BottomLayout = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Past" icon={<HistoryIcon />} />
            <BottomNavigationAction label="Today" icon={<TodayIcon />} />
            <BottomNavigationAction label="Login" icon={<ExitToAppIcon />} /> {/* 나중에 로그인 했으면 logout으로 바꿔줘야한다.*/}
        </BottomNavigation>
    );
};

export default BottomLayout