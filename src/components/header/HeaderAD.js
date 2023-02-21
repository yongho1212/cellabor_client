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


const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const HeaderAD = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userRole, setUserRole] = useState("");
  const [text, setText] = React.useState("");

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
    <AppBar
      style={{
        backgroundColor: "#fff",
        zIndex: 100,
        height: "70px",
        justifyContent: "center",
        width: "100vw",
        
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          {/* <Typography style={{color:'#000'}}>
            ad
        </Typography> */}
          <Box>
            {/* <Button 
                variant="text"
                style={{ backgroundColor:"#fff", color:"#000",fontSize:31,fontWeight:'bold', marginInline:10}}
                onClick={handleClickMain}
                >
                  Sway
                </Button> */}
            <Link
              to="Main"
              style={{
                color: "#000",
                fontSize: 31,
                fontWeight: "bold",
                marginInline: 10,
                textDecoration: "none",
              }}
            >
              Cellabor
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div style={{ display: "flex" }}>
              {/* <Input
                variant="contained"
                placeholder="검색어"
                style={{
                  width: "230px",
                  display: "flex",
                  color: "#03ff95",
                  
                  
                }}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              /> */}
              {/* <Button
              variant="contained"
              style={{
                backgroundColor: "#03ff95",
                color: "#000",
                marginInline: 10,
                height: "45px",
              }}
              onClick={handleClickSearch}
            >
              검색
            </Button> */}
              {/* <Link
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
              </Link> */}
            </div>
            {/* <Button 
              variant="contained"
              style={{backgroundColor:"#03ff95", color:"#000", marginInline:10, height:'70px'}}
              onClick={handleUploadProfile}
            >
              업로드 프로필2
            </Button> */}
            {/* <Button 
                variant="contained"
                style={{backgroundColor:"#03ff95", color:"#000", marginInline:10, height:'70px'}}
                onClick={handleClickUpload}
            >
                업로드product
            </Button> */}

            {/* <Button 
                variant="contained"
                style={{backgroundColor:"#03ff95", color:"#000", marginInline:10, height:'70px'}}
                onClick={handleClickSearch}
            >
                검색
            </Button> */}
            <Button
                          //onClick={handleClickOpen("paper")}
                          onClick={handleClickUpload}
                          variant="contained"
                          style={{ fontWeight: "bold" }}
                        >
                          Upload Product
                        </Button>
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
            <Button
              variant="contained"
              style={{
                backgroundColor: "#03ff95",
                color: "#000",
                marginInline: 10,
                height: "45px",
              }}
              onClick={handleClickProfile}
            >
              프로필
            </Button>
            
            {/* <Button 
                variant="contained"
                style={{backgroundColor:"#03ff95", color:"#000", marginInline:10, height:'70px'}}
                onClick={workSpace}
            >
                WORK SPACE
            </Button> */}
            <Button
              variant="contained"
              style={{
                backgroundColor: "#03ff95",
                color: "#000",
                marginInline: 10,
                height: "45px",
              }}
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderAD;
