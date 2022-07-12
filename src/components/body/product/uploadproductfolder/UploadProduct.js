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

import { db, auth } from "../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state/index";
import { appendprd } from "../../../../state/actioncreators";
import { async } from "@firebase/util";

const UploadProduct = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser, appendprd } =
    bindActionCreators(actionCreators, dispatch);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState(
    state.advertiser.state.adloginData.brand_name
  );
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
  const authorUid = state.advertiser.state.adloginData.uid;
  const authorEmail = state.advertiser.state.adloginData.email;

  const addNewPrdChannel = async () => {
    const prdfsid = await addDoc(collection(db, "prdRoom"), {
      name: { name },
      writer: { authorUid },
      createdAt: serverTimestamp(),
    });
    const fff = prdfsid.id;
    return fff;
  };

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:118bc61e-49a2-424d-a6d7-a98a1f6d4605",
    }),
  });

  const handleFileInput = (e) => {
    var today = new Date();
    const file = e.target.files[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "swaybucket",
        Key: authorUid + today + ".jpg",
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
          Bucket: "swaybucket",
          Key: fileName + today + ".jpg",
          Body: selected[i],
        },
      });

      const data = await upload.promise();

      urlList.push(data.Location);
      console.log(urlList);

      //   promise.then(
      //     function (data) {
      //       console.log(data.Location);
      //       urlList.push(data.Location);
      //       console.log(urlList);
      //       console.log("checkthephoto: ", data.Location);
      //       // uploaded.push(data.Location)
      //       alert("이미지 업로드에 성공했습니다.");
      //       console.log("data: ", urlList[i], "data type: ", typeof urlList[i]);
      //     },
      //     function (err) {
      //       return alert("오류가 발생했습니다.", err.message);
      //     }
      //   );
    }

    //이게 무조건 루프문 끝나고 돌아야하는데 왜 쳐 먼저 도
    setSubimage(urlList);
    console.log(subimage);
    console.log(subimage[0]);
  };

  const handleDeleteImage = (id) => {
    setSubimage(subimage.filter((_, index) => index !== id));
  };

  const handlePost = async (e) => {
    e.preventDefault();
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
        .post(`${process.env.REACT_APP_SERVER_URL}/ad/ad_add_prd`, { uid, progress_prd })
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
    console.log(state.myprd);
    navigate("/Dashmain");
    console.log(state.myprd);
    alert("상품 업로드 완료");
  };

  return (
    <div
      className="prdUPloadContainer"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginInline: "10vw",
        height: "100%",
        width: "80vw",
        marginInline: "10vw",
        marginTop: "39px",
      }}
    >
      <div
        className="imageContainer"
        style={{
          backgroundColor: "skyblue",
          width: "50%",
        }}
      >
        <div
          className="mainImageContainer"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="mainInamge"
            style={{
              width: "25vw",
              height: "25vw",
              border: "3px solid rgba(0, 0, 0)",
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
                // onChange={handleFileInput}
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
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            border: "3px solid rgba(0, 0, 0)",
            height: "15vw",
            marginTop: "3vw",
          }}
        >
          <div style={{}}>
            <div style={{ display: "flex" }}>
              {subimage.map((image, id) => (
                <div key={id} style={{ marginInline: "3px" }}>
                  <img
                    src={image}
                    alt={`${image}-${id}`}
                    style={{ width: "10vw" }}
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
            </div>
            <div style={{ display: "flex" }}></div>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="input-file"
                onChange={handleSubFileInput}
                style={{
                  backgroundColor: "red",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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

                <span>사진추가</span>
              </label>
            </div>
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
            <FormControl
              className="mb-3"
              controlId="formBasicName"
              fullWidth
              variant="filled"
            >
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
            </FormControl>
          </div>

          <div style={{ display: "flex" }}>
            <div className="formCell">
              <FormControl className="mb-3" controlId="formBasicName">
                {/* <Form.Control
              type="brand"
              placeholder={brand}
              onChange={(e) => setBrand(e.target.value)}
            /> */}
                <InputLabel htmlFor="component-simple">브랜드명</InputLabel>
                <Input
                  type="brand"
                  id="component-simple"
                  defaultValue={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormControl>
            </div>

            <div className="formCell">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
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
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="period"
                placeholder="Period"
                onChange={(e) => setPeriod(e.target.value)}
              /> */}
              {/* <InputLabel htmlFor="component-simple">마감기한</InputLabel> */}
              {/* <TextField
                type="Date"
                placeholder="date today"
                onChange={(e) => setPeriod(e.target.value)}
              /> */}
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
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="postType"
                placeholder="PostType"
                onChange={(e) => setPostType(e.target.value)}
              /> */}
              <InputLabel htmlFor="component-simple">postType</InputLabel>
              <Input
                style={{ width: "300px" }}
                type="postType"
                id="component-simple"
                onChange={(e) => setPostType(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="point"
                placeholder="Point"
                onChange={(e) => setPoint(e.target.value)}
              /> */}
              <InputLabel htmlFor="component-simple">포인트</InputLabel>
              <Input
                type="point"
                id="component-simple"
                onChange={(e) => setPoint(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="applicationConditions"
                placeholder="ApplicationConditions"
                onChange={(e) => setApplicationConditions(e.target.value)}
              /> */}
              <InputLabel htmlFor="component-simple">
                applicationConditions
              </InputLabel>
              <Input
                type="applicationConditions"
                id="component-simple"
                onChange={(e) => setApplicationConditions(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="qulification"
                placeholder="Qualification"
                onChange={(e) => setQualification(e.target.value)}
              /> */}
              <InputLabel htmlFor="component-simple">신청 조건</InputLabel>
              <Input
                type="qulification"
                id="component-simple"
                onChange={(e) => setQualification(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              <InputLabel htmlFor="component-simple">isCheck</InputLabel>
              <Input
                type="isCheck"
                id="component-simple"
                onChange={(e) => setIsCheck(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl fullWidth className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="detailPage"
                placeholder="DetailPage"
                onChange={(e) => setDetailPage(e.target.value)}
              /> */}
              {/* <InputLabel htmlFor="component-simple">상세 설명</InputLabel> */}
              <TextField
                multiline
                rows={8}
                type="detailPage"
                id="component-simple"
                onChange={(e) => setDetailPage(e.target.value)}
                style={{}}
              />
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="offersAndMissions"
                placeholder="OffersAndMissions"
                onChange={(e) => setOffersAndMissions(e.target.value)}
              /> */}
              <InputLabel htmlFor="component-simple">미션</InputLabel>
              <Input
                type="offersAndMissions"
                id="component-simple"
                onChange={(e) => setOffersAndMissions(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="formCell">
            <FormControl className="mb-3" controlId="formBasicName">
              {/* <Form.Control
                type="mobile"
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
              /> */}
              <InputLabel htmlFor="component-simple">담장자 연락처</InputLabel>
              <Input
                type="mobile"
                id="component-simple"
                onChange={(e) => setMobile(e.target.value)}
              />
            </FormControl>
          </div>
          {/* <FormControl className="mb-3" controlId="formBasicName">
            <Form.Control
              type="photo"
              placeholder="photo"
              value={photo}
              defaultValue="사진을 선택하세요"
            />
          </FormControl> */}
          <div className="formCell">
            <Button
              variant="contained"
              type="Submit"
              style={{ backgroundColor: "pink" }}
            >
              Upload Please!
            </Button>
          </div>

          <div></div>
        </Form>
      </div>
    </div>
  );
};

export default UploadProduct;
