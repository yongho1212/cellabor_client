import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import ProductRecommendSlider from '../productrecommendsliderfolder/ProductRecommendSlider';
import Pagination from './Pagnation';
import { useQuery, useMutation } from "@tanstack/react-query";
import { importAllProducts } from '../../../../api';


const ProdcutView = ({ useParams }) => {
  const [product, setProduct] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = ( page -1 ) * limit;

  const importPrd = useQuery({
    queryKey: ["prd"],
    queryFn: () => importAllProducts(),
  });
  if (importPrd.isLoading === "loading") console.log("loading");
  if (importPrd.status === "error") console.log("err");
  if (importPrd.status === 'success') console.log("suc");
  console.log(importPrd.data);

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
    <div style={{justifyContent:'center', alignItems:'center'}}>

      {/* 내가 진행하고 있는 켐페인에 대한 리스트 */}
      <div>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      </div>


             {/* 상품 추천 슬라이더  */}
      {/* <ProductRecommendSlider /> */}
    <div className="main_Right_chan" style={{ display: 'flex', flexWrap: 'wrap', }}>
      {product ? product.slice(offset, offset + limit).map(item => {
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

      <div>
        <Pagination
          total = {product.length}
          limit = {limit}
          page = {page}
          setPage = {setPage}
        
        />
      </div>

    </div>
  );
};

export default ProdcutView;
