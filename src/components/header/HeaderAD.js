import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Input } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Search from "../body/searchfolder/Search";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { getAuth, signOut } from "firebase/auth";

import { CgProfile } from "react-icons/cg";
import { MdLogout, MdAddBusiness } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

import "./Header.css";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const HeaderAD = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userRole, setUserRole] = useState("");
  const [text, setText] = React.useState("");

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const auth = getAuth();

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
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    navigate("/ADChatlist");
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
      logoutUser();
      nofbuser(false);
      signOut(auth);
      navigate("/Home");
      console.log("logout");
    } catch (err) {
      console.log(err);
    }
  }
  function handleClickProfile() {
    navigate("/ADProfile");
  }
  function workSpace() {
    navigate("/Workspace");
  }

  return (
    <div position="static" className="headerSet">
      <Container style={{ width: "87vw" }}>
        <div className="headerContainerSet">
          <Link to="Main" id="logoStyle">
            Cellabor
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>

          <div
            className={
              click
                ? "mobile-drawer-container active"
                : "mobile-drawer-container"
            }
          >
            <div className="mobile-drawer-style">
              <div className="mobile-drawer-style-each" 
              onClick={handleClickUpload}>
                상품 업로드
              </div>
              <div
                className="mobile-drawer-style-each"
                onClick={handleClickProfile}
              >
                프로필
              </div>
              <div className="mobile-drawer-style-each" onClick={handleLogout}>
                로그아웃
              </div>
            </div>
          </div>

          <div className="nav-btn-container">
            {/* <button
              onClick={handleClickUpload}
              style={{ fontSize: "17px" }}
              id="eachBtnStyleContained"
            >
              Upload Product
            </button> */}
            {/* <Button
              variant="contained"
              style={{
                backgroundColor: "#03ff95",
                color: "#000",
                marginInline: 10,
                height: "45px",
              }}
              onClick={handleClickChat}
            >
              채팅
            </Button> */}
            {/* <button id="eachBtnStyleOutlined" onClick={handleClickProfile}>
              프로필
            </button> */}

            {/* <Button 
                variant="contained"
                style={{backgroundColor:"#03ff95", color:"#000", marginInline:10, height:'70px'}}
                onClick={workSpace}
            >
                WORK SPACE
            </Button> */}
            {/* <button id="eachBtnStyleOutlined" onClick={handleLogout}>
              로그아웃
            </button> */}

            <ul className="nav-menu">

              <li className="nav-item">
                <div className="nav-item-each"
                onClick={handleClickUpload}
                style={{ }}
                >
                  <div style={{fontSize:'15px', marginTop:'11px'}}>
                  상품 업로드
                  </div>
                  <MdAddBusiness 
                  style={{
                    fontSize: "29px",
                    color: "#193c46",
                    marginInline: "5px",
                    marginTop: "9px",
                  }}
                  />
                
                </div>
              </li>

              <li className="nav-item">
                <div className="nav-item-each">
                  <CgProfile
                    style={{
                      fontSize: "29px",
                      color: "#193c46",
                      marginInline: "5px",
                      marginTop: "9px",
                    }}
                    onClick={handleClickProfile}
                  />
                  
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-item-each">
                  <MdLogout
                    style={{
                      fontSize: "29px",
                      color: "#193c46",
                      marginInline: "5px",
                      marginTop: "9px",
                    }}
                    onClick={handleLogout}
                  />
                  
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default HeaderAD;
