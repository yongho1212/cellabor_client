import React, { useEffect, useState } from "react";
import { reauthenticateWithCredential, signOut, deleteUser, getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import Avatar from '@mui/material/Avatar';
import { Button } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    displayName: '',
    role: 'notsure',
    uid: '',
    avatar: '',
    tags: '',
    age: '',
    sex: '',
    insta: '',
    mobile: '',
    joinedChannel: []
  })
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  
  const uid = state.auth.state.loginData.uid

  useEffect(() => {
    if (!fbuser) {
      navigate("/Home")
    }
  })

  const editProfile = () => {
    navigate("/EditProfile")
  }

  const handleLogout = async () => {
    try {
      navigate('/Home');
      logoutUser();
      nofbuser(false);;
      signOut(auth);
      console.log('logout')
    } catch (err) {
      console.log(err)
    };
  };

  const firbaseDelete = async() => {

  }

  const deleteUserAll = async () => {
    if (window.confirm('정말 탈퇴하시겠습니다?')) {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/delete`, { uid })
        .then((res) => {
          console.log(res.data)
          console.log('success')
        })
        .then(() => {
          deleteUser(user)
          console.log('firebase deleted');
        })
        .then(() => {
          handleLogout();
        })
        .catch((error) => {
        });
      alert('삭제완료!')
    } else {
      alert('취소')
    }
  }

  return (
    <Box style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'row' }} sx={{ flexGrow: 1 }}>
      <Grid style={{}}>
        <div style={{ backgroundColor: 'red', margin: '15px' }}>
          <h1>Hello! It's profile page.</h1>
          <Avatar
            alt="Remy Sharp"
            src={state.auth.state.loginData.joinedChannel}
            sx={{ width: 100, height: 100 }}
          />
          <div>
            {state.auth.state.loginData.role} <br />
            {state.auth.state.loginData.age}<br />
            {state.auth.state.loginData.avatar}<br />
            {state.auth.state.loginData.displayName}<br />
            {state.auth.state.loginData.email}<br />
            {state.auth.state.loginData.insta}<br />
            {state.auth.state.loginData.joinedChannel}<br />
            {state.auth.state.loginData.mobile}<br />
            {state.auth.state.loginData.sex}<br />
            "#" + {state.auth.state.loginData.tags} + " "<br />
          </div>
        </div>
        <div style={{ backgroundColor: 'green', margin: '15px' }}>
          <h1>Hello! It's profile page.</h1>
          <div>
          </div>
        </div>
      </Grid>
      <Button
        onClick={() => handleLogout()}
      >
        로그아웃
      </Button>
      <Button
        onClick={() => deleteUserAll()}
      >
      </Button>
    </Box>
  );
};

export default Profile;