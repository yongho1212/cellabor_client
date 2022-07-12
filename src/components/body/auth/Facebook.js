import React, { useState, useEffect } from "react";
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = () => {
  return (
    <FacebookLogin
        appId="921201001964201"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={responseFacebook}
        icon="fa-facebook" />
  );
}

export default FacebookLoginButton;