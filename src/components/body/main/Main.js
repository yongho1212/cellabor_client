import React, { useEffect } from "react";
import './Main.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProdcutView from "../product/productview/ProductView";
import Workspace from '../workspace/Workspace' 
import Dashmain from '../workspace/Dashmain' 
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

const Main = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();


  const userRole = state.auth.state.loginData.role
  // const userRole = 'influencer'

  console.log(userRole);

  useEffect(() => {
    if (!fbuser) {
      navigate("/Home");
    }
  }, [state, navigate]);

  return (
    <div style={{  display: 'inline-block', flexDirection: 'row', justifyContent: 'flex-end' }}>
      { userRole === 'influencer' ?
      <ProdcutView />
      :
      <Dashmain />
      }
      
    </div>
  );
};

export default Main;