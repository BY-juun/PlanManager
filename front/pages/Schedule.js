import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <TopLayout></TopLayout>
            <div>
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
            </div>

            <BottomLayout></BottomLayout>
        </>
    );
};

export default Schedule;