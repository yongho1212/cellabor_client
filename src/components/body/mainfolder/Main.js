import React, { useEffect } from "react";
import './Main.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProdcutView from "../product/productviewfolder/ProductView";
import Workspace from '../workspacefolder/Workspace' 
import Dashmain from '../workspacefolder/Dashmain';
import Search from '../searchfolder/Search'
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
      <Search />
      }
      
    </div>
  );
};

export default Main;