import React, { useState, useEffect, useId } from "react";

import { Form, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
// import SearchLocationInput from "../profilefolder/SearchLoaction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import AWS from "aws-sdk";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import './INFSignup.css'

const theme = createTheme();

const INFSignup = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser, infloginUser } =
    bindActionCreators(actionCreators, dispatch);
  let navigate = useNavigate();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState("");
  const [location, setLocation] = useState("");
  

  useEffect(() => {
    if (state.loggedin) {
      navigate("/Emailverify");
    }
  }, [state.loggedin, navigate]);

  function moveLogin() {
    navigate("/Login");
  }

  function moveEmail() {
    navigate("/Emailverify");
  }

  async function upLoadProfile() {
    try {
      const uid = auth.currentUser.uid;
      const nickname = displayName;
      // 서버로 프로필 업로드
      const res = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/inf/inf_register`, {
          nickname,
          email,
          uid,
          password,
        })
        .then(function (res) {
          console.log(res.data);
        });
      // 서버로 추가정보 업로드
      const rese = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/inf/inf_update_profile`, {
          uid,
          tags,
          sex,
          birthday,
          avatar,
          location,
        })
        .then((rese) => {
          console.log("success");
          console.log(rese);
        });

      const role = "influencer";
      const infloginData = { nickname, email, uid, password, role };
      const loginData = { role, uid };
      infloginUser(infloginData);
      loginUser(loginData);
      fbuser(true);
      // console.log(state.auth.state.loginData.role)
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( displayName.length<1 || email.length<1 || password.length<1 || birthday.length<1 || sex.length<1){
      alert('빈 항목을 채워주세요')
    } else{
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName,
        });
        console.log(auth.currentUser.uid, displayName, email);
      })
      .then(() => {
        upLoadProfile();
      })
      .then(() => {
        sendEmailVerification(auth.currentUser);
      });
    moveEmail();
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "swaybucket",
        Key: "INFPROFILE" + auth.currentUser.uid + ".jpg",
        Body: file,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        setAvatar(data.Location.toString());
        console.log("checkthephoto: ", data.Location);
        alert("이미지 업로드에 성공했습니다.");
        console.log("data: ", avatar, "data type: ", typeof avatar);
      },
      function (err) {
        return alert("오류가 발생했습니다.", err.message);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="signup-container">
        
        {/* <CssBaseline /> */}
        <div className='form-container'>
          <Form onSubmit={handleSubmit}>
            <div className='input-container'>
              <div className='basic-input-container'>
                <Box className="mb-3" controlId="formBasicName">
                  <div className="inputName">
                    Nickname
                  </div>
                  <TextField
                    type="name"
                    placeholder="nickname"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Box>
                <Box className="mb-3" controlId="formBasicEmail">
                <div className="inputName">
                    Email
                  </div>
                  <TextField
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box className="mb-3" controlId="formBasicPassword">
                <div className="inputName">
                    Password
                  </div>
                  <TextField
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
              </div>
              <div className='additional-input-container'>
                {/* additional information */}
                <Form.Group className="mb-3" controlId="formBasicName">
                <div className="inputName">
                    Birthday
                  </div>
                  <TextField
                    type="Date"
                    placeholder="how old?"
                    onChange={(e) => setBirthday(e.target.value)}
                    defaultValue="생일"
                  />
                </Form.Group>

                <FormControl sx={{ m: 1, width: 200 }}>
                <div className="inputName">
                    Sex
                  </div>
                  {/* <InputLabel id="demo-simple-select-label">Sex</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sex}
                    label="sex"
                    onChange={(e) => setSex(e.target.value)}
                    defaultValue={"select sex"}
                  >
                    <MenuItem value={"male"}>male</MenuItem>
                    <MenuItem value={"female"}>female</MenuItem>
                    <MenuItem value={"none"}>none</MenuItem>
                  </Select>
                </FormControl>

                <div style={{ height: "70px", zIndex: 100, width:'300px', margin:'10px' }}>
                  {/* <SearchLocationInput setLocation={setLocation} /> */}
                  <div className="inputName">
                    Nickname
                  </div>
                  <GooglePlacesAutocomplete
                    apiKey= {process.env.REACT_APP_GOOGLEPLACES_API}
                    apiOptions={{ language: 'kor', region: 'kor' }}
                    selectProps={{
                      location,
                      onChange: setLocation
                    }}
                    styles={{
                      textInputContainer: {
                        backgroundColor: 'grey',
                      },
                      textInput: {
                        height: 38,
                        width:50,
                        color: '#5d5d5d',
                        fontSize: 16,
                      }
                    }}
                  />
                </div>


                
              </div>
            </div>
            <div className="signupBtnContainer">
              <Button
                type="Submit" 
                variant="contained"
                style={{backgroundColor:'#193c46', fontWeight:'bold', width:'200px'}}
              >
                Sign up
              </Button>
            </div>
            
          </Form>
          <Button 
            onClick={moveLogin}
            style={{color:'#000'}}
          >
            Already have an account? Log In</Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default INFSignup;
