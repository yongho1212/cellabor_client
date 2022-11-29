import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Search from "../body/searchfolder/Search";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { getAuth, signOut } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

import {
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

import "./HeaderINF.css";


const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const HeaderINF = () => {
  const [userRole, setUserRole] = useState("");
  const [text, setText] = React.useState("");
  
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const auth = getAuth();
  const queryClient = new QueryClient();

  const showButton = () => {
    if (window.innerWidth <= 500) {
      setButton(false);
      
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return {};
  }, []);

  /*  useEffect(() => {
    const getRole = async() => {
      try{
        setUserRole(state);
        console.log(state.auth.role)
      } catch(e){
        console.log(e)
      }
    } ;
    getRole();

    
  },[])


  const handleAuth = () => {
    if (user) {
      dispatch(logOutInitiate());
    }
  };
*/


  let navigate = useNavigate();

  function handleSearch() {
    navigate("/SearchResult");
    <Search value={text} />;
  }

  function handleUploadProfile() {
    navigate("/UploadProfile");
  }

  function handleClickMain() {
    navigate("/Main");
  }
  function handleClickChat() {
    navigate("/INFChatlist");
  }
  function handleClickSearch() {
    navigate("/Search");
  }
  function handleClickUpload() {
    navigate("/Upload");
  }
  function handleClickInfprflist() {
    navigate("/Influencerprflist");
  }

  async function handleLogout() {
    try {
      queryClient.removeQueries('inf')
      nofbuser(false);
      signOut(auth);
      navigate("/Home");
      console.log("logout");
    } catch (err) {
      console.log(err);
    }
  }
  function handleClickProfile() {
    navigate("/INFProfile");
  }
  function workSpace() {
    navigate("/Workspace");
  }

  // 500이하, 900 이상에서만 활성화됨 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link
              to="Main"
              className='navbar-logo' 
              onClick={closeMobileMenu}
              style={{
                textDecoration: "none",
                color: "#000",
                fontSize: 31,
                fontWeight: "bold",
                marginInline: 10,
              }}
            >
              Cellabor
            </Link>
          

          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <li className="nav-item">
              <Input
                variant="contained"
                placeholder="검색어"
                style={{
                  width: "230px",
                  display: "flex",
                  color: "#03ff95",
                  backgroundColor: "#03ff95",
                  color: "#000",
                }}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </li>
            <li className="nav-item">
              <Link
                to={`/SearchResult/${text}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  backgroundColor: "black",
                }}
                onClick={handleSearch}
              >
                검색
              </Link>
            </li> */}
            <li className="nav-item">
              <Button
                variant="contained"
                style={{
                  color: "#03ff95",
                  backgroundColor: "#03ff95",
                  color: "#000",
                  marginInline: 10,
                }}
                onClick={handleClickChat}
              >
                채팅
              </Button>
            </li>
            <li className="nav-item">
              <Button
                variant="contained"
                style={{
                  color: "#03ff95",
                  backgroundColor: "#03ff95",
                  color: "#000",
                  marginInline: 10,
                }}
                onClick={handleClickProfile}
              >
                프로필
              </Button>
            </li>
            <li className="nav-item">
              <Button
                variant="contained"
                style={{
                  color: "#03ff95",
                  backgroundColor: "#03ff95",
                  color: "#000",
                  marginInline: 10,
                }}
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </li>
          </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};
export default HeaderINF;
