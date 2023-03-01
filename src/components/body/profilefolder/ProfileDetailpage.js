import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

import { BsYoutube, BsInstagram } from "react-icons/bs";

import "./ProfileDetailPage.css";
import { border } from "@mui/system";

const DetailPage = () => {
  const [inf, setInf] = useState([]); // inf 정보
  const { id } = useParams();
  const state = useSelector((state) => state);
  const auth = getAuth();
  const uid = auth?.currentUser?.uid;
  const [myage, setMyage] = useState(0);
  const [mytags, setMytags] = useState([]);

  const [already, setAlready] = useState(false);

  const getPostList = async () => {
    const res = await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfoByid`, { id })
      .then((res) => {
        console.log(res.data);
        const datas = res.data;
        setInf(datas);
        getage(datas);
        setMytags(datas.tags);
      });
  };
  

  const youtubeData = {
    title: "youtube",
    url: `https://www.youtube.com/channel/${inf?.youtube?.channelId}`,
  };

  const instaData = {
    title: "ig",
    url: `https://www.instagram.com/${inf?.insta}`,
  };

  const item = inf;

  useEffect(() => {
    getPostList();
  }, []);

  const getage = (datas) => {
    const today = new Date();

    const birth = datas?.birthday;
    const bday = new Date(birth);
    // console.log(birth)
    // console.log(bday)
    // console.log(today)
    let age = today.getFullYear() - bday.getFullYear();
    let mon = today.getMonth() + 1 - bday.getMonth();

    if (mon < 0 || (mon === 0 && today.getDate() < bday.getDate())) {
      // return age = age - 1
      setMyage(age - 1);
    } else {
      setMyage(age);
    }
  };

  

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="infDetailpageContainer">
          {/** 상세정보 컨테이너 */}
          <div className="infInfoContainer">
            <div className="infPicContainer">
              <img
                src={item.avatar}
                width="100%"
                alt="testA"
                style={{ borderRadius: "30px", border: "1px solid #000" }}
              />
            </div>
            {/* 디테일 페이지 상단 정보 요약  */}
            <div className="infHeaderContainer">
              <div className="infInfo1">
                <div className="infNickname">{item.nickname}</div>
                <div className="infAge">{myage}</div>
              </div>
              <div className="headerBrand">
                {/* <div>{item.tags}</div> */}
                <div style={{flexDirection:'row', display:'flex'}}>
                {mytags ? (
                  mytags.map(items => {
                    return (
                      <div key={items.id} style={{ marginInline:'3px',justifyContent:'center',alignItems:'center',display:'flex' }}>
                        <div style={{border:'1px solid #000', padding:'3px',paddingInline:'5px', justifyContent:'center', alignItems:'center',borderRadius:'10px', fontWeight:'bold' }}>
                            {items}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>태그 없음</div>
                )}
                </div>
                <div style={{marginTop:'7px'}}>{item.email}</div>
              </div>
              <div className="headerDescription">{item.about}</div>
              <div className="sns_logo_container">
                <div className="sns_logo">
                  <a href={youtubeData.url} target="_blank">
                    <BsYoutube style={{ fontSize: "40px", color: "red" }} />
                  </a>
                </div>
                <div className="headerCategory">{item.targetPlatform}</div>
                <div>
                  <a href={instaData.url} target="_blank">
                    <BsInstagram style={{ fontSize: "40px", color: "#F502AC" }} />
                  </a>
                </div>
                <div className="headerCategory">{item.targetPlatform}</div>
              </div>
            </div>
            {/* <div className="infoReward">
                        <div className="textTitle">
                        제공내역
                        </div>
                        <div className="textDescription">
                            1.ㅇㅁㄴㅇㅁㄴㅇㅁㄴ<br/>
                            2..ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ<br/>
                            2...ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ<br/>
                        </div>
                    </div> */}
            {/* <div className="infoDescription">
                        <div className="textTitle">

                        </div>
                        <div className="textDescription">
                            
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
