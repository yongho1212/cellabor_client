import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../../../firebase";
import { onSnapshot, collection, doc } from "firebase/firestore";
import SendMessage from "./Sendmessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import { useParams } from "react-router-dom";

import { getAuth } from "firebase/auth";

import Channel from "./Channel";
import { async } from "@firebase/util";

const ADChat = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  const uid = state.advertiser.state.adloginData.uid;
  const id = useParams();

  const [prdfsid, setPrdfsid] = useState("");
  const [channelid, setChannelid] = useState("");

  console.log(id.id);

  const getchatInfo = async () => {
    const channelid = id.id;
    console.log(channelid);
    const res = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/chat/getchat`, {
        params: { channelid: channelid },
      })
      .then((res) => {
        const chatdata = res.data;
        console.log(res.data);
        console.log(chatdata[0]);
        console.log(chatdata[0].prdfsid);
        console.log(chatdata[0].channelid);
        const prdfsid = chatdata[0].prdfsid;
        const channelid = chatdata[0].channelid;
        setPrdfsid(prdfsid);
        setChannelid(channelid);
        getmsgs({ prdfsid, channelid });
      });
  };

  const getinfo = async () => {
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
    getchatInfo();
    getinfo();
  }, []);

  // useEffect(()=> {
  //   getmsgs();
  // }, [])

  const getmsgs = ({ prdfsid, channelid }) => {
    onSnapshot(
      collection(db, "prdRoom", prdfsid, "inflist", channelid, "messages"),
      (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      }
    );
  };

  return (
    <div>
      <div>Chat</div>
      <section>
        <div>
          <div>Channel</div>
          {channelid}
          <div>Who is here?</div>
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
          <SendMessage
            scroll={scroll}
            prdfsid={prdfsid}
            channelid={channelid}
          />
          <div ref={scroll}></div>
        </div>
      </section>
    </div>
  );
};

export default ADChat;
