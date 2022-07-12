import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const InfluencerList = ({ useParams }) => {
  const [list, setList] = useState();

  const getInfluencerList = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/getlist`)
        .then((res) => {
          setList(res.data);
          return 0;
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getInfluencerList();
  }, []);

  return (
    <div className="main_Right_chan" style={{ display: 'flex', flexWrap: 'wrap', }}>
      {list ? list.map(item => {
        return (
          <div key={item._id} style={{ marginInline: '40px', marginTop: '40px' }}>
            <Link to={`/InfluencerProfile/${item._id}`} style={{ color: 'black', display: 'flex', flexDirection: 'column', width: '200px', height: '280px', alignItems: 'flex-start' }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: 'red' }}>
                <img className='profile-img' src={item.avatar} width='200px' height='200px' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '21px' }}>
                  <div>
                    {item.displayName}
                  </div>
                </div>
                <div style={{ fontSize: '21px' }}>
                  {item.age}
                </div>
              </div>
              <div style={{ fontSize: '14px' }}>
                {item.sex}
              </div>
            </Link>
          </div>
        )
      }) : ''}
    </div>
  );
};

export default InfluencerList;
