
import React, { useEffect, useState } from "react";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { updateProfile } from 'firebase/auth'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

const Chatlist = (props) => {
  const [channels, setChannels] = useState('')
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const chatinfo = state.auth.state.loginData.joinedChannel

  useEffect(() => {
    setChannels(chatinfo);
  })

  return (
    <div>
      <h1>My Chat list</h1>
      <ul>
        {channels && channels.map(item =>
          <li key={item}>
            <Link to={`/Chat/${item}`}>{item}</Link>
          </li>)
        }
      </ul>
    </div>
  );
};

export default Chatlist;