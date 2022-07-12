import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state/index";
import {
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import { reload } from "@firebase/auth";
import { async } from "@firebase/util";
import { flexbox } from "@mui/system";

const EditDetailpage = () => {
  const [product, setProduct] = useState([]); // 제품 정보
  const [applicant, setApplicant] = useState([]); // 지원자 목록
  const [infinfo, setInfinfo] = useState([]);
  const { id } = useParams();
  const [prdfsid, setPrdfsid] = useState("");
  const [prdname, setPrdname] = useState("");
  const prdidd = id;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser, adaddchannel } =
    bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  const uid = state.auth.state.loginData.uid;

  console.log(applicant);
  console.log(id);
  console.log(id);


  const onAcceptHandle = async (applicant_id) => {
    console.log(applicant_id.uid)
    try {
      console.log("accept try");
      const res = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/products/acceptApplicant`, {
          applicant_id,
          id,
        })
        .then((res) => {
          console.log("Accept Success!");
        });
    } catch (err) {
      console.log("Accept failed");
      console.log(applicant);
      throw new Error("Something bad happened");
    }
  };

  const onDeclineHandle = async (applicant_id) => {
    try {
      console.log("Decline try");
      const res = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/products/declineApplicant`, {
          applicant_id,
          id,
        })
        .then((res) => {
          console.log("Decline Success!");
        });
    } catch (err) {
      console.log("Decline failed");
      console.log(applicant);
    }
  };

  const removeItem = (applicant_id) => {
    setApplicant((applicant) =>
      applicant.filter((applicant) => {
        return applicant.applicant_id !== `${applicant_id}`;
      })
    );
  };

  const addNewInf = async (applicant_id) => {
    const infuid = applicant_id.uid
    const docRef = await collection(db, `prdRoom/${prdfsid}/inflist/`);
    const newChannel = await addDoc(docRef, {
      name: { infuid },
      Aduid: { uid },
      Infuid: { infuid },
      createdAt: serverTimestamp(),
    });

    console.log(newChannel.id);
    const joined_channel = newChannel.id;
    const progress_prd = prdfsid;
    const aduid = uid;
    
    const channelid = joined_channel;
    try {
      const resprdinf = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/inf/inf_add_prd`, {
          infuid,
          progress_prd,
        })
        .then((resprdinf) => {
          console.log("success");
          console.log(resprdinf.data);
        });
      const resad = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/ad/ad_add_channel`, {
          uid,
          joined_channel,
        })
        .then((resad) => {
          console.log("success");
          console.log(resad.data);
        });
      const resinf = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/inf/inf_add_channel`, {
          infuid,
          joined_channel,
        })
        .then((resinf) => {
          console.log("success");
          console.log(resinf.data);
        });
      const chdb = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/chat/addchat`, {
          aduid,
          infuid,
          prdname,
          prdfsid,
          channelid,
        })
        .then((chdb) => {
          console.log("success");
          console.log(chdb.data);
        });
      console.log(uid, joined_channel);
    } catch (err) {
      console.log(err);
      console.log("failed updateProfile");
      console.log(uid, joined_channel);
      throw new Error("Something bad happened");
    }
    adaddchannel(joined_channel);
  };

  //거절 버튼

  const rejectInf = async (applicant_id) => {
    const denied_prd = prdfsid;
    const infuid = applicant_id.uid
    try {
      const resprdinf = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/inf/inf_reject_prd`, {
          infuid,
          denied_prd,
        })
        .then((resprdinf) => {
          console.log("success");
          console.log(resprdinf.data);
        });
    } catch (err) {
      console.log(err);
      console.log("failed reject");
      throw new Error("Something bad happened");
    }
  };

  // 상품 삭제 하기
  const deletePrd = async () => {
    if (window.confirm("정말 삭제하시겠습니다?")) {
      const prdfsidDb = prdfsid;

      await deleteDoc(doc(db, "prdRoom", `${prdfsidDb}`));

      try {
        const delPrd = await axios
          .post(`${process.env.REACT_APP_SERVER_URL}/products/deleteProduct`, { prdfsidDb })
          .then((dltres) => {
            console.log("delete success");
            console.log(dltres.data);
          });
      } catch (err) {
        console.log(err);
        console.log("failed delte");
        throw new Error("Something bad happened");
      }
      alert("삭제완료!");
      navigate("/Main");
    } else {
      alert("취소");
    }
  };


  const getPostList = async (applicant_id) => {
    
    try {
      const res = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/products/getprdinfo`, { id })
        .then((res) => {
          console.log(res.data);
          const prdinfo = res.data;
          const list = prdinfo.applicant;
          const fsdb = prdinfo.prdfsidDb;
          const namae = prdinfo.name;
          setProduct(prdinfo);
          setApplicant(list);
          setPrdfsid(fsdb);
          setPrdname(namae);
        });
    } catch (err) {
      console.log(err);
    }
  };


//   // 물어보rl
// const posts = applicant.map(applicant_id => {
//   return axios
//     .get("${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo", { params: { uid: applicant_id }})
//     .then((res) => {
//         console.log(res.data)
//         // setInfinfo(res.data)
//         console.log(infinfo)
//     })
//     .catch(e => console.error(e));
// })

// const roundarr = async() => {
//     Promise.all(posts).then(res => setInfinfo(res.data));
//     console.log(infinfo);
// }
  
 const item = product;

  useEffect((applicant_id) => {
    const infuid = applicant_id
    const applicantsPromise = applicant.map(infuid => 
      axios.get(`${process.env.REACT_APP_SERVER_URL}/inf/getInfInfo`, { params: { uid: infuid }})
        .then((res) => res.data)
      );
      Promise.all(applicantsPromise).then(data => {setInfinfo({data})})
      
  }, [applicant])



  useEffect(() => {
    getPostList();
  }, []);

  useEffect(() => {
    console.log(applicant);
  }, [applicant]);

  console.log(applicant.length);
  console.log(infinfo)

  // function Show(k) {
  //   console.log(k)
  //   const result = infinfo.data.find(applicant => applicant.uid === `${k}`);
  //   console.log(result)
  //     return (
  //       <div>
  //         {JSON.stringify(result)}
  //       </div>
  //     );
  // }


  return (
    <div style={{ width: "60vw", marginInline: "20vw", marginTop: "5vh" }}>
      <div>{uid}</div>
      {item ? (
        <div>
          <div className="prdinfocontainer" style={{ display: "flex" }}>
            <div>
              <img src={item.photo} width="300" height="400" alt="testA" />
            </div>

            <div
              className="prdinfotext"
              style={{ fontSize: 20, marginLeft: "30px" }}
            >
              <div>item id</div>
              <div>{item._id}</div>
              <div>상품명 {item.name}</div>
              <div>브랜드 {item.brand}</div>
              <div>카테고리 {item.category}</div>
              <div>{item.mobile}</div>
              <div>{item.isCheck}</div>
              <div>타겟 플랫폼{item.targetPlatform}</div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <div style={{ width: "100%" }}>신청자 목록</div>

            {/* applicant로 해야하는지 infinfo로 해야하는지? */}
            {applicant.length !== 0 ? (
              infinfo.data.map((applicant_id) => {
                return (
                  <div 
                  key={applicant_id.uid} 
                  style={{
                    justifyContent:'space-between', 
                    alignItems:'center', 
                    display:'flex',
                    marginBlock:'10px',
                    padding:'5px',
                    
                    
                    }}
                  >
                    <div 
                    className="infoContainer"
                    style={{backgroundColor:'pink', width:'45vw'}}
                    >
                      <div>{applicant_id.nickname}</div>
                      <div>{applicant_id.email}</div>
                    </div>
                    
                    <div className="btnContainer"
                    style={{
                      backgroundColor:'#EDFFF2',
                      width:'15vw',
                      display:'flex'
                    }}
                    >
                      <Button
                        className="accept"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(applicant_id)
                          onAcceptHandle(applicant_id);
                          addNewInf(applicant_id);
                          removeItem(applicant_id);
                          // window.location.reload();
                        }}
                       style={{
                        width:'100%'
                       }}
                      >
                        ✔️
                      </Button>
                      <Button
                        className="decline"
                        onClick={(e) => {
                          e.preventDefault();
                          onDeclineHandle(applicant_id);
                          rejectInf(applicant_id);
                          removeItem(applicant_id);
                          window.location.reload();
                        }}
                        style={{
                          width:'100%'
                         }}
                      >
                        ✕
                      </Button>
                    </div>
                    
                    
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "grey",
                  height: "10vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15
                }}
              >
                아직 신청자가 없습니다.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>실패입니다</div>
      )}
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: "20px",
        }}
      >
        <Button onClick={() => deletePrd()} color="error" variant="outlined">
          상품 삭제하기
        </Button>
      </div>
    </div>
  );
};

export default EditDetailpage;
