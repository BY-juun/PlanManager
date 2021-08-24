import React, { useCallback, useState } from 'react';
import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { LOAD_PAST_REQUEST } from '../reducers/day';

const useStyles = makeStyles((theme) => ({
    mainwrraper: {
        textAlign: "center",
        marginTop: "130px"
    },
    icon: {
        color: "#3f51b5",
        fontSize: "50px"
    },
    ment: {
        marginTop: "25px",
        fontSize: "25px"
    },
    finishButton: {
        marginTop: "20px",
        width: "222px",
    },
}));

const past = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedFromDate, setSelectedFromDate] = useState(null);
    const [selectedToDate, setSelectedToDate] = useState(null);
    const [FromdayInfo, setFromdayInfo] = useState(null);
    const [TodayInfo, setTodayInfo] = useState(null);

    const handleFromDateChange = useCallback((date) => {
        setSelectedFromDate(date);
        if (date.getMonth() + 1 < 10) {
            if(date.getDate()<10){
                setFromdayInfo(String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + "0" +String(date.getDate()))
            }else{
                setFromdayInfo(String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + String(date.getDate()))
            }
           
        } else {
            if(date.getDate()<10){
                setFromdayInfo(String(date.getFullYear()) + String(date.getMonth() + 1) + "0" +String(date.getDate()))
            }else{
                setFromdayInfo(String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate()))
            }
        }
    },[selectedFromDate]);

    const handleToDateChange = useCallback((date) => {
        setSelectedToDate(date);
        if (date.getMonth() + 1 < 10) {
            if(date.getDate()<10){
                setTodayInfo(String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + "0" +String(date.getDate()))
            }else{
                setTodayInfo(String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + String(date.getDate()))
            }
           
        } else {
            if(date.getDate()<10){
                setTodayInfo(String(date.getFullYear()) + String(date.getMonth() + 1) + "0" +String(date.getDate()))
            }else{
                setTodayInfo(String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate()))
            }
        }
        console.log(TodayInfo);
    },[selectedToDate]);

    const submitPast = useCallback(() => {
        console.log(FromdayInfo);
        console.log(TodayInfo);
        if (!FromdayInfo || !TodayInfo) {
            alert("기간을 설정하셔야 합니다");
        }else if(FromdayInfo >= TodayInfo){
            alert ("기간이 잘못 설정 되어 있습니다.");
        }
        else {
            return dispatch({
                type: LOAD_PAST_REQUEST,
                data: {
                    FromdayInfo,TodayInfo
                }
            })
        }
    }, [selectedFromDate, selectedToDate])
    return (
        <>
            <TopLayout />
            <div className={classes.mainwrraper}>
                <CheckCircleOutlineIcon className={classes.icon} />
                <div className={classes.ment}>보고싶은 기간을 설정해주세요</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="From"
                            format="MM/dd/yyyy"
                            value={selectedFromDate}
                            onChange={handleFromDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="To"
                            format="MM/dd/yyyy"
                            value={selectedToDate}
                            onChange={handleToDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div>
                    <Button variant="outlined" color="primary"
                        className={classes.finishButton} onClick={submitPast}>
                        설정 완료
            </Button>
                </div>
            </div>
            <BottomLayout />
        </>
    );
};

export default past;