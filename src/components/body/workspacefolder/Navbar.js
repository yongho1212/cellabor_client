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
import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Myprd from "./Myprd";
import DashMain from "./Dashmain";
import Prdlistitems from "./Prdlistitem";

const mdTheme = createTheme();

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [draweOpen, setDrawerOpen] = useState(false);
  const [openInfList, setOpenInfList] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getlistopen = (data) => {
    setOpenInfList(data)
  }

  console.log(openInfList)

  return (
    <ThemeProvider theme={mdTheme}>
      <Box>
        <CssBaseline />
        <Box style={{ width: "100%", backgroundColor: "#0f0" }}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <MenuIcon />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Divider />
          { !openInfList ?
          <Box style={{ width: "200px" }}>
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              <Typography>My Product Lists</Typography>
              <Prdlistitems getlistopen={getlistopen}/>
            </List>
          </Box>
          :
          // <Box style={{ width: "200px" }}>
          //   <IconButton
          //   size="large"
          //   edge="start"
          //   onClick={setOpenInfList(true)}
          //   >
          //     <MenuIcon />
          //   </IconButton>
          // </Box>
          console.log(openInfList)
          }
          
          {/* <IconButton
            size="large"
            edge="start"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            PaperProps={{ style: { height: "90vh", marginTop: "50px" } }}
            open={draweOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box width="200px">
              <Typography>drawer</Typography>
            </Box>
          </Drawer> */}

          {/* <DashMain /> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
