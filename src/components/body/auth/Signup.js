import React, { useState, useEffect, useId } from "react";
import "./Register.css";
import { Form, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  sendEmailVerification
} from "firebase/auth"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../../../state/index";

const theme = createTheme();

const Signup = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  let navigate = useNavigate();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, 
      {displayName, email, role, uid, password})
      .then(function(res){
      })
      const loginData = {displayName, email, role, uid, password}
      loginUser(loginData)
      fbuser(true)
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
              placeholder="name"
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
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">ROLE</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel value="inflencer" control={<Radio />} label="INFLUENCER" />
              <FormControlLabel value="advertiser" control={<Radio />} label="ADVERTISER" />
            </RadioGroup>
          </FormControl>
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

export default Signup;
