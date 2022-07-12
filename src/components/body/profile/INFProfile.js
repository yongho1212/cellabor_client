import React, { useEffect, useState } from "react";

import {
  reauthenticateWithCredential,
  EmailAuthProvider,
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


import Inputpassword from './INFDeleteUser';
import UploadProfile from "./UploadProfile";

import { async } from "@firebase/util";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

const INFProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser, infloginUser } =
    bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = state.influencer.state.infloginData.uid;

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(state.influencer.state.infloginData.role)

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

  const goDelete = () => {
    navigate("/INFDeleteUser")
  }


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#667",
      }}
    >
      <div style={{ width: "50vw" }}>
        <Box
          style={{
            backgroundColor: "#fff",
          }}
          sx={{ flexGrow: 1 }}
        >
          <Grid style={{}}>
            <div style={{ backgroundColor: "red", margin: "15px" }}>
              <h1>Hello! It's profile page.</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  backgroundColor: "blue",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={state.influencer.state.infloginData.avatar}
                  sx={{ width: 170, height: 170 }}
                />

                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    height: "170",
                    backgroundColor: "#fff",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div>
                      <Button onClick={handleClickOpen("paper")}>수정</Button>

                      <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        fullWidth="true"
                        maxWidth="40px"
                        style={{zIndex:50}}
                      >
                        <DialogTitle id="scroll-dialog-title">
                          Subscribe
                        </DialogTitle>
                        <DialogContent dividers={scroll === "paper"}>
                          <UploadProfile />
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
                    {state.influencer.state.infloginData.nickname}
                  </Typography>
                  <Typography style={{ fontSize: "25px", color: "grey" }}>
                    {state.influencer.state.infloginData.role}
                  </Typography>
                </div>
              </div>

              <div>
                <br />
                성별
                {state.influencer.state.infloginData.sex}
                <br />
                생일
                {state.influencer.state.infloginData.birthday}
                <br />
                인스타
                {state.influencer.state.infloginData.insta}
                <br />
                이메일
                {state.influencer.state.infloginData.email}
                <br />
                조인체널
                {state.influencer.state.infloginData.joined_channel}
                <br />
                번호
                {state.influencer.state.infloginData.mobile}
                <br />
                태그
                {state.influencer.state.infloginData.tags}
                <br />
                위치
                {state.influencer.state.infloginData.location}
                <br />
              </div>
              <div>
              </div>
            </div>
          </Grid>

          
        </Box>

        <div style={{ backgroundColor: "#a78" }}>
          <Button onClick={() => goDelete()}>회원탈퇴</Button>
        </div>
      </div>
    </div>
  );
};

export default INFProfile;
