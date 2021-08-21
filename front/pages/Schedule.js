import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import 'date-fns';
import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [countList, setCountList] = useState([])
    const handleDateChange = useCallback((date) => {
        setSelectedDate(date);
    },[selectedDate]);

    const clickadd = useCallback(()=>{
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    },[countList]);


    const clickremove = useCallback(()=>{
        let countArr = [...countList]
        countArr.pop()	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    },[countList]);

    return (
        <>
            <TopLayout></TopLayout>
            <div style = {{textAlign : "center", marginTop : "60px"}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="날짜 선택"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div>
                    <IconButton color="primary" aria-label="add schedule" onClick = {clickadd}>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="remove schedule" onClick = {clickremove}>
                        <IndeterminateCheckBoxIcon />
                    </IconButton>
                </div>
                {countList && countList.map((v,i) => (<div><TextField label="일정" key = {i} style = {{marginBottom : "15px", marginTop : "5px"}}></TextField></div>))}
                <div>
                <Button variant="outlined" color="primary" style = {{marginTop:"10px"}}>
                    설정 완료
                </Button>
                </div>
            </div>
            <BottomLayout></BottomLayout>
        </>
    );
};

export default Schedule;