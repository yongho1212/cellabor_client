import React, { useEffect, useState } from "react";

import {
  reauthenticateWithCredential,
  signOut,
  deleteUser,
  getAuth,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import { Form, Alert, Button } from "react-bootstrap";
import { InputLabel, Typography } from "@mui/material";
import { Input } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ADEditProfile from "./ADEditprofile";
import Myprd from "../workspacefolder/Myprd";

import { async } from "@firebase/util";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adUserInfo } from "../../../api";

import * as grd from "./prfcomponents";
import "./ADProfile.css";

const ADProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser, adloginUser } =
    bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = auth?.currentUser?.uid || "undefined";

  const adQuery = useQuery({
    queryKey: ["ad"],
    queryFn: () => adUserInfo(uid),
  });
  if (adQuery.isLoading === "loading") console.log("loading");
  if (adQuery.status === "error") console.log("err");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (!fbuser) {
      navigate("/Home");
    }
  });

  const editProfile = () => {
    navigate("/EditProfile");
  };

  const goDelete = () => {
    navigate("/ADDeleteUser");
  };

  const handleLogout = async () => {
    try {
      navigate("/Home");
      logoutUser();
      nofbuser(false);
      signOut(auth);
      console.log("logout");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUserAll = async () => {
    if (window.confirm("정말 탈퇴하시겠습니다?")) {
      const res = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/user/delete`, { uid })
        .then((res) => {
          console.log(res.data);
          console.log("success");
        })
        .then(() => {
          deleteUser(user);
          console.log("firebase deleted");
        })
        .then(() => {
          handleLogout();
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
      alert("삭제완료!");
    } else {
      alert("취소");
    }
  };

  return (
    <>
      <grd.Container>
        <grd.SideBar>
          <div style={{ flexDirection: "column" }}>
            <Avatar
              alt="Remy Sharp"
              src={adQuery?.data?.data?.logo}
              sx={{ width: 179, height: 179 }}
              style={{
                marginTop: "30px",
                marginLeft: "1vh",
              }}
            />
            <div style={{justifyContent:'flex-start'}}> 

            <div className="sidebarInfoContainer">
              <div className="sidebarInfoName">브랜드 이름</div>
              <div className="sidebarInfoInfo">{adQuery?.data?.data?.brand_name}</div>
            </div>

            <div className="sidebarInfoContainer">
              <div className="sidebarInfoName">카테고리</div>
              <div className="sidebarInfoInfo">카테고리 업종</div>
            </div>

            <div className="sidebarInfoContainer">
              <div className="sidebarInfoName">위치</div>
              <div className="sidebarInfoInfo">{adQuery?.data?.data?.location}</div>
            </div>
              
              
            </div>
          </div>
        </grd.SideBar>

       
        <grd.ContentBox>
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#667",
              }}
            >
              <div style={{ width: "100%" }}>
                <Box
                  style={{
                    backgroundColor: "#fff",
                  }}
                  sx={{ flexGrow: 1 }}
                >
                  <Grid style={{}}>
                    <div style={{ backgroundColor:'grey', width:'100%',height:'100%' }}>
                      {/* 프로필 수정 다이얼로그 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-end",
                          backgroundColor: "blue",
                        }}
                      >
                        <div
                          style={{
                            
                            width: "100%",
                            height: "170",
                            backgroundColor: "#fff",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div>
                              <Button onClick={handleClickOpen("paper")}>
                                수정
                              </Button>

                              <Dialog
                                open={open}
                                onClose={handleClose}
                                scroll={scroll}
                                aria-labelledby="scroll-dialog-title"
                                aria-describedby="scroll-dialog-description"
                                fullWidth={true}
                                maxWidth="40px"
                              >
                                <DialogTitle id="scroll-dialog-title">
                                  Subscribe
                                </DialogTitle>
                                <DialogContent dividers={scroll === "paper"}>
                                  <ADEditProfile />
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>Cancel</Button>

                                  <Button
                                    positive
                                    form="my-form"
                                    content="Submit"
                                    value="Submit"
                                    type="Submit"
                                  >
                                    저장
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </div>
                          <Typography style={{ fontSize: "40px" }}>
                            brand name// {adQuery?.data?.data?.brand_name}
                          </Typography>
                          <Typography
                            style={{ fontSize: "25px", color: "grey" }}
                          >
                            details
                          </Typography>
                        </div>
                      </div>

                      <div>
                        <br />
                        인스타
                        {adQuery?.data?.data?.insta}
                        <br />
                        이메일
                        {adQuery?.data?.data?.email}
                        <br />
                        조인체널
                        {adQuery?.data?.data?.joined_channel}
                        <br />
                        번호
                        {adQuery?.data?.data?.mobile}
                        <br />
                        태그
                        {adQuery?.data?.data?.tags}
                        <br />
                      </div>
                    </div>
                  </Grid>

                  {/* <FacebookLoginButton/> */}
                </Box>
                <Button onClick={() => handleLogout()}>로그아웃</Button>

                <div style={{ }}>
                  <Button onClick={() => goDelete()}>회원탈퇴</Button>
                </div>
              </div>
            </div>
          {/* <grd.Content1>
            
          </grd.Content1> */}
          {/* <grd.Content2>
            
          </grd.Content2> */}
        </grd.ContentBox>
        <grd.Main>
          
          <div style={{justifyContent:'center', display:'flex', alignItems:'center', height:'80vh'}}>
            <Myprd />
          </div>
        </grd.Main>
      </grd.Container>
    </>
  );
};

export default ADProfile;
