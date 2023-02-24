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
import { useQuery, useMutation } from "@tanstack/react-query";
import { infUserInfo, adUserInfo } from "../../../api";
import { getAuth, updateProfile, signOut } from "firebase/auth";


const Main = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const auth = getAuth();


  const uid = auth?.currentUser?.uid || "undefined";
  const infQuery = useQuery({
    queryKey: ["inf"],
    queryFn: () => infUserInfo(uid),
  });
  if (infQuery.isLoading === "loading") console.log("loading");
  if (infQuery.status === "error") console.log("err");
  


  const adQuery = useQuery({
    queryKey: ["ad"],
    queryFn: () => adUserInfo(uid),
  });
  if (adQuery.isLoading === "loading") console.log("loading");
  if (adQuery.status === "error") console.log("err");
  
  
  
 const userRole = adQuery?.data?.data?.role || infQuery?.data?.data?.role

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