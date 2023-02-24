import React from "react";
import { Form } from "react-bootstrap";
import "./uploadProduct.css";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import AWS from "aws-sdk";
import {
  addDoc,
  setDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adUserInfo } from "../../../../api";

import { db, auth } from "../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state/index";
import { appendprd } from "../../../../state/actioncreators";
import { async } from "@firebase/util";

const UploadProduct = () => {
  const auth = getAuth();
  const uid = auth?.currentUser?.uid || "undefined";

  const adQuery = useQuery({
    queryKey: ["ad"],
    queryFn: () => adUserInfo(uid),
  });
  if (adQuery.isLoading === "loading") console.log("loading");
  if (adQuery.status === "error") console.log("err");

  const authorUid = auth?.currentUser?.uid || "undefined";
  const authorEmail = adQuery?.data?.data?.email;

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser, appendprd } =
    bindActionCreators(actionCreators, dispatch);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState(adQuery?.data?.data?.brand_name);
  const [targetPlatform, setTargetPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [period, setPeriod] = useState("");
  const [postType, setPostType] = useState("");
  const [point, setPoint] = useState("");
  const [applicationConditions, setApplicationConditions] = useState("");
  const [qualification, setQualification] = useState("");
  const [isCheck, setIsCheck] = useState("");
  const [detailPage, setDetailPage] = useState("");
  const [offersAndMissions, setOffersAndMissions] = useState("");
  const [photo, setPhoto] = useState("");
  const [subimage, setSubimage] = useState([]);
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const user = auth.currentUser;

  const addNewPrdChannel = async () => {
    const prdfsid = await addDoc(collection(db, "prdRoom"), {
      name: { name },
      writer: { authorUid },
      createdAt: serverTimestamp(),
    });
    console.log(prdfsid.id)
    const fff = prdfsid.id;
    return fff;
  };

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:f1312c6d-5d6d-49bd-9b44-7a3504d36aef",
    }),
  });

  const handleFileInput = (e) => {
    var today = new Date();
    const file = e.target.files[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "cellabor",
        Key: "prds/" + authorUid + today + ".jpg",
        Body: file,
      },
    });

    const promise = upload.promise();
    promise.then(
      function (data) {
        setPhoto(data.Location.toString());
        console.log("checkthephoto: ", data.Location);
        alert("이미지 업로드에 성공했습니다.");
        console.log("data: ", photo, "data type: ", typeof photo);
      },
      function (err) {
        return alert("오류가 발생했습니다.", err.message);
      }
    );
  };

  const handleSubFileInput = async (e) => {
    var today = new Date();
    const selected = e.target.files;
    console.log(selected);
    const urlList = [...subimage];

    for (let i = 0; i < selected.length; i++) {
      var file = selected[i];
      var fileName = file.name;

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: "cellabor",
          Key: "prds/" + fileName + today + ".jpg",
          Body: selected[i],
        },
      });

      const data = await upload.promise();

      urlList.push(data.Location);
      console.log(urlList);
    }

    setSubimage(urlList);
    console.log(subimage);
    console.log(subimage[0]);
  };

  const handleDeleteImage = (id) => {
    setSubimage(subimage.filter((_, index) => index !== id));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    console.log('submit')
    const qqq = await addNewPrdChannel();
    
    const prdfsidDb = qqq;
    const uid = authorUid;
    const progress_prd = qqq;
    try {
      console.log(qqq);
      const res = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/products/upload`, {
          name,
          brand,
          targetPlatform,
          category,
          period,
          postType,
          point,
          applicationConditions,
          qualification,
          isCheck,
          detailPage,
          offersAndMissions,
          photo,
          subimage,
          mobile,
          authorEmail,
          authorUid,
          prdfsidDb,
        })
        .then((res) => {
          console.log(res.data);
          console.log("success");
        });
      const resprdad = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/ad/ad_add_prd`, {
          uid,
          progress_prd,
        })
        .then((resprdad) => {
          console.log("success");
          console.log(resprdad.data);
        });
      console.log(
        name,
        brand,
        targetPlatform,
        category,
        period,
        postType,
        point,
        applicationConditions,
        qualification,
        isCheck,
        detailPage,
        offersAndMissions,
        photo,
        subimage,
        mobile,
        authorEmail,
        authorUid,
        prdfsidDb
      );
    } catch (err) {
      console.log(err);
      console.log("failed");
      console.log(
        name,
        brand,
        targetPlatform,
        category,
        period,
        postType,
        point,
        applicationConditions,
        qualification,
        isCheck,
        detailPage,
        offersAndMissions,
        photo,
        subimage,
        mobile,
        authorUid,
        authorEmail,
        prdfsidDb
      );
      throw new Error("Something bad happened");
    }
    const data = {
      name,
      brand,
      targetPlatform,
      category,
      period,
      postType,
      point,
      applicationConditions,
      qualification,
      isCheck,
      detailPage,
      offersAndMissions,
      photo,
      subimage,
      mobile,
      authorEmail,
      authorUid,
      prdfsidDb,
    };
    appendprd(data);
    
    navigate("/Main");
    
    alert("상품 업로드 완료");
  };

  return (
    <div className="prdUploadContainer">
      <div className="imageContainer">
        <div className="imgAnnounce" >
          <div>콜라보 커버 이미지를 등록해주세요.</div>
        </div>

        <div
          className="mainImageContainer"
          style={{ display: "flex", justifyContent: "center", }}
        >
          <div
            className="mainInamge"
            style={{
              width: "25vw",
              height: "25vw",
              // border: "3px solid rgba(0, 0, 0)",
              backgroundColor: "#E6E6E6",
            }}
          >
            <label
              htmlFor="upload"
              className="image-upload-wrapper"
              onChange={handleFileInput}
            >
              <img
                className="profile-img"
                src={photo}
                style={{ width: "25vw", height: "25vw" }}
              />

              <input
                type="file"
                id="upload"
                className="image-upload"
                style={{
                  opacity: 0,
                }}
              />
            </label>
          </div>
        </div>

        <div
          className="subImageContainer"
          style={{
            display: "flex",

            alignItems: "center",
            width: "100%",
            // border: "3px solid rgba(0, 0, 0)",
            height: "80vh",
            marginTop: "40px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              // justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="input-file"
              onChange={handleSubFileInput}
              style={{
                width: "360px",
                height: "30px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <input
                type="file"
                id="input-file"
                multiple
                style={{
                  opacity: 0,
                }}
              />

              <span>내용 이미지 추가</span>
            </label>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {subimage.map((image, id) => (
              <div key={id} style={{}}>
                <img
                  src={image}
                  alt={`${image}-${id}`}
                  style={{ width: "25vw", marginBlock: "7px" }}
                />
                <Button
                  onClick={() => {
                    handleDeleteImage(id);
                    console.log("", id);
                  }}
                  style={{}}
                >
                  ✕
                </Button>
              </div>
            ))}
            {/* <div
                style={{
                  width: "100%",
                  height: "100%",
                  border: "3px solid rgba(0, 0, 0)",
                }}
              >
                s
              </div>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
              >
                s
              </div>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
              >
                s
              </div>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                }}
              >
                s
              </div> */}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "35vw",
          flexDirection: "column",
        }}
      >
        <Form onSubmit={handlePost} id="prdform">
          <div className="formCell">
            
              {/* <Form.Control
              type="name"
              placeholder="ItemName"
              onChange={(e) => setName(e.target.value)}
            /> */}
              <InputLabel htmlFor="component-simple">켐페인 제목</InputLabel>
              <Input
                type="name"
                id="component-simple"
                onChange={(e) => setName(e.target.value)}
              />
            
          </div>

          <div style={{ display: "flex" }}>
            <div className="formCell">
              
                <InputLabel htmlFor="component-simple">브랜드명</InputLabel>
                <Input
                  type="brand"
                  id="component-simple"
                  defaultValue={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              
            </div>

            <div className="formCell">
             
                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={targetPlatform}
                  defaultValue=""
                  label="Platform"
                  onChange={(e) => setTargetPlatform(e.target.value)}
                >
                  <MenuItem value={"instagram"}>Instagram</MenuItem>
                  <MenuItem value={"facebook"}>Facebook</MenuItem>
                  <MenuItem value={"blog"}>Blog</MenuItem>
                  <MenuItem value={"youtube"}>Youtube</MenuItem>
                </Select>
              
            </div>
          </div>

          <div className="formCell">
            
              {/* <Form.Control
                type="category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              /> */}
              <InputLabel htmlFor="component-simple">Category</InputLabel>
              <Input
                type="category"
                id="component-simple"
                onChange={(e) => setCategory(e.target.value)}
              />
            
          </div>

          <div className="formCell">
           
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  inputFormat="yyyy/MM/dd hh:mm "
                  value={period}
                  onChange={(newValue) => {
                    setPeriod(newValue);
                  }}
                />
              </LocalizationProvider>
          
          </div>

          <div className="formCell">
           
          
              <InputLabel htmlFor="component-simple">postType</InputLabel>
              <Input
                style={{ width: "300px" }}
                type="postType"
                id="component-simple"
                onChange={(e) => setPostType(e.target.value)}
              />
           
          </div>

          <div className="formCell">
           
              <InputLabel htmlFor="component-simple">포인트</InputLabel>
              <Input
                type="point"
                id="component-simple"
                onChange={(e) => setPoint(e.target.value)}
              />
          
          </div>

          <div className="formCell">
            
              <InputLabel htmlFor="component-simple">
                applicationConditions
              </InputLabel>
              <Input
                type="applicationConditions"
                id="component-simple"
                onChange={(e) => setApplicationConditions(e.target.value)}
              />
            
          </div>

          <div className="formCell">
           
              <InputLabel htmlFor="component-simple">신청 조건</InputLabel>
              <Input
                type="qulification"
                id="component-simple"
                onChange={(e) => setQualification(e.target.value)}
              />
          
          </div>

          <div className="formCell">
           
              <InputLabel htmlFor="component-simple">isCheck</InputLabel>
              <Input
                type="isCheck"
                id="component-simple"
                onChange={(e) => setIsCheck(e.target.value)}
              />
           
          </div>

          <div className="formCell">
           
              <TextField
                multiline
                rows={8}
                type="detailPage"
                id="component-simple"
                onChange={(e) => setDetailPage(e.target.value)}
                style={{}}
              />
          
          </div>

          <div className="formCell">
         
              <InputLabel htmlFor="component-simple">미션</InputLabel>
              <Input
                type="offersAndMissions"
                id="component-simple"
                onChange={(e) => setOffersAndMissions(e.target.value)}
              />
          
          </div>

          <div className="formCell">
          
              <InputLabel htmlFor="component-simple">담장자 연락처</InputLabel>
              <Input
                type="mobile"
                id="component-simple"
                onChange={(e) => setMobile(e.target.value)}
              />
         
          </div>
          <div>
            <button
              variant="contained"
              type="submit"
              value="Submit"
              style={{ backgroundColor: "pink" }}
              
            >
              Product Upload
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UploadProduct;
