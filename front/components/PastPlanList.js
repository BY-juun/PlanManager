import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

const useStyles = makeStyles((theme) => ({
    wrapper : {
        marginTop : "20px",
        marginBottom : "20px",
        marginLeft: "20px",
        marginRight : "20px",
        border : "1px solid grey",
        borderRadius : "15px",
        padding : "10px"
    },
    plan : {
        marginTop : "10px",
        marginBottom : "10px",
        color : "black"
    },
    icon : {
        color : "#3f51b5",
        verticalAlign : "middle",
        marginBottom : "3px",
    },
    span : {
        marginRight : "50px",
    }
  }));
  

const PastPlanList = ({dayinfo, planList}) => {
    const classes = useStyles();
    return(
        <div className = {classes.wrapper}>
            <Chip
                label={String(dayinfo).substr(0,4) + "년 " +String(dayinfo).substr(4,2) + "월 " + String(dayinfo).substr(6,8) + "일"}
                color="primary"
                variant="outlined"
            />
            {planList && planList.map((value,index)=>
            <div className = {classes.plan}>
                <span className = {classes.span}> <ListAltOutlinedIcon className = {classes.icon}/>{value.content} </span>
                <span> <ScheduleIcon className = {classes.icon}/> {value.totlatime}</span>
            </div>)}
        </div>
    )
};

export default PastPlanList