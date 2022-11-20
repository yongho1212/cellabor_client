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

import { InputLabel, Typography } from "@mui/material";
import { Input } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Inputpassword from "./INFDeleteUser";
import UploadProfile from "./UploadProfile";

import { async } from "@firebase/util";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

import "./INFProfile.css";

import { BsPersonFill } from "react-icons/bs";
import * as grd from "./prfcomponents";
import styled from "styled-components";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const INFProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [password, setPassword] = useState("");

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
  console.log(state.influencer.state.infloginData.role);

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
    navigate("/INFDeleteUser");
  };

  // const dd = useQuery({ queryKey: ['inf'], ... })
  // console.log(inf)

  return (
    // <div className="container">
    <>
      <grd.Container>
        <grd.SideBar>
          <div style={{flexDirection:'column'}}>
            <Avatar
              alt="Remy Sharp"
              src={state.influencer.state.infloginData.avatar}
              sx={{ width: 179, height: 179 }}
              style={{marginTop: '10vh', marginLeft: '1vh'}}
            />
            <div>{state.influencer.state.infloginData.nickname}</div>
            <div>{state.influencer.state.infloginData.role}</div>
            <div>{state.influencer.state.infloginData.aboutme}</div>
          </div>
            
               
             
        </grd.SideBar>
        <grd.Main>
        
        개인정보 지역 등등   <br />
        성별
             {state.influencer.state.infloginData.sex}
             <br />
             생일
             {state.influencer.state.infloginData.birthday}
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
             위치
             {state.influencer.state.infloginData.location}
             <br />
        </grd.Main>
        <grd.ContentBox>  
          <grd.Content1>
          <div>Basic Information</div>
          <div className="sns_conatiner">
            <div className="sns_box">유튜브</div>
            <div className="sns_box">인스타그램</div>
            <div className="sns_box">페이스북</div>
            <div className="sns_box">틱톡</div>
            <div className="sns_box">트위터</div>
          </div>
          
          </grd.Content1>
          <grd.Content2>
            
          </grd.Content2>
        </grd.ContentBox>

        
      </grd.Container>
    </>
    //   <div style={{ width: "80vw" }}>
    //     {/* 프로필카드 컨테이너 */}
    //     <div
    //       style={{
    //         backgroundColor: "#fff",
    //       }}
    //     >
    //       {/* 사진부터 롤까지 상단 컨테이너 */}
    //       <div className="img-name-container">
    //         {/* 상단프로필 상단박스 */}
    //         <div className="top-blank-box">
    //         <Avatar
    //             alt="Remy Sharp"
    //             src={state.influencer.state.infloginData.avatar}
    //             sx={{ width: 179, height: 179 }}
    //             style={{marginTop: '10vh', marginLeft: '1vh', position: 'absolute'}}

    //           />
    //         </div>

    //         {/* 수정버튼 / 정보 컨테이너*/}
    //         <div className="btm-box-info-container">
    //           {/* 수정버튼 및 클릭시 다이얼로그 */}
    //           <div className="bottom-box-container">
    //           <div className="bottom-box">
    //             <Button variant="outlined" onClick={handleClickOpen("paper")}>
    //               Edit Profile
    //             </Button>

    //             <Dialog
    //               open={open}
    //               onClose={handleClose}
    //               scroll={scroll}
    //               aria-labelledby="scroll-dialog-title"
    //               aria-describedby="scroll-dialog-description"
    //               fullWidth="true"
    //               maxWidth="40px"
    //               style={{ zIndex: 50 }}
    //             >
    //               <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
    //               <DialogContent dividers={scroll === "paper"}>
    //                 <UploadProfile />
    //               </DialogContent>
    //               <DialogActions>
    //                 <Button onClick={handleClose}>Cancel</Button>

    //                 <Button
    //                   positive
    //                   form="my-form"
    //                   content="Submit"
    //                   value="Submit"
    //                   type="Submit"
    //                 >
    //                   저장
    //                 </Button>
    //               </DialogActions>
    //             </Dialog>
    //           </div>
    //           </div>

    //           {/* 중요정보 컨테이너 */}
    //           <div className="name-role-container">
    //             {/* 나의 닉네임 */}
    //             <div style={{ fontSize: "40px" }}>
    //               {state.influencer.state.infloginData.nickname}
    //             </div>

    //             {/* 나의 롤 */}
    //             <div style={{ fontSize: "25px", color: "grey" }}>
    //               {state.influencer.state.infloginData.role}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div>
    //         <br />
    //         {/* 정보 컨테이너 */}
    //         <div className="specified-info-container">
    //           <div className="info-icon">
    //             <BsPersonFill />
    //           </div>
    //           <div className="info-text-container">
    //             <div className="info-text-me">
    //               {state.influencer.state.infloginData.sex}
    //             </div>
    //             <div className="info-text-category">
    //               sex
    //             </div>

    //           </div>

    //         </div>

    //         성별
    //         {state.influencer.state.infloginData.sex}
    //         <br />
    //         생일
    //         {state.influencer.state.infloginData.birthday}
    //         <br />
    //         인스타
    //         {state.influencer.state.infloginData.insta}
    //         <br />
    //         이메일
    //         {state.influencer.state.infloginData.email}
    //         <br />
    //         조인체널
    //         {state.influencer.state.infloginData.joined_channel}
    //         <br />
    //         번호
    //         {state.influencer.state.infloginData.mobile}
    //         <br />
    //         태그
    //         {state.influencer.state.infloginData.tags}
    //         <br />
    //         위치
    //         {state.influencer.state.infloginData.location}
    //         <br />
    //       </div>
    //       <div></div>
    //     </div>

    //     <div style={{ backgroundColor: "#a78" }}>
    //       <Button onClick={() => goDelete()}>회원탈퇴</Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default INFProfile;
