import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import "./Login.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { infUserInfo, infPrd} from '../../../api';

const queryClient = new QueryClient()

const INFLogin = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser, prependprd, infloginUser } =
    bindActionCreators(actionCreators, dispatch);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const gprovider = new GoogleAuthProvider();
  const fprovider = new FacebookAuthProvider();
  const [infor, setInfor] = useState("");

  useEffect(() => {
    if (state.loggedin) {
      navigate("/Main");
    }
  }, [state.loggedin, navigate]);

  useEffect(()=> {

  })

  const moveMain = () => {
    navigate("/Main");
  };

  const uid = 'CzVwyQLh08YLFHFfixL2uuzmnOw1'


  const {data, status} = useQuery({queryKey:['inf'], queryFn: () => infUserInfo(uid)})

  if (status === "loading") console.log('loading')
  if (status === "error") console.log('err')
  console.log(data)
  

  

 

  const getinfo = async () => {
    const uid = auth.currentUser.uid;
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo`, {
        params: { uid: uid },
      })
      .then((res) => {
        console.log(res.data);
        const infloginData = res.data;
        infloginUser(infloginData);
        loginUser(infloginData);
        fbuser(true);
        getListById();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const getListById = async () => {
    const uid = auth.currentUser.uid;
    try {
      const res = await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/products/getlistbyid`, {
          params: { uid },
        })
        .then((res) => {
          prependprd(res.data);
          return 0;
        });
    } catch (err) {
      alert("비밀번호 혹은 이메일이 일치하지 않습니다. 다시 시도하세요");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => getinfo())
      .then(() => {
        moveMain();
      });
  };

  const handleGoogleSignIn = async (e) => {
    
    await signInWithPopup(auth, gprovider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        getinfo();
        moveMain()

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      })
      .then(async() => {
        console.log('check 1');
        // getinfo();
        // moveMain();
      })
      .then(() => {

        console.log('check 2');
        // moveMain();
      });
  };

  const handleFBSignIn = () => {
    signInWithPopup(auth, fprovider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
//dispatch(fbSignInInitiate());
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div>
          <h2 className="mb-3">Cellabor Login</h2>
        </div>

        <div>
          <div
            style={{
              border: "1px solid ",
              borderRadius: 5,
              width: "79vw",
              height: "11vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBlock: "3vw",
            }}
            onClick={() => handleGoogleSignIn()}
          >
            <FcGoogle style={{ fontSize: 35 }} />
            <p
              style={{
                fontSize: 19,
                fontWeight: "bold",
              }}
            >
              &nbsp;Login with Google
            </p>
          </div>
          <div
            style={{
              border: "1px solid ",
              borderRadius: 5,
              width: "79vw",
              height: "11vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBlock: "3vw",
            }}
            onClick={() => handleFBSignIn()}
          >
            <FaFacebook style={{ fontSize: 35 }} />
            <p
              style={{
                fontSize: 19,
                fontWeight: "bold",
              }}
            >
              &nbsp;Login with Facebook
            </p>
          </div>

          {/*           
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
          <Button variant="primary" onClick={handleFBSignIn}>
            FACEBOOK
          </Button> */}
        </div>

        {/* 중간 경계선  */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBlock: "2vw",
          }}
        >
          <hr
            style={{
              background: "#000",
              color: "#000",
              borderColor: "#000",
              height: "1px",
              width: "35vw",
            }}
          />
          <p style={{ fontWeight: "bold", fontSize: 17, marginInline: "1vw" }}>
            or
          </p>
          <hr
            style={{
              background: "#000",
              color: "#000",
              borderColor: "#000",
              height: "1px",
              width: "35vw",
            }}
          />
        </div>

        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "80vw", padding: 10 }}
              /> */}
              <TextField
                id="outlined-basic"
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{width:'80vw', marginBlock: "1vw"}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "80vw", padding: 10 }}
              /> */}
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{width:'80vw', marginBlock: "1vw",}}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="Submit"
              style={{ width: "80vw", padding: 10, fontSize:19, fontWeight:'bold', marginBlock: "3vw", }}
            >
              Log In
            </Button>
          </Form>
        </div>
        <div className="p-4 box mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default INFLogin;

