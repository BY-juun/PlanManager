import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useInput from '../hooks/useInput';
import React, { useCallback, useEffect,useState } from 'react';
import { RiKakaoTalkLine } from 'react-icons/ri';
import { AiOutlineFacebook, AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOG_IN_REQUEST } from '../reducers/user';
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    mainWrapper: {
        textAlign: "center",
        marginTop: "150px",
    },
    wrapper: {
        marginTop: "15px",
        marginBottom: "15px",
    },
    inputWrapper: {
        marginTop: "17px",
        marginBottom: "15px"
    },
    inputField: {
        width: "200px"
    },
    snackbar : {
        marginBottom : "70px",
    }

}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const login = () => {
    const [email, onChangeEmail, setEmail] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [open, setOpen] = useState(false);
    const [errormessage,setErrormessage] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { User, logInDone, logInError } = useSelector((state) => state.user);
    const nickname = User?.nickname;
    useEffect(() => {
        if (logInError) {
            setErrormessage(true);
            setEmail('');
            setPassword('');
        }
    }, [logInError]);


    useEffect(() => {
        if (logInDone) {
            setOpen(true);
        }
    }, [logInDone]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        setErrormessage(false);
      };

    useEffect(() => {
        if (User) {
            setTimeout(() => {
                Router.push('/');
            }, 1000)
        }
    }, [User])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        return dispatch({
            type: LOG_IN_REQUEST,
            data: {
                email, password
            }
        })
    }, [email, password])

    return (
        <>
            <TopLayout></TopLayout>
            <div className = {classes.mainWrapper}>
                <form onSubmit={onSubmitForm}>
                    <div className = {classes.wrapper}>
                        <TextField label="Email" value={email} onChange={onChangeEmail} className = {classes.inputField}></TextField>
                    </div>
                    <div className = {classes.wrapper}>
                        <TextField label="Password" type="password" value={password} onChange={onChangePassword} className = {classes.inputField}></TextField>
                    </div>
                    <div className = {classes.wrapper}>
                        <Button variant="outlined" size="medium" color="primary" type="submit" className = {classes.inputField}>
                            Login
                        </Button>
                    </div>
                </form>
                    <div className={classes.inputWrapper}>
                        <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.inputField} startIcon={<RiKakaoTalkLine />}>
                            카카오톡 회원가입
                        </Button>
                    </div>
                    <div sclassName={classes.inputWrapper}>
                        <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.inputField} startIcon={<AiOutlineFacebook />}>
                            페이스북 회원가입
                        </Button>
                    </div>
                    <div className={classes.inputWrapper}>
                        <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.inputField} startIcon={<AiOutlineGoogle />}>
                            구글 회원가입
                         </Button>
                    </div>
                    <Snackbar open={open} autoHideDuration={3000}  className = {classes.snackbar}>
                        <Alert  severity="success">
                        환영합니다 {nickname}님
                        </Alert>
                    </Snackbar>
                    <Snackbar open={errormessage} autoHideDuration={3000} onClose={handleClose} className = {classes.snackbar}>
                        <Alert onClose={handleClose} severity="error">
                        {logInError}
                        </Alert>
                    </Snackbar>
                </div>
            <BottomLayout value = {'login'}></BottomLayout>
        </>
    );
};

export default login;