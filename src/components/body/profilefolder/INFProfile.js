import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { BsYoutube, BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import {FaBlog} from 'react-icons/fa'
import {VscDebugDisconnect} from 'react-icons/vsc';
import {AiOutlineDisconnect} from 'react-icons/ai';
import { GrConnect } from 'react-icons/gr'


import { getAuth, updateProfile, signOut } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

import "./INFProfile.css";
import * as grd from "./prfcomponents";

import { useQuery, useMutation } from "@tanstack/react-query";
import { infUserInfo } from "../../../api";
import UploadProfile from "./UploadProfile";
import axios from "axios";

const INFProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [password, setPassword] = useState("");
  const [youtbeVerified, setYoutubeVerified] = React.useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser, infloginUser } =
    bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const auth = getAuth();

  const apicall = async () => {
    const res = await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/inf/test`)
      .then((res) => console.log(res.data));
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    console.log("클릭 실행");
    console.log(uid);
    const res = await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/inf/verifyUserWithYoutube`, {
        uid,
      })
      .then(function (res) {
        console.log(res.data);
      });
    console.log("완료", res);
  };

  const handleDisconnetClick = async () => {
    console.log("disconnet 실행");
    // const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/inf/test`)
    // console.log('완료', res);
  };

  const uid = auth?.currentUser?.uid || "undefined";
  const infQuery = useQuery({
    queryKey: ["inf"],
    queryFn: () => infUserInfo(uid),
  });
  if (infQuery.isLoading === "loading") console.log("loading");
  if (infQuery.status === "error") console.log("err");
  // console.log(infQuery.data);



  const snsUrlData = {
    facebookdata:{
      title : 'facebook',
      url: `https://www.facebook.com`
    },
    youtubedata:{
      title: "youtube",
      url: `https://www.youtube.com/channel/${infQuery?.data?.data?.youtube?.channelId}`,
    },
    blogdata:{
      title: "blog",
      url: `https://www.tistory.com`,
    },
    twitterdata:{
      title: "twitter",
      url: `https://www.twitter.com`,
    },
    instadata:{
      title: "insta",
      url: `https://www.instagram.com`,
    },



  }

  



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

  const StatusBtn = (sns) => {
    return(
      <>
      <div className="sns_textContainer">
                  {/* <div className="sns_status">status</div> */}

                  {infQuery?.data?.data?.sns?.verify ? (
                    <>
                      <div className="sns_connect">connected</div>
                      <div className="sns_disconnect">
                        <button
                          variant="contained"
                          className="disconnectBtn"
                          onClick={handleDisconnetClick}
                        >
                          끊기
                        </button>
                        
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sns_connect">
                        <button 
                        variant="contained" 
                        className="connectBtn"
                        onClick={() => console.log(sns)}>
                          연결
                        </button>
                      </div>
                      <div className="sns_disconnect">
                        <AiOutlineDisconnect 
                        style={{
                          fontSize:'25px', fontWeight:'bold'}}
                        />
                      </div>
                    </>
                  )}
                </div>
      </>
    )
  }

  return (
    // <div className="container">
    <>
      <grd.Container>
        <grd.SideBar>
          <div style={{ display:'flex', flexDirection:'column', }}>
            <Avatar
              alt="Remy Sharp"
              src={infQuery?.data?.data?.avatar}
              sx={{ width: 179, height: 179 }}
              style={{ marginTop: "15px",  }}
            />
            <div className="infDataNickname">{infQuery?.data?.data?.nickname}</div>
            <div>{infQuery?.data?.data?.sex}</div>
            <div>{infQuery?.data?.data?.role}</div>
            <div>{infQuery?.data?.data?.about}</div>
          </div>
        </grd.SideBar>
        <grd.Main>
          <div>
            <div className="btm-box-info-container">
              {/* 수정버튼 및 클릭시 다이얼로그  */}
              <div className="bottom-box-container">
                <div className="bottom-box">
                  <Button variant="outlined" onClick={handleClickOpen("paper")}>
                    Edit Profile
                  </Button>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth="true"
                    maxWidth="40px"
                    style={{ zIndex: 50 }}
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
            </div>

            <div className="information-container">
              <div className="info-row-cntainer">
                <div className="line-items">
                  <div className="section-name">성별</div>
                  <div className="section-value">
                    {infQuery?.data?.data?.sex}
                  </div>
                </div>
                <div className="line-items">
                  <div className="section-name">생일</div>
                  <div className="section-value">
                    {infQuery?.data?.data?.birthday}
                  </div>
                </div>
                <div className="line-items">
                  <div className="section-name">이메일</div>
                  <div className="section-value">
                    {infQuery?.data?.data?.email}
                  </div>
                </div>
              </div>
              <div className="info-row-cntainer">
                <div className="line-items">
                  <div className="section-name">번호</div>
                  <div className="section-value">
                    {infQuery?.data?.data?.mobile}
                  </div>
                </div>
                <div className="line-items">
                  <div className="section-name">태그</div>
                  <div className="section-value">
                    {infQuery?.data?.data?.tags}
                  </div>
                </div>
                <div className="line-items">
                  <div className="section-name">위치</div>
                  <div className="section-value">
                    {infQuery?.data?.data?.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </grd.Main>
        <grd.ContentBox>
        <div className="sns_conatiner">
              {/* 유튜브 */}
              <div className="sns_box">
                <div className="sns_logo">
                  <a 
                  href={snsUrlData.youtubedata.url}
                  style={{display:'flex'}}
                  >
                    <BsYoutube style={{ fontSize: "40px", color: "red" }} />
                  </a>
                </div>

                <div className="sns_textContainer">
                  {/* <div className="sns_status">status</div> */}

                  {infQuery?.data?.data?.youtube?.verify ? (
                    <>
                      <div className="sns_connect">
                      <GrConnect 
                      style={{
                        fontSize:'25px'
                      }}
                      />
                      </div>
                      
                      <div className="sns_disconnect">
                        <button
                          variant="contained"
                          onClick={handleDisconnetClick}
                          className="disconnectBtn"
                        >
                          끊기
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sns_connect">
                        <Button variant="contained" onClick={handleClick}>
                          connect
                        </Button>
                      </div>
                      <div className="sns_disconnect">disconnected</div>
                    </>
                  )}
                  {/* <Button variant="contained" onClick={handleClick}>connect</Button>

                  </div>
                  <div className="sns_disconnect">disconnect</div> */}
                </div>
              </div>
              {/* 인스타 */}
              <div className="sns_box">
              <div className="sns_logo">
                  <a 
                  href={snsUrlData.instadata.url}
                  style={{display:'flex'}}
                  >
                    <BsInstagram style={{ fontSize: "40px", color: "#8c3ac3",  }} />
                  </a>
                </div>
                <StatusBtn 
                sns='insta'
                />
              </div>
              {/* 블로그 */}
              <div className="sns_box">
              <div className="sns_logo">
                  <a 
                  href={snsUrlData.blogdata.url}
                  style={{display:'flex'}}
                  >
                    <FaBlog style={{ fontSize: "40px", color: "#2db400" }} />
                  </a>
                </div>
                <StatusBtn 
                sns='blog'
                />
                
              </div>
              {/* 트위터 */}
              <div className="sns_box">
              <div className="sns_logo">
                  <a 
                  href={snsUrlData.twitterdata.url}
                  style={{display:'flex'}}
                  >
                    <BsTwitter style={{ fontSize: "40px", color: "#00acee" }} />
                  </a>
                </div>
                <StatusBtn 
                sns='twitter'
                />
              </div>
              {/* 페이스북 */}
              <div className="sns_box">
              <div className="sns_logo">
                  <a 
                  href={snsUrlData.facebookdata.url}
                  style={{display:'flex'}}
                  >
                    <BsFacebook style={{ fontSize: "40px", color: "#3b5998" }} />
                  </a>
                </div>
                <StatusBtn 
                sns='facebook'
                />
              </div>
            </div>
          {/* <grd.Content1>
            
          </grd.Content1> */}
          
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
    //             src={infQuery?.data?.data?.avatar}
    //             sx={{ width: 179, height: 179 }}
    //             style={{marginTop: '10vh', marginLeft: '1vh', position: 'absolute'}}

    //           />
    //         </div>

    //

    //           {/* 중요정보 컨테이너 */}
    //           <div className="name-role-container">
    //             {/* 나의 닉네임 */}
    //             <div style={{ fontSize: "40px" }}>
    //               {infQuery?.data?.data?.nickname}
    //             </div>

    //             {/* 나의 롤 */}
    //             <div style={{ fontSize: "25px", color: "grey" }}>
    //               {infQuery?.data?.data?.role}
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
    //               {infQuery?.data?.data?.sex}
    //             </div>
    //             <div className="info-text-category">
    //               sex
    //             </div>

    //           </div>

    //         </div>

    //         성별
    //         {infQuery?.data?.data?.sex}
    //         <br />
    //         생일
    //         {infQuery?.data?.data?.birthday}
    //         <br />
    //         인스타
    //         {infQuery?.data?.data?.insta}
    //         <br />
    //         이메일
    //         {infQuery?.data?.data?.email}
    //         <br />
    //         조인체널
    //         {infQuery?.data?.data?.joined_channel}
    //         <br />
    //         번호
    //         {infQuery?.data?.data?.mobile}
    //         <br />
    //         태그
    //         {infQuery?.data?.data?.tags}
    //         <br />
    //         위치
    //         {infQuery?.data?.data?.location}
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
