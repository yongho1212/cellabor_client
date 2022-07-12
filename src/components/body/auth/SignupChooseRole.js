import React from 'react'
import { useNavigate } from 'react-router'

const SignupChooseRole = () => {
  const navigate = useNavigate();

  function moveAd() {
      navigate("/AdSignup")
    };

    function moveInf() {
      navigate("/InfSignup")
    };

  return (
    <div style={{justifyContent:'center', alignItems:'center'}}>
      회원가입 페이지입니다.
        <button onClick = {()=>moveInf()}>
            인플루언서
        </button>
        <button onClick = {()=>moveAd()}>
            광고주
        </button>
    </div>
  );
};

export default SignupChooseRole;
