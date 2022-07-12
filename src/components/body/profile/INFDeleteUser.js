import React, {useState} from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  deleteUser,
  getAuth,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

const INFDeleteUser = () => {

    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { loginUser, logoutUser, fbuser, nofbuser, infloginUser } =
      bindActionCreators(actionCreators, dispatch);
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = state.influencer.state.infloginData.uid;
    const userProvidedPassword = password

    const handleSubmit = async (e) => {
        e.preventDefault();      
        deleteUserAll();
    };
    console.log(password)
    console.log(userProvidedPassword)
    


    const handleLogout = async () => {
      try {
        navigate("/Home");
        logoutUser();
        nofbuser(false);
        signOut(auth);
        console.log("logout");
      } catch (err) {
        console.log(err);
      }
    };
  
  
    const firebaseDelete = () => {
      // 사용자 재인증 (팝업으로 로그인 창)
       const credential = EmailAuthProvider.credential(
         auth.currentUser.email,
        userProvidedPassword 
       )
      reauthenticateWithCredential(user, credential).then(() => {
       console.log('User re-authenticated.')
       }).catch((error) => {
         console.log(error)
       });
       deleteUser(user).then(() => {
        console.log('deleted from firebase')
       }).catch((error) => {
        console.log(error)
       });
  
    }
  
    console.log(password)
    // 비밀번호 입력 =>  setState => 받아서 재인증
    // 파베탈퇴 => 디비 탈퇴
  
    const deleteUserAll = async () => {
      
      if (window.confirm("정말 탈퇴하시겠습니다?")) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
         userProvidedPassword 
        )
       await reauthenticateWithCredential(user, credential).then(() => {
        console.log('User re-authenticated.')
        }).catch((error) => {
          console.log(error)
          throw new Error('Something bad happened');
          alert('비밀번호를 다시 확인해 주세요');
        });
        await deleteUser(user).then(() => {
         console.log('deleted from firebase')
        }).catch((error) => {
         console.log(error)
         alert('오류 발생 다시 시도해주세요');
        });
      
        const res = await axios
          .post(`${process.env.REACT_APP_SERVER_URL}/inf/deleteInfUser`, { uid })
          .then((res) => {
            console.log(res.data);
            console.log("success");
          })

          .then(() => {
            handleLogout();
          })
          .catch((error) => {
            // An error ocurred
            // ...
          });
        
        alert("삭제완료!");
      } else {
        alert("취소");
      }
    };




  return (
    <div>
      Inputpassword
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="Submit">
            회원탈퇴
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default INFDeleteUser;
