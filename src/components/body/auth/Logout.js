// import React, { useState, useEffect } from "react";
// import { getAuth, signOut } from "firebase/auth";
// import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";
// import { useNavigate, Link } from "react-router-dom";
// import { actionCreators } from "../../../state/index";

// const handleLogout = () => {
//   const state = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(
//     actionCreators,
//     dispatch
//   );
//   const auth = getAuth();
//   let navigate = useNavigate();
//   async function lgobtn() {
//     try {
//       logoutUser();
//       nofbuser(false);
//       signOut(auth);
//       navigate("/Home");
//       console.log("logout");
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// export default handleLogout;
