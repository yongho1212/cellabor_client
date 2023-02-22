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
    const [myage, setMyage] = useState(0);

    const [already, setAlready] = useState(false)

    

    const getPostList = async () => {
       
           const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfoByid`,
           { id }).then((res) => {
            console.log(res.data)
            const datas = res.data
            setInf(datas); 
            getage(datas);
            
          })
        
        
       
        
      }

    


    const item = inf;
    

    useEffect(() => {
        getPostList();
        
    }, []);

    const getage = (datas ) => {
        const today = new Date();
        
        const birth = datas?.birthday
        const bday = new Date(birth)
        console.log(birth)
        console.log(bday)
        console.log(today)
        let age = today.getFullYear() - bday.getFullYear();
        let mon = (today.getMonth()+1) - bday.getMonth();
        console.log(age,mon)
        if ( mon < 0 || (mon === 0 && today.getDate() < bday.getDate())){
            // return age = age - 1 
            setMyage(age -1  )
        } else {
            
            setMyage(age)
        }
        

    }
    
    console.log(myage)


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
                    <div className="infInfo1">
                        <div className="infNickname">
                        {item.role}
                        </div>
                        <div className="infAge">
                        {myage}
                        </div>
                    
                    
                    </div>
                    <div className="headerBrand">
                    {item.email}    
                    {item.nickname}
                    {item.tags}
                    {item.about}
                    
                    
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
