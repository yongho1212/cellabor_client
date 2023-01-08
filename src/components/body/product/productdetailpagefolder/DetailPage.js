import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getAuth} from 'firebase/auth'

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

    return (
        <div>
            <div>{uid}</div>
            {item ? 
            <div>
                <div>{item._id}</div>
                <h1>상품 상세 페이지</h1>
                <div>
                    상품명 {item.name}    
                </div>
                <div>
                    브랜드 {item.brand}    
                </div>
                <div>
                    카테고리 {item.category}    
                </div>
                <div>
                    전화번호 {item.mobile}    
                </div>
                <div>
                    확인 여부 {item.isCheck}    
                </div>
                <div>
                    상품 사진 {item.photo}
                    <img
                        src={item.photo}
                        width='100'
                        height='100'
                        alt='testA' 
                    />
                </div>
                <div>
                    타겟 플랫폼 {item.targetPlatform}    
                </div> 
                {/* {item ? item.applicant.map(e => {
                    return (
                        <div key={e}>
                            {e}
                        </div>
                    )
                }) : <></>} */}
            </div> : <div>업로드 실패</div>}
            <div>
                { already === false ?
                    <Button onClick={appliyCampaign}>
                    신청하기
                    </Button>
                :
                    <p>이미 신청하셨습니다.</p>
                }
            </div>
        </div>
    );
};

export default DetailPage;
