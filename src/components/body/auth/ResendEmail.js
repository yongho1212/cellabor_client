import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
  onIdTokenChanged,
} from "firebase/auth";

const  ResendEmail = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    function handleClickMain() {
        navigate("/Main");
      }

    const onAuthStateChangedUnsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // -> Alert Email Verification
    
          const onIdTokenChangedUnsubscribe = onIdTokenChanged(auth, (user) => {
            const unsubscribeSetInterval = setTimeout(() => {
              auth.currentUser.reload();
              auth.currentUser.getIdToken(/* forceRefresh */ true);
            }, 180000);
            if (user && user.emailVerified) {
              clearInterval(unsubscribeSetInterval); //delete interval
              onAuthStateChangedUnsubscribe(); //unsubscribe onAuthStateChanged
              handleClickMain();
              return onIdTokenChangedUnsubscribe(); //unsubscribe onIdTokenChanged
            }
          });
        }
      });

      const resendvfmail = () => {
        sendEmailVerification(auth.currentUser);
      };

  return (
    <div>
        <button onClick={() => resendvfmail()}>
            이메일 재전송
        </button>
    </div>
    )
}


export default ResendEmail