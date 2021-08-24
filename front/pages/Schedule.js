import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import 'date-fns';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { ADD_DAY_REQUEST } from '../reducers/day';
import React, { useCallback, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import useInput from '../hooks/useInput';
import wrapper from "../store/configureStore";
import { END } from 'redux-saga';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import PlanForm from '../components/PlanForm';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: "15px", marginTop: "5px"
    },
    finishButton: {
        marginTop: "20px"
    },
    mainWrapper: {
        textAlign: "center", marginTop: "40px"
    },
    selectDate: {
        marginTop: "100px"
    },
    completetext: {
        marginTop: "20px",
        fontSize: "25px"
    },
    finalPage: {
        marginTop: "100px"
    },
    iconStyle: {
        color: "#3f51b5",
        fontSize: "50px"
    },
    mainredirectionbutton: {
        marginTop: "35px",
    }
}));

const getSteps = () => {
    return ['날짜 설정하기', '계획 설정하기', '설정 완료'];
}


const Schedule = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    let dayInfo = String(new Date().getFullYear()) + String(new Date().getMonth() + 1) + String(new Date().getDate());
    const [countList, setCountList] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const { User } = useSelector((state) => state.user);
    const { addDayDone, addDayError, addDayLoading } = useSelector((state) => state.day);
    useEffect(() => {
        if (!User) {
            alert("로그인 후 이용가능합니다");
            Router.push('/');
        }
    }, [User])

    useEffect(() => {
        if (addDayDone) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }, [addDayDone])

    useEffect(() => {
        if (addDayError) {
            alert(addDayError);
        }
    }, [addDayError])

    const handleDateChange = useCallback((date) => {
        setSelectedDate(date);

        if (date.getMonth() + 1 < 10) {
            if (date.getDate() < 10) {
                dayInfo = (String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + "0" + String(date.getDate()))
            } else {
                dayInfo = (String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + String(date.getDate()))
            }

        } else {
            if (date.getDate() < 10) {
                dayInfo = (String(date.getFullYear()) + String(date.getMonth() + 1) + "0" + String(date.getDate()))
            } else {
                dayInfo = (String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate()))
            }
        }
    }, [selectedDate]);

    const submitDate = useCallback(() => {
        return dispatch({
            type: ADD_DAY_REQUEST,
            data: {
                dayInfo
            }
        })
    }, [dayInfo])


    const addInput = useCallback(() => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }, [countList])

    const removeInput = useCallback(() => {
        let countArr = [...countList]
        countArr.pop();
        setCountList(countArr);
    }, [countList])

    const submitPlanComplete = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, [activeStep]);

    const onClickMain = useCallback(() => {
        Router.push('/');
    })

    return (
        <>
            <TopLayout></TopLayout>
            <div className={classes.mainWrapper}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 0 &&  //1단계일 때,
                    <div className={classes.selectDate}>
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
                            <Button variant="outlined" color="primary" className={classes.finishButton} onClick={submitDate} onLoad={addDayLoading}>
                                설정 완료
                        </Button>
                        </div>
                    </div>}
                {activeStep === 1 &&
                    <>
                        <IconButton color="primary" aria-label="add plan" onClick={addInput}>
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="remove plan" onClick={removeInput}>
                            <RemoveCircleIcon />
                        </IconButton>
                        {countList.map((value, index) => <PlanForm key={index} dayInfo={dayInfo} />)}
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<SaveIcon />}
                                onClick={submitPlanComplete}
                            >등록완료</Button>
                        </div>
                    </>
                }
                {activeStep === 2 &&
                    <div className={classes.finalPage}>
                        <CheckCircleOutlineIcon className={classes.iconStyle} />
                        <div className={classes.completetext}>등록이 완료되었습니다.</div>
                        <div className={classes.mainredirectionbutton}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                startIcon={<SendIcon />}
                                onClick={onClickMain}
                            >메인화면으로 이동하기</Button>
                        </div>
                    </div>
                }

            </div>
            <BottomLayout></BottomLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async ({ req, res }) => {
        const cookie = req ? req.headers.cookie : '';
        axios.defaults.headers.Cookie = '';
        if (req && cookie) {
            axios.defaults.headers.Cookie = cookie;
        }
        store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
        store.dispatch(END);
        await store.sagaTask.toPromise();
    });



export default Schedule;