import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import ProductRecommendSlider from '../productrecommendsliderfolder/ProductRecommendSlider';


const ProdcutView = ({ useParams }) => {
  const [product, setProduct] = useState([]);

  const getPostList = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/getlist`)
        .then((res) => {
          setProduct(res.data);
          return 0;
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div style={{}}>

      {/* 내가 진행하고 있는 켐페인에 대한 리스트 */}
      <div>
        내가 참가한 켐페인 리스트
      </div>


             {/* 상품 추천 슬라이더  */}
      {/* <ProductRecommendSlider /> */}
    <div className="main_Right_chan" style={{ display: 'flex', flexWrap: 'wrap', }}>
      {product ? product.map(item => {
        return (
          <div key={item._id} style={{ marginInline: '40px', marginTop: '40px' }}>
            <Link to={`/Detail/${item._id}`} style={{ color: 'black', display: 'flex', flexDirection: 'column', width: '200px', height: '280px', alignItems: 'flex-start' }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: 'red' }}>
                <img className='profile-img' src={item.photo} width='200px' height='200px' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '20px' }}>
                  <div>
                    {item.brand}
                  </div>
                </div>
                <div style={{ fontSize: '20px' }}>
                  {item.name}
                </div>
              </div>
              <div style={{ fontSize: '14px' }}>
                {item.point}
              </div>
            </Link>
          </div>
        )
      }) : ''}
    </div>
    </div>
  );
};

export default ProdcutView;
