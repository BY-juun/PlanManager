import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { useDispatch} from 'react-redux';
import {SUBMIT_TIME_REQUEST} from '../reducers/plan';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import Router from 'next/router';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop : "15px",
        marginLeft : "80px",
    },
    timepicker : {
        width : "160px",
        marginLeft : "10px",
        marginRight : "10px",
    },
    button : {
        float : "right",
        marginTop : "10px",
        border: "none",
    },
    chip : {
        marginLeft : "80px",
    },
    mainWrapper : {
        border : "1px solid #3f51b5" , marginTop : "15px", marginLeft : "15px", marginRight : "15px", borderRadius : "15px"
    },
    totlatimeDiv : {
        marginTop : "10px",
        marginBottom : "20px",
    },
    clearIcon : {
        color : "#3f51b5"
    }
  }));

const ScheduleList = ({value,id,PropStartTime,PropEndTime,PropTotalTime}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [startTime , setStartTime] = useState(PropStartTime);
    const [endTime , setEndTime] = useState(PropEndTime);
    

    const onChangeStartTime = useCallback((date) => {
        setStartTime(date);
    },[startTime]);

    const onChangeEndTime = useCallback((date) => {
        setEndTime(date);
    },[endTime]);

    const submitTime = useCallback(()=>{
        let totaltime = null;
        if(startTime){
            if(endTime){
                totaltime = (endTime.getHours()*60 + endTime.getMinutes())-(startTime.getHours()*60 + startTime.getMinutes());
            }
        }
        return dispatch({
            type : SUBMIT_TIME_REQUEST,
            data : {
                startTime, endTime, totaltime ,id
            }
        })
        // console.log(Math.floor(((endTime.getHours()*60 + endTime.getMinutes()) - (startTime.getHours()*60 + startTime.getMinutes()))/60));
        // console.log(((endTime.getHours()*60 + endTime.getMinutes()) - (startTime.getHours()*60 + startTime.getMinutes()))%60);
    },[startTime,endTime])
    return (
        <>
                    <div className = {classes.mainWrapper}>
                        {PropTotalTime
                        ?  <Chip label={value} className = {classes.root} color="primary" variant="outlined" />
                        :  <Chip label={value} className = {classes.root} variant="outlined" />
                        }
                       
                        {PropStartTime && PropEndTime && PropTotalTime
                        ?   <Button variant="outlined" color="secondary" className = {classes.button} >제출완료</Button>
                        :   <Button variant="outlined" color="primary" className = {classes.button} onClick = {submitTime}>제출</Button>
                        }
                        
                        <div>
                        {PropEndTime
                        ? <div className = {classes.totlatimeDiv}><AlarmOnIcon className = {classes.clearIcon}/><div >수행시간 : {Math.floor(PropTotalTime/60)}시간{PropTotalTime%60}분</div></div>
                        :
                        <>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="시작 시간"
                                className = {classes.timepicker}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                value = {startTime}
                                onChange = {onChangeStartTime}
                                />
                                <KeyboardTimePicker
                                margin="normal"
                                className = {classes.timepicker}
                                id="time-picker"
                                label="마무리 시간"
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                value = {endTime}
                                onChange = {onChangeEndTime}
                                />
                            </MuiPickersUtilsProvider>
                        </>
                        }
                        
                        </div>
                    </div>
        </>
    )
};

export default ScheduleList;