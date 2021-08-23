import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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
        border : "1px solid grey" , marginTop : "15px", marginLeft : "15px", marginRight : "15px"
    }
  }));

const ScheduleList = ({value,index}) => {
    const classes = useStyles();
    const [startTime , setStartTime] = useState(new Date());
    const [endTime , setEndTime] = useState(new Date());

    const onChangeStartTime = useCallback((date) => {
        console.log(date.getHours());
        console.log(date.getMinutes());
        setStartTime(date);
    },[startTime]);

    const onChangeEndTime = useCallback((date) => {
        console.log(date.getHours());
        console.log(date.getMinutes());
        setEndTime(date);
    },[endTime]);

    const submitTime = useCallback(()=>{
        console.log(startTime.getHours()*60 + startTime.getMinutes());
        console.log(endTime.getHours()*60 + endTime.getMinutes());
        console.log(Math.floor(((endTime.getHours()*60 + endTime.getMinutes()) - (startTime.getHours()*60 + startTime.getMinutes()))/60));
        console.log(((endTime.getHours()*60 + endTime.getMinutes()) - (startTime.getHours()*60 + startTime.getMinutes()))%60);
    },[startTime,endTime])
    return (
        <>
                    <div className = {classes.mainWrapper}>
                        <Chip label={value} className = {classes.root} variant="outlined" />
                        <Button variant="outlined" color="primary" className = {classes.button} onClick = {submitTime}>제출</Button>
                        <div>
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
                        </div>
                    </div>
        </>
    )
};

export default ScheduleList;