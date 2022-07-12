import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./components/body/auth/Login";
import Signup from "./components/body/auth/Signup";
import Home from './components/body/home/Home'
import HeaderLogin  from './components/header/HeaderLogin';
// import HeaderProfile from './components/header/HeaderProfile';

import Chatlist from './components/body/chat/Chatlist';
import INFChatlist from './components/body/chat/INFChatlist';
import ADChatlist from './components/body/chat/ADChatlist';

import Chat from './components/body/chat/Chat';
import INFChat from './components/body/chat/INFChat';
import ADChat from './components/body/chat/ADChat';

import InfluencerList from './components/body/inflist/influencerList';
import Search from './components/body/search/Search';
import UploadProfile from './components/body/profile/UploadProfile';

import Profile from './components/body/profile/Profile';
import ADProfile from './components/body/profile/ADProfile';
import INFProfile from './components/body/profile/INFProfile';


import DetailPage from './components/body/product/productdetailpage/DetailPage';
import Main from './components/body/main/Main';
import Footer from './components/footer/Footer';
import SearchResult from './components/body/search/SearchResult';
import EditProfile from './components/body/editprofile/EditProfile';
import UploadProduct from './components/body/product/uploadproduct/UploadProduct';
import Workspace from './components/body/workspace/Workspace';
// import Navbar from './components/body/workSpace/Navbar';
// import InfNavBar from './components/navbar/InfNavBar';
// import AdNavBar from './components/navbar/AdNavBar';
// import HomeNavBar from './components/navbar/HomeNavBar';
import DashMain from './components/body/workspace/Dashmain';
import Layout from './layout/Layout'

import Emailverify from './components/body/auth/Emailverify'
import SignupChooseRole from './components/body/auth/SignupChooseRole';
import LoginChooseRole from './components/body/auth/LoginChooseRole';

import ADSignup from './components/body/auth/ADSignup';
import INFSignup from './components/body/auth/INFSignup';
import ADLogin from './components/body/auth/ADLogin';
import INFLogin from './components/body/auth/INFLogin';
import INFDeleteUser from './components/body/profile/INFDeleteUser';
import ADDeleteUser from './components/body/profile/ADDeleteUser';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';
import EditDetailpage from './components/body/product/productdetailpage/EditDetailPage';
import InfluencerProfile from './components/body/profile/InfluencerProfile';
// import { db } from './firebase';

function App() {

  // const [userRole, setUserRole] = useState('')
  // console.log(userRole);
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const { fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const auth = getAuth();
  // const user = auth.currentUser;

  // const role = state.auth.role

  // const searchRole = () => {
  //   setUserRole(state.auth.role)
  // }
  
  // useEffect(() => {
  //   searchRole();
  // }, [])
  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      fbuser(true);
    } else {
      nofbuser(false);
    }
  });
  console.log(state.loggedin)
  
  

  return (
    <BrowserRouter>
    { state.loggedin ?
      console.log('s')
    : 
      <HeaderLogin />
    }

    
        <Routes >
        { !state.loggedin ?
          <>
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
          
          <Route path="/Emailverify/*" element={<Emailverify />} />
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
          </>
          }
        </Routes>
      <Footer style={{display: 'flex'}}/>
    </BrowserRouter>
    
  );
}

export default App;
