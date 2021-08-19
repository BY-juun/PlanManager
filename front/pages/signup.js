import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch',
        display : "block",
      },
    },
    btn : {
        
    }
  }));

const signup = () => {
    const classes = useStyles();

    return(
        <>
        <TopLayout></TopLayout>
        <div style = {{textAlign : "center"}}>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Email" className = {classes.btn}/>
            <TextField id="standard-basic" label="Nickname" className = {classes.btn}/>
            <TextField id="standard-basic" label="PassWord" className = {classes.btn}/>
        </form>
        </div>
        <BottomLayout></BottomLayout>
        </>
    );
};

export default signup;