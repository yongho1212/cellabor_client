import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getAuth} from 'firebase/auth'
import './detailPage.css'

import * as grd from "../detailComponents";

const DetailPage = () => {
    const [product, setProduct] = useState([]); // 제품 정보
    const { id } = useParams();
    const state = useSelector((state) => state);
    const auth = getAuth();
    const uid = auth?.currentUser?.uid;

    const [already, setAlready] = useState(false)



    const getPostList = async () => {
        try {
           const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/getprdinfo`,
           { id }).then((res) => {
            console.log(res.data)
            setProduct(res.data); 
            
          })
        } 
        catch (err) {
          console.log(err)
        }
      }

    
    
    const appliyCampaign = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/appliyCampaign`,
            {uid, id}).then((res) => {
                console.log('Applied Success!');
            })
        }
        catch (err) {
            console.log('Applied failed');
            console.log(uid);
        }
        applyChecker();
    };

    //DB에서 해당 상품의 어플리칸트에서 내 uid 찾아서 있으면 "이미 신청한 상품입니다."

    //findApplicant
const applyChecker = async() => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/findApplicant`,
        {id, uid}).then((res) => {
            console.log(res);
            console.log(res.data)
            const checker = res.data
            setAlready(checker);
        })
    }
    catch (err) {
        console.log('Applied failed');
        console.log(uid);
    }
}

    const item = product;
    

    useEffect(() => {
        getPostList();
        //applyChecker();
    }, []);

    console.log(item)

    return (
        <>
        <grd.Container>
            <grd.SideBar>
                <div className="detailpageContainer">
                 {/* 디테일 페이지 상단 정보 요약  */}
                <div className="headerContainer">
                    <div className="headerTitle">
                    {item.name}
                    </div>
                    <div className="headerBrand">
                    {item.brand}
                    {item.brand_name}
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
                        src={item.photo}
                        width='300px'
                        
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
                    {/* <div className="infoDescription">
                        <div className="textTitle">

                        </div>
                        <div className="textDescription">
                            
                        </div>
                    </div> */}
                </div>
            </div>

            
            </grd.SideBar>
            <grd.ContentBox>
                <grd.Content1>
                <div>
                { already === false ?
                    <Button onClick={appliyCampaign}>
                    신청하기
                    </Button>
                :
                    <p>이미 신청하셨습니다.</p>
                }
            </div>
                </grd.Content1>
            </grd.ContentBox>
        </grd.Container>
        </>
        
    );
};

export default DetailPage;
