import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useInput from '../hooks/useInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    inputField : {
      width: "180px",
      marginRight : "10px",
    },
    button : {
        marginTop : "13px",
        marginLeft : "15px",
    },
    formWrapper : {
        marginTop : "10px",
        marginBottom : "15px",
    }
  }));

const PlanForm = () => {
    const [plan,onChangePlan] = useInput('');
    const classes = useStyles();
    return(
        <div>
            <form className = {classes.formWrapper}>
                <TextField label="Plan" value={plan} required onChange={onChangePlan} className = {classes.inputField}></TextField>
                <Button variant="outlined" size="medium" color="primary" type="submit" className = {classes.button}>
                    등록
                </Button>
            </form>
        </div>
    )
};

export default PlanForm;