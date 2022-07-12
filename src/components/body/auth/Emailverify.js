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

import CountdownTimer from './CountdownTimer';
import './Emailverify.css';

const Emailverify = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const THREE_MIN = 3 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_MIN;

  function handleClickMain() {
    navigate("/Main");
  }

  // useEffect(() => {
  //   onAuthStateChangedUnsubscribe();
  //   }, []);

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

  const ButtonShow = () => {
    return setTimeout(
      <div>
        <Button variant="outlined" onClick={() => resendvfmail()}>
          resend
        </Button>
      </div>,
      180000
    );
  };

  //이메일 다시 보내기 누르고 60초동안 이메일 보내기 버튼 비활성화
  //이메일 인증 리스너 만들어서 이메일 인증이 완료되면 로그아웃 하거나 메인으로 이동하게 만들기

  return (
    <div>
      <div>Emailverify</div>
      <ButtonShow />
      <div>
        <Button variant="outlined" onClick={() => window.location.reload()}>
          이메일 인증 환료 후 눌러주세요
        </Button>
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div>
    </div>
  );
};

export default Emailverify;
