import React, { useState, useEffect, useId } from "react";
import "./Register.css";
import { Form, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../../../state/index";

const theme = createTheme();

const INFSignup = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser,infloginUser} = bindActionCreators(actionCreators, dispatch);
  let navigate = useNavigate();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (state.loggedin) {
      navigate("/Emailverify");
    }
  }, [state.loggedin, navigate]);

  function moveLogin() {
    navigate("/Login")
  };

  function moveEmail() {
    navigate("/Emailverify")
  };

  async function upLoadProfile() {
    try{
      const uid = auth.currentUser.uid
      const nickname = displayName
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/inf/inf_register`, 
      {nickname, email, uid, password})
      .then(function(res){        
        console.log("해당 상풍 아이디" + res)
        console.log(res.data)
      })
      const role = "influencer"
      const infloginData = {nickname, email, uid, password, role}
      const loginData = {role, uid}
      infloginUser(infloginData)
      loginUser(loginData)
      fbuser(true)
    // console.log(state.auth.state.loginData.role)
    } catch (err) {
      console.log('failed')
    }
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName,
        })
        console.log(auth.currentUser.uid, displayName, email)
      })
      .then(() => {
        upLoadProfile()
      })
      .then(() => {
        sendEmailVerification(auth.currentUser)
      })
    moveEmail();
  }  
        
  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Typography>
        인플루언서 회원가입 페이지입니다.
      </Typography>
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Form onSubmit={handleSubmit}>
        <Box className="mb-3" controlId="formBasicName">
            <TextField
              type="name"
              placeholder="nickname"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Box>
          <Box className="mb-3" controlId="formBasicEmail">
            <TextField
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box className="mb-3" controlId="formBasicPassword">
            <TextField
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
            <Button
            type="Submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
        </Form>
        <Button onClick={moveLogin}>
        Already have an account? Log In
        </Button>
      </Box>
      </Container>
      </ThemeProvider>
  );
};

export default INFSignup;
