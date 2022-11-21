import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import {
  getAuth,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

import "./INFProfile.css";
import * as grd from "./prfcomponents";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { infUserInfo } from "../../../api";



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
  //const uid = data?.data?.uid;

    const uid = auth?.currentUser?.uid || "undefined"
    const { data, status } = useQuery({
      queryKey: ["inf"],
      queryFn: () => infUserInfo(uid),
    });
    if (status === "loading") console.log("loading");
    if (status === "error") alert("some err occured");
    console.log(data);
  

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(data?.data?.role);

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
              src={data?.data?.avatar}
              sx={{ width: 179, height: 179 }}
              style={{marginTop: '10vh', marginLeft: '1vh'}}
            />
            <div>{data?.data?.nickname}</div>
            <div>{data?.data?.sex}</div>
            <div>{data?.data?.facebook}</div>
            <div>{data?.data?.aboutme}</div>
          </div>
            
               
             
        </grd.SideBar>
        <grd.Main>
        
        개인정보 지역 등등   <br />
        성별
             {data?.data?.sex}
             <br />
             생일
             {data?.data?.birthday}
             <br />
             
             이메일
             {data?.data?.email}
             <br />
             조인체널
             {data?.data?.joined_channel}
             <br />
             번호
             {data?.data?.mobile}
             <br />
             태그
             위치
             {data?.data?.location}
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
    //             src={data?.data?.avatar}
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
    //               {data?.data?.nickname}
    //             </div>

    //             {/* 나의 롤 */}
    //             <div style={{ fontSize: "25px", color: "grey" }}>
    //               {data?.data?.role}
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
    //               {data?.data?.sex}
    //             </div>
    //             <div className="info-text-category">
    //               sex
    //             </div>

    //           </div>

    //         </div>

    //         성별
    //         {data?.data?.sex}
    //         <br />
    //         생일
    //         {data?.data?.birthday}
    //         <br />
    //         인스타
    //         {data?.data?.insta}
    //         <br />
    //         이메일
    //         {data?.data?.email}
    //         <br />
    //         조인체널
    //         {data?.data?.joined_channel}
    //         <br />
    //         번호
    //         {data?.data?.mobile}
    //         <br />
    //         태그
    //         {data?.data?.tags}
    //         <br />
    //         위치
    //         {data?.data?.location}
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
