import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { TextField } from "@mui/material";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  deleteUser
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

import "./Login.css";
import axios from "axios";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { adUserInfo, infPrd } from "../../../api";

const ADLogin = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser, prependprd, adloginUser} = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [testUid, setTestUid] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const gprovider = new GoogleAuthProvider();

  const [infor, setInfor] = useState("");
  const queryClient = new QueryClient();

  useEffect(() => {
    if (state.loggedin) {
      navigate("/Main");
    }
  }, [state.loggedin, navigate]);



function moveMain() {
  navigate("/DashMain")
};

const moveSignup = () => {
  navigate("/INFSignup");
};

const uid = testUid;
console.log(uid)

const adQuery = useQuery({
  queryKey: ["ad"],
  queryFn: () => adUserInfo(uid),
  staleTime: 1000 * 60,
}); 
if (adQuery.isLoading === "loading") console.log("loading");
if (adQuery.status === "error") console.log("err");
console.log(adQuery.data);


  const getinfo = async () => {
    setTestUid(auth.currentUser.uid);
    // const uid = auth.currentUser.uid;
    // console.log(auth.currentUser)
    // console.log(uid);
    // const res = await axios
    //   .get(`${process.env.REACT_APP_SERVER_URL}/ad/getAdInfo`, { params: { uid: uid } })
    //   .then((res) => {        
    //     console.log(res.data)
    //     const adloginData = res.data
    //     adloginUser(adloginData);
    //     loginUser(adloginData);
    //     fbuser(true);
    //     getListById();
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //     alert('비밀번호 혹은 이메일이 일치하지 않습니다. 다시 시도하세요')
    // });
  };

  const getListById = async () => {
    const uid = auth.currentUser.uid
    console.log(uid)
    try {
       const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/ad/getAdInfo`, 
       { params: { uid } })
       .then((res) => { 
        console.log(res.data);
        prependprd(res.data);
        console.log(state.myprd)
        return 0;
      })
    } 
    catch (err) {
      console.log(err)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
    .then(() =>
      getinfo()
    )
    .then(() =>{
      moveMain();
    })
  };

  const handleGoogleSignIn = async() => {
    await signInWithPopup(auth, gprovider)
    .then(async(result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(result.user.email)
      const response = await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/ad/getAdInfo`, {
            params: { uid: uid },
          })
          .then((res) => {
            if (!res.data){
              deleteUser(user);
              moveSignup();
              alert('회원 정보가 없습니다. 회원가입을 먼저 진행해주세요!')
            } else {
              getinfo();
              moveMain();
            }
          });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      throw new Error('Something bad happened');
    })
    .then(() => {
      getinfo();
    })
    .then(() =>{
      moveMain();
    })
  };

  const handleFBSignIn = () => {
    //dispatch(fbSignInInitiate());
  };

  return (
    <>
      <div style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          marginBottom: "30px",
          marginBlock:'40px'
        }}>
        

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <TextField
                id="outlined-basic"
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "80vw", marginBlock: "1vw" }}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "80vw", marginBlock: "1vw" }}
              />
          </Form.Group>

          <div style={{display:'flex', justifyContent:'center'}}>
              <Button
                variant="primary"
                type="Submit"
                style={{
                  width: "80vw",
                  padding: 10,
                  fontSize: 19,
                  fontWeight: "bold",
                  marginBlock: "3vw",
                }}
              >
                Log In
              </Button>
            </div>
        </Form>
        <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
        {/* <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
          <Button variant="primary" onClick={handleFBSignIn}>
            FACEBOOK
          </Button>
        </div> */}
      </div>
      
    </>
  );
};

export default ADLogin;
