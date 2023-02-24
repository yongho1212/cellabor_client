import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css'

import InfNavBar from '../components/navbar/InfNavBar';
import AdNavBar from '../components/navbar/AdNavBar';
import HeaderAD from '../components/header/HeaderAD';
import HeaderINF from '../components/header/HeaderINF';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import {
  getAuth,
  signOut
} from "firebase/auth";

import handleLogout from '../components/body/auth/Logout'
import { useQuery, useMutation } from "@tanstack/react-query";
import { infUserInfo, adUserInfo } from '../api'

const Layout = () => {

  // const [userRole, setUserRole] = useState('')
  const auth = getAuth();

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  // const checker = state.auth.state.loginData 
  // console.log(checker)
  // if ( checker === false ){
  //   async function handleLogout() {
  //     try {
  //       logoutUser();
  //       nofbuser(false);
  //       signOut(auth);
  //       navigate("/Home");
  //       console.log("logout");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }
  const uid = auth?.currentUser?.uid || "undefined";
  const infQuery = useQuery({
    queryKey: ["inf"],
    queryFn: () => infUserInfo(uid),
  });
  if (infQuery.isLoading === "loading") console.log("loading");
  if (infQuery.status === "error") console.log("err");
  


  const adQuery = useQuery({
    queryKey: ["ad"],
    queryFn: () => adUserInfo(uid),
  });
  if (adQuery.isLoading === "loading") console.log("loading");
  if (adQuery.status === "error") console.log("err");
  
  const adr = adQuery?.data?.data?.role
  
 const userRole = adQuery?.data?.data?.role || infQuery?.data?.data?.role
  




  // const sidebarRender = () => {
  //   if (myrole === "influencer"){
  //     return(<InfNavBar />)
  //   } else {
  //     return(<AdNavBar />)
  //   }
  // }


  return (
    <div className="layout">

      <header className="header">
      {
          userRole === "influencer"
          ? <HeaderINF />
          : <HeaderAD />
        }
      </header>
      {/* <aside urticaria className="aside">
      {
          myrole === "influencer"
          ? <InfNavBar />
          : <AdNavBar />
      }
      </aside> */}
    <main className="main">
      <Outlet />
    </main>
    {/* <footer className="footer">
        Footer
    </footer> */}
  </div>
  )
}

export default Layout
