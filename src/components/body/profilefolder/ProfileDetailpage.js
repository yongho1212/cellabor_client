import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getAuth} from 'firebase/auth'


import * as grd from "../product/detailComponents";

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
            console.log(id,'inside')
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
        <grd.Container>
            <grd.SideBar>
                <div className="detailpageContainer">
                 {/* 디테일 페이지 상단 정보 요약  */}
                <div className="headerContainer">
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

                {/** 상세정보 컨테이너 */}
                <div className="infoContainer">
                    <div className="picContainer">
                    <img
                        src={item.avatar}
                        width='100'
                        height='100'
                        alt='testA' 
                    />
                    </div>
                    <div className="infoReward">
                        <div className="textTitle">
        제공내역
                        </div>
                        <div className="textDescription">
                            1.ㅇㅁㄴㅇㅁㄴㅇㅁㄴ<br/>
                            2..ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ<br/>
                            2...ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ<br/>
                        </div>
                    </div>
                    <div className="infoDescription">
                        <div className="textTitle">

                        </div>
                        <div className="textDescription">
                            
                        </div>
                    </div>
                </div>
            </div>

            
            </grd.SideBar>
            <grd.ContentBox>
                <grd.Content1>
                
                </grd.Content1>
            </grd.ContentBox>
        </grd.Container>
        </>
        
    );
};

export default DetailPage;
