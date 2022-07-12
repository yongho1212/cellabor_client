import React from 'react'
import { useNavigate } from 'react-router'

const LoginChooseRole = () => {
    const navigate = useNavigate();
    function moveAd() {
        navigate("/AdLogin")
      };
      function moveInf() {
        navigate("/InfLogin")
      };

  return (
    <div style={{justifyContent:'center', alignItems:'center'}}>
        로그인 페이지 입니다.
        <button onClick = {()=>moveInf()}>
            인플루언서
        </button>
        <button onClick = {()=>moveAd()}>
            광고주
        </button>
    </div>
  )
}

export default LoginChooseRole;
