import * as React from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DashMain from './Dashmain';
import Navbar from './Navbar';


function WorkSpace() {
 

  return (
        <Navbar/>
  );
}

export default function Dashboard() {
  return <WorkSpace />;
}