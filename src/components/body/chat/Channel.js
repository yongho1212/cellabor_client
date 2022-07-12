import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../../../firebase";
import { onSnapshot, collection, doc } from "firebase/firestore";
import SendMessage from "./Sendmessage";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import axios from "axios";
import { useParams } from "react-router";

const Channel = () => {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const uid = state.auth.state.loginData.uid;

  const getinfo = async () => {
    console.log(uid);
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/getUserInfo`, { params: { uid: uid } })
      .then((res) => {
        console.log(res.data);
        const loginData = res.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      <div>Channel</div>
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid, displayName }) => (
          <div>
            <div
              key={id}
              className={`msg ${
                uid === auth.currentUser.uid ? "sent" : "received"
              }`}
              style={{
                backgroundColor: "#ffa",
                borderRadius: 100,
                paddingLeft: 30,
              }}
            >
              <img src={photoURL} alt="" />
              <p>{uid}</p>
              <p>{displayName}</p>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
};

export default Channel;
