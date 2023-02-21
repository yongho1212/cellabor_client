import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getAuth} from 'firebase/auth'

import "./ProfileDetailPage.css"



const DetailPage = () => {
    const [inf, setInf] = useState([]); // inf 정보
    const { id } = useParams();
    const state = useSelector((state) => state);
    const auth = getAuth();
    const uid = auth?.currentUser?.uid;

    const [already, setAlready] = useState(false)

    console.log(id)

    const getPostList = async () => {
        try {
           const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfoByid`,
           { id }).then((res) => {
            console.log(res.data)
            setInf(res.data); 
            
          })
        } 
        catch (err) {
          console.log(err)
        }
      }

    


    const item = inf;
    

    useEffect(() => {
        getPostList();
        //applyChecker();
    }, []);

    return (
        <>
            <div style={{display:'flex',justifyContent:'center'}}>

                <div className="infDetailpageContainer">
                

                {/** 상세정보 컨테이너 */}
                <div className="infInfoContainer">
                    <div className="infPicContainer">
                    <img
                        src={item.avatar}
                        width="100%"
                        alt='testA' 
                        style={{borderRadius:'30px',border: '1px solid #000' }}
                    />
                    </div>
                     {/* 디테일 페이지 상단 정보 요약  */}
                <div className="infHeaderContainer">
                    <div className="headerTitle">
                    {item.role}
                    </div>
                    <div className="headerBrand">
                    {item.email}    
                    </div>
                    <div className="headerDescription">
                    This is description
                    </div>
                    <div className="headerCategory">
                    {item.targetPlatform}    
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
