import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image'
import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import todolist from "../public/todolist.png"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop : "30px",
        display : "block",
        margin : "0 auto",
        width : "200px",
    },
  }));

import Button from '@material-ui/core/Button';
const Home = () => {
    const classes = useStyles();
    return(
        <>
            <TopLayout></TopLayout>
            <div style = {{textAlign : "center", marginTop : "150px"}}>
                <Image
                    src= {todolist}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />
                <div style = {{fontSize : "30px",color : "grey",marginTop : "15px"}}>매일매일 후회없이</div>
                <Button variant="outlined" color="primary" className = {classes.root} href = '/login'>
                    Login
                </Button>
                <Button variant="outlined" color="primary" className = {classes.root} href = '/signup'>
                    SignUp
                </Button>
            </div>
            <BottomLayout></BottomLayout>
        </>
    );
}

export default Home;