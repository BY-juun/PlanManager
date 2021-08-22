import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import useInput from '../hooks/useInput';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop : "15px",
        marginLeft : "80px",
    },
    timepicker : {
        width : "180px",
        marginLeft : "10px",
        marginRight : "10px",
    },
    button : {
        float : "right",
    },
    chip : {
        marginLeft : "80px",
    }
  }));

const ScheduleList = ({value,index}) => {
    const classes = useStyles();
    const [startTime , setStartTime] = useState(new Date());
    const [endTime , setEndTime] = useState(new Date());

    const onChangeStartTime = (date) => {
        setStartTime(date);
    };

    const onChangeEndTime = (date) => {
        setEndTime(date);
    };
    return (
        <>
                    <div style = {{border : "1px solid grey" , marginTop : "15px", marginLeft : "15px", marginRight : "15px"}}>
                        <Chip label={value} className = {classes.root} variant="outlined" />
                        <Button variant="outlined" color="primary" className = {classes.button}>제출하기</Button>
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