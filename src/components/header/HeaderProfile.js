import React, {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Search from '../body/search/Search';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate, Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index';
import { getAuth, signOut } from "firebase/auth";



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HeaderProfile = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userRole, setUserRole] = useState("");
  const [text, setText] = React.useState('');

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

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
      <Search value={text} />
    }

    function handleUploadProfile() {
      navigate("/UploadProfile");
    }
    
    function handleClickMain() {
      navigate("/Main");
    }
    function handleClickChat() {
      navigate("/Chatlist");
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
          nofbuser(false);;
          signOut(auth);
          navigate('/Home')
          console.log('logout')
        } catch (err) {
          console.log(err)
      };
    };
    function handleClickProfile() {
      navigate("/ADProfile");
    }
    function workSpace() {
      navigate("/Workspace");
    }

  

  return (
    <div position="static" style={{backgroundColor:'#fff', zIndex:100}}>
      <Container style={{width:"87vw"}} >
        <div style={{justifyContent:'space-between', 
        display:'flex', 
        height:'11vh',
        alignItems:'center',
        paddingInline:'15px',
        marginTop:'-15px',
        border: '3px solid #193c46',
        borderRadius:'21px',}}>
        
        <Box>
          <Link to="Main" style={{ backgroundColor:'#fff', color:'#000', fontSize:31, fontWeight:'bold', marginInline:10}}>Sway</Link>
        </Box>
        
        

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <div style={{display: 'flex' }}>
            <Input 
              variant="contained"
              placeholder='검색어'
              style={{ width: '230px', display:'flex', color:"#03ff95", backgroundColor:"#03ff95", color:"#000"}}
              value={text}
              onChange={(e) => {setText(e.target.value)}}
            />
            <Link to={`/SearchResult/${text}`} style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'white', width: '50px', height: '50px', display:'flex',  backgroundColor: 'black' }} onClick={handleSearch}>
              검색
            </Link>
          </div>
            <Button 
              variant="contained"
              style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
              onClick={handleUploadProfile}
            >
              업로드 프로필2
            </Button>
            <Button 
                variant="contained"
                style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
                onClick={handleClickUpload}
            >
                업로드product
            </Button>
       
            <Button 
                variant="contained"
                style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
                onClick={handleClickSearch}
            >
                검색
            </Button>
            <Button 
                variant="contained"
                style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
                onClick={handleClickChat}
            >
                채팅
            </Button>
            <Button 
                variant="contained"
                style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
                onClick={handleClickProfile}
            >
                프로필
            </Button>
            <Button 
                variant="contained"
                style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
                onClick={handleClickInfprflist}
            >
                인플루언서 리스트
            </Button>
            <Button 
                variant="contained"
                style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
                onClick={workSpace}
            >
                WORK SPACE
            </Button>
            <Button 
                variant="contained"
                style={{color:"#03ff95", backgroundColor:"#03ff95", color:"#000", marginInline:10}}
                onClick={handleLogout}
            >
                로그아웃
            </Button>
            
        </Box>  



         
        </div>
      </Container>
    </div>
  );
};
export default HeaderProfile;