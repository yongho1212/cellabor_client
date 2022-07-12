import React, { useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Myprd from "./Myprd";
import UploadProduct from "../Product/UploadProduct/uploadProduct";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useNavigate} from 'react-router-dom'

const mdTheme = createTheme();

const DashMain = () => {
  const navigate = useNavigate();
  const [upopen, setUpOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClickOpen = (scrollType) => () => {
    setUpOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setUpOpen(false);
  };

  function moveUploadPrd(){
    navigate('/Upload')
  }

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (upopen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [upopen]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box style={{width:'100vw'}}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      height: "60px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>[====] [====] [====] LeftSide 3Btn</Box>
                    <Box>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          //onClick={handleClickOpen("paper")}
                          onClick={moveUploadPrd}
                          variant="contained"
                          style={{ fontWeight: "bold" }}
                        >
                          Upload Product
                        </Button>
                        {/* <Dialog
                          open={upopen}
                          onClose={handleClose}
                          scroll={scroll}
                          aria-labelledby="scroll-dialog-title"
                          aria-describedby="scroll-dialog-description"
                          fullWidth="true"
                          maxWidth="50vw"
                        >
                          <DialogTitle id="scroll-dialog-title">
                            Subscribe
                          </DialogTitle>
                          <DialogContent dividers={scroll === "paper"}>
                            <UploadProduct />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>

                            <Button
                              positive
                              form="prdform"
                              content="Submit"
                              value="Submit"
                              type="Submit"
                            >
                              저장
                            </Button>
                          </DialogActions>
                        </Dialog> */}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>

                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Deposits />
                  </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Orders />
                  </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Myprd />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashMain;
