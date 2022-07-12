import React,{useState, useEffect} from 'react'
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from '../body/workspacefolder/listItems';
import Prdlistitems from '../body/workspacefolder/Prdlistitem';
import Button from "@mui/material/Button";

const mdTheme = createTheme();

const AdNavBar = () => {
  const [open, setOpen] = useState(true);
  const [draweOpen, setDrawerOpen] = useState(false);
  const [openInfList, setOpenInfList] = useState(false);
  const [chatListOpen, setChatListOpen] = useState(false);
  const [chatData, setChatData] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getlistopen = (data) => {
    setOpenInfList(data)
  }

  const chatlistopen = (data) => {
    setChatListOpen(data);
  }

  const getChatData = (data) => {
    console.log('debugnow', data);
    setChatData(data);
  }

  console.log(openInfList)

  useEffect(() => {
    getlistopen();
  })


  return (
    <>
    {chatListOpen ? 
      (
      <>
        <ThemeProvider theme={mdTheme}>
          <Box>
            <CssBaseline />
            <IconButton onClick={() => {
              setChatListOpen(false);
            }}>뒤로가기</IconButton>
            <Box style={{ width: "200px" }}>
            <List component="nav">
              <Link to="/ChatMain" style={{ color: 'black', alignItems: 'flex-start' }}>
                {chatData}
              </Link>
            </List>
          </Box>
          </Box>
        </ThemeProvider>
      </>
      ) : (
      <ThemeProvider theme={mdTheme}>
      <Box>
        <CssBaseline />
        
        <Box sx={{ display: "flex" }}>
          <Divider />
          { !openInfList ?
          <Box style={{ width: "200px" }}>
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              <Typography>My Product Lists</Typography>
              <Prdlistitems chatlistopen={chatlistopen} getlistopen={getlistopen} getChatData={getChatData}/>
            </List>
          </Box>
          :
          console.log(openInfList)
          }
        </Box>
      </Box>
    </ThemeProvider>
    )}
    </>
  )
}


export default AdNavBar;