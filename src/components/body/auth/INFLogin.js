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
  TwitterAuthProvider,
  signInWithPopup,
  getAuth,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  signOut,
  deleteUser
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import "./Login.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { infUserInfo, infPrd } from "../../../api";

const INFLogin = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, fbuser, nofbuser, prependprd, infloginUser } =
    bindActionCreators(actionCreators, dispatch);
  const [email, setEmail] = useState("");
  const [testUid, setTestUid] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const gprovider = new GoogleAuthProvider();
  const fprovider = new FacebookAuthProvider();
  const twprovider = new TwitterAuthProvider();
  const [infor, setInfor] = useState("");

  const queryClient = new QueryClient();

  // useEffect(() => {
  //   if (state.loggedin) {
  //     navigate("/Main");
  //   }
  // }, [state.loggedin, navigate]);

  const moveMain = () => {
    navigate("/Main");
  };
  const moveSignup = () => {
    navigate("/INFSignup");
  };

  const uid = testUid;
  console.log(uid);

  const infQuery = useQuery({
    queryKey: ["inf"],
    queryFn: () => infUserInfo(uid),
    staleTime: 1000 * 60,
  });
  if (infQuery.isLoading === "loading") console.log("loading");
  if (infQuery.status === "error") console.log("err");
  console.log(infQuery.data);

  const getinfo = async () => {
    setTestUid(auth.currentUser.uid);
    // const uid = auth.currentUser.uid;
    // const response = await axios
    //   .get(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo`, {
    //     params: { uid: uid },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     const infloginData = res.data;
    //     infloginUser(infloginData);
    //     loginUser(infloginData);
    // fbuser(true); ========================================================================
    //  getListById();
    // })
    // .catch((error) => {
    //   console.log(error.response);
    // });
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

  // const dbChecker = async (user) => {
  //   await axios
  //   .get(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo`, {
  //     params: { uid: uid },
  //   })
  //   .then((res) => {
  //     if (!res.data){
  //       deleteUser(user);
  //       moveSignup();
  //       alert('회원 정보가 없습니다. 회원가입을 먼저 진행해주세요!')
  //     }
  //   });
  // };

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
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const uid = result.user.uid;
        const user = result.user;
        const response = await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo`, {
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
      });
  };

  const handleFBSignIn = async () => {
    await signInWithPopup(auth, fprovider)
      .then(async(result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const uid = result.user.uid;
        const response = await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo`, {
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

  const handleTWSignIn = async () => {
    await signInWithPopup(auth, twprovider)
      .then(async(result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const uid = result.user.uid;
        
        const response = await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo`, {
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
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
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
            onClick={() => handleTWSignIn()}
          >
            <FaFacebook style={{ fontSize: 35 }} />
            <p
              style={{
                fontSize: 19,
                fontWeight: "bold",
              }}
            >
              &nbsp;Login with Twitter
            </p>
          </div>
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
                style={{ width: "80vw", marginBlock: "1vw" }}
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
                style={{ width: "80vw", marginBlock: "1vw" }}
              />
            </Form.Group>

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
