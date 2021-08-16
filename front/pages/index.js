import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BottomLayout from '../Components/BottomLayout';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BiHorizontalCenter } from 'react-icons/bi';


const MainButton = styled(Button)({
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: "150px",
  marginBottom : "20px",
  marginTop : "25px"
});

export default function Home() {
  return (
    <>
      <div style = {{marginTop : "200px"}}>
        <h1 style={{ textAlign: 'center' }}>Plan Manager</h1>
        <div style = {{textAlign : "center"}}>
        <img src = "clock.png" style = {{width : "150px"}}></img>
        </div>
        <div>
          <MainButton variant="outlined" color="secondary" >
            로그인
        </MainButton>
          <MainButton variant="outlined" color="secondary" >
            회원가입
        </MainButton>
        </div>
      </div>
      <BottomLayout />
    </>
  )
}
