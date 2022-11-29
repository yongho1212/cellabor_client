import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
// import Login from "./components/body/auth/Login";
import Signup from "./components/body/auth/Signup";
import Home from './components/body/homefolder/Home'
import HeaderLogin  from './components/header/HeaderLogin';
// import HeaderProfile from './components/header/HeaderProfile';

import Chatlist from './components/body/chatfolder/Chatlist';
import INFChatlist from './components/body/chatfolder/INFChatlist';
import ADChatlist from './components/body/chatfolder/ADChatlist';

import Chat from './components/body/chatfolder/Chat';
import INFChat from './components/body/chatfolder/INFChat';
import ADChat from './components/body/chatfolder/ADChat';

import InfluencerList from './components/body/inflist/influencerList';
import Search from './components/body/searchfolder/Search';
import UploadProfile from './components/body/profilefolder/UploadProfile';

import Profile from './components/body/profilefolder/Profile';
import ADProfile from './components/body/profilefolder/ADProfile';
import INFProfile from './components/body/profilefolder/INFProfile';


import DetailPage from './components/body/product/productdetailpagefolder/DetailPage';
import Main from './components/body/mainfolder/Main';
import Footer from './components/footerfolder/Footer';
import SearchResult from './components/body/searchfolder/SearchResult';
import EditProfile from './components/body/editprofilefolder/EditProfile';
import UploadProduct from './components/body/product/uploadproductfolder/UploadProduct';
import Workspace from './components/body/workspacefolder/Workspace';
// import Navbar from './components/body/workSpace/Navbar';
// import InfNavBar from './components/navbar/InfNavBar';
// import AdNavBar from './components/navbar/AdNavBar';
// import HomeNavBar from './components/navbar/HomeNavBar';
import DashMain from './components/body/workspacefolder/Dashmain';
import Layout from './layoutfolder/Layout'

import Emailverify from './components/body/auth/Emailverify'
import SignupChooseRole from './components/body/auth/SignupChooseRole';
import LoginChooseRole from './components/body/auth/LoginChooseRole';

import ADSignup from './components/body/auth/ADSignup';
import INFSignup from './components/body/auth/INFSignup';
import ADLogin from './components/body/auth/ADLogin';
import INFLogin from './components/body/auth/INFLogin';
import INFDeleteUser from './components/body/profilefolder/INFDeleteUser';
import ADDeleteUser from './components/body/profilefolder/ADDeleteUser';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';
import EditDetailpage from './components/body/product/productdetailpagefolder/EditDetailPage';
import InfluencerProfile from './components/body/profilefolder/InfluencerProfile';
// import { db } from './firebase';

function App() {

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const { fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const auth = getAuth();
  const [loggedin , setLoggedin] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  });
  console.log(auth?.currentUser?.email)
  
  const emailVerified =  auth?.currentUser?.emailVerified

  return (
    <BrowserRouter>
    { loggedin ?
      console.log('logged in')
    : 
    <>
      <HeaderLogin />
    </>
    }
        <Routes >
        { !loggedin ?
          <>
          <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />}  />
            {/* <Route path="/Login" element={<Login />} /> */}
            <Route path="/ADLogin" element={<ADLogin />} />
            <Route path="/INFLogin" element={<INFLogin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/ADSignup" element={<ADSignup />} />
            <Route path="/INFSignup" element={<INFSignup />} />
            <Route path="/SignupChooseRole" element={<SignupChooseRole />} />
            <Route path="/LoginChooseRole" element={<LoginChooseRole />} />
          </>  
          :
          <>
           {!emailVerified ? <Route path="/Emailverify/*" element={<Emailverify />} />
          : 
          
          
          <Route  element={<Layout />}>
            <Route path="/Main/*" element={<Main />} />
            <Route path="/SearchResult/:text" element={<SearchResult />} />
            <Route path="/UploadProfile" element={<UploadProfile/>} />
            <Route path="/Detail/:id" element={<DetailPage />} />
            <Route path="/EditDetailPage/:id" element={<EditDetailpage />} />
            <Route path="/Profile/*" element={<Profile />} />
            <Route path="/ADProfile/*" element={<ADProfile />} />
            <Route path="/INFProfile/*" element={<INFProfile />} />
            <Route path="/INFDeleteUser/*" element={<INFDeleteUser />} />
            <Route path="/ADDeleteUser/*" element={<ADDeleteUser />} />
            
            
            <Route path="/Chatlist/*" element={<Chatlist />} />
            <Route path="/ADChatlist/*" element={<ADChatlist />} />
            <Route path="/INFChatlist/*" element={<INFChatlist />} />

            <Route path="/Chat/:id" element={<Chat />} />
            <Route path="/ADChat/:id" element={<ADChat />} />
            <Route path="/INFChat/:id" element={<INFChat />} />

            
            <Route path="/Search/*" element={<Search />} />
            <Route path="/EditProfile/*" element={<EditProfile />} />
            <Route path="/Upload/" element={<UploadProduct />} />
            {/* <Route path="/Influencerprflist/" element={<InfluencerList />} /> */}
            <Route path="/Workspace/" element={<Workspace />} />
            <Route path="/DashMain/" element={<DashMain />} />
            <Route path="/InfluencerProfile/:id" element={<InfluencerProfile />} />
          </Route>
          }
          </>
          }
        </Routes>
      <Footer style={{display: 'flex'}}/>
    </BrowserRouter>
    
  );
}

export default App;
