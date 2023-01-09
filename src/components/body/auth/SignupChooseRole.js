import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";
import { FaAdversal } from "react-icons/fa";
import { GrInstagram, GrYoutube } from 'react-icons/gr';

const SignupChooseRole = () => {
  const navigate = useNavigate();

  function moveAd() {
      navigate("/AdSignup")
    };

    function moveInf() {
      navigate("/InfSignup")
    };

  return (
    <div style={{ justifyContent: "center", alignItems: "center", height:'90vh', display:'flex', flexDirection:'column' }}>
      <div >
        It's signup page!
      </div>
      <div className='pricing__container'>
      <Link to="/InfSignup" className="pricing__container-card">
        <div className="pricing__container-cardInfo">
          <div className="icon">
            <GrInstagram />
            <GrYoutube />
          </div>
          <h3>Influencer</h3>
        </div>
      </Link>
      <Link to="/AdSignup" className="pricing__container-card">
        <div className="pricing__container-cardInfo">
          <div className="icon">
            <FaAdversal />
          </div>
          <h3>Advertiser</h3>
        </div>
      </Link>
      </div>
      
    </div>
  );
};

export default SignupChooseRole;
