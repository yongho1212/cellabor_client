import React, {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GrLogin from 'react-icons/gr'



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HeaderLogin = () => {


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const uuid = state.auth.uid

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let navigate = useNavigate();
    function handleClickHome() {
      navigate("/Home");
    }
    function handleClickMain() {
      navigate("/Main");
    }
    function handleClickSignIn() {
      navigate("/LoginChooseRole");
    }
    function handleClickSignUp() {
      navigate("/SignupChooseRole");
    }
    function handleClickUpload() {
      navigate("/Upload");
    }
    async function handleLogout() {
      try {
        
        navigate('/Home')
        console.log('logout')
      } catch (err) {
        console.log(err)
  };
    };
    function handleClickProfile() {
      navigate("/Profile");
    }

  

  return (
    <AppBar position="static" style={{backgroundColor:'#fff', zIndex:100}}>
      <Container maxWidth="xl" >
        <div style={{justifyContent:'space-between', 
        display:'flex', 
        height:'7vh',
        
        alignItems:'center'}}>
        
        <Box>
            <div 
                variant="contained"
                style={{ color:"#3E588C", marginInline:10, fontSize:25, fontWeight:'bold'}}
                onClick={handleClickHome}
            >
               Cellabor
            
          
          </div>
        </Box>
        
      
     
        
      
        <div >
            <Button 
                variant="contained"
                style={{
                backgroundColor:"#77A1D9",
                color:"#0D378C",
                marginInline:3,
                height:'31px',
                width:'71px',
                fontWeight:'bold'
              }}
                onClick={handleClickSignUp}
            >
                SignUp
            </Button>
            <Button 
                variant="outlined"
                style={{color:"#0D378C", borderColor:"#77A1D9" , marginInline:3,
                height:'31px',
                width:'71px',
                fontWeight:'bold'}}
                onClick={handleClickSignIn}
            >
                Login
            </Button>
            
        </div>  




         
        </div>
      </Container>
    </AppBar>
  );
};
export default HeaderLogin;