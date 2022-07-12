import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "react-bootstrap";
import AWS from "aws-sdk";
import Avatar from "@mui/material/Avatar";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select
} from "@mui/material";
import { TagsInput } from "react-tag-input-component";

import SearchLocationInput from "./SearchLoaction";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

const UploadProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { infloginUser } = bindActionCreators(actionCreators, dispatch);

  const uid = state.influencer.state.infloginData.uid;
  const email = state.influencer.state.infloginData.email;
  const [about, setAbout] = useState(state.influencer.state.infloginData.about);
  const role = state.influencer.state.infloginData.role;
  const [location, setLocation] = useState(
    state.influencer.state.infloginData.location
  );
  const [nickname, setNickname] = useState(
    state.influencer.state.infloginData.nickname
  );
  const [tags, setTags] = useState(state.influencer.state.infloginData.tags);
  const [sex, setSex] = useState(state.influencer.state.infloginData.sex);
  const [birthday, setBirthday] = useState(
    state.influencer.state.infloginData.birthday
  );
  const [insta, setInsta] = useState(state.influencer.state.infloginData.insta);
  const [facebook, setFacebook] = useState(
    state.influencer.state.infloginData.facebook
  );
  const [tiktok, setTiktok] = useState(
    state.influencer.state.infloginData.tiktok
  );
  const [twitter, setTwitter] = useState(
    state.influencer.state.infloginData.twitter
  );
  const [youtube, setYoutube] = useState(
    state.influencer.state.infloginData.youtube
  );
  const [avatar, setAvatar] = useState(
    state.influencer.state.infloginData.avatar
  );
  const [mobile, setMobile] = useState(
    state.influencer.state.infloginData.mobile
  );
  const denied_prd = state.influencer.state.infloginData.denied_prd;
  const wait_prd = state.influencer.state.infloginData.wait_prd;
  const progress_prd = state.influencer.state.infloginData.progress_prd;
  const history_prd = state.influencer.state.infloginData.history_prd;
  const joined_channel = state.influencer.state.infloginData.joined_channel;

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:118bc61e-49a2-424d-a6d7-a98a1f6d4605",
    }),
  });

  const handleFileInput = (e) => {

    const file = e.target.files[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "swaybucket",
        Key: "INFPROFILE" + uid + ".jpg",
        Body: file,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        setAvatar(data.Location.toString());
        console.log("checkthephoto: ", data.Location);
        alert("이미지 업로드에 성공했습니다.");
        console.log("data: ", avatar, "data type: ", typeof avatar);
      },
      function (err) {
        return alert("오류가 발생했습니다.", err.message);
      }
    );
  };

  const navigate = useNavigate();


  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/inf/inf_update_profile`, {
          uid,
          nickname,
          tags,
          sex,
          birthday,
          insta,
          mobile,
          avatar,
          location
        })
        .then((res) => {
          console.log("success");
        });
      console.log(uid, nickname, tags, sex, birthday, insta, mobile, avatar);
    } catch (err) {
      console.log("failed updateProfile");
      console.log(uid, nickname, tags, sex, birthday, insta, mobile, avatar);
    }
    const userinfo = {
      uid,
      nickname,
      email,
      tags,
      about,
      role,
      avatar,
      sex,
      birthday,
      location,
      insta,
      facebook,
      tiktok,
      twitter,
      youtube,
      mobile,
      wait_prd,
      denied_prd,
      progress_prd,
      history_prd,
      joined_channel,
      
    };
    infloginUser(userinfo);
    navigate("/Main");
  };

  console.log(location);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div>{uid}</div>
        <input
          type="file"
          id="upload"
          className="image-upload"
          onChange={handleFileInput}
        />
        <label htmlFor="upload" className="image-upload-wrapper">
          여기입니다.
        </label>
        <img className="profile-img" src={avatar} />

        <div> 안녕하세요 {state.influencer.state.infloginData.nickname} 님</div>
        <Form onSubmit={handlePost} id="my-form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="nickname"
              placeholder={nickname}
              onChange={(e) => setNickname(e.target.value)}
              defaultValue={state.influencer.state.infloginData.nickname}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="tags"
              placeholder="choose Tag!"
              onChange={(e) => setTags(e.target.value)}
              defaultValue={state.influencer.state.infloginData.tags}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="Date"
              placeholder="how old?"
              onChange={(e) => setBirthday(e.target.value)}
              defaultValue={state.influencer.state.infloginData.birthday}
            />
          </Form.Group>

          <FormControl sx={{ m: 1, width: 300 }}>
            
            <InputLabel id="demo-simple-select-label">Sex</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sex}
              label="sex"
              onChange={(e) => setSex(e.target.value)}
              defaultValue={state.influencer.state.infloginData.birthday}
            >
              <MenuItem value={'male'}>male</MenuItem>
              <MenuItem value={'female'}>female</MenuItem>
              
            </Select>
          </FormControl>

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="today"
              placeholder="date today"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="InstaId"
              placeholder={state.auth.state.loginData.insta}
              onChange={(e) => setInsta(e.target.value)}
              defaultValue={state.influencer.state.infloginData.insta}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="mobile"
              placeholder="your Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              defaultValue={state.influencer.state.infloginData.mobile}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="photo"
              placeholder={state.influencer.state.infloginData.avatar}
              value={avatar}
            />
          </Form.Group>

          <div>
            {/* <Button variant="primary" type="Submit">
              저장
            </Button> */}

            <h1>태그 추가</h1>

            <pre> {"#" + JSON.stringify(tags)+ " "}</pre>
            <div style={{borderWidth:1, borderColor:'#000'}}>
              <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="fruits"
                  placeHolder="enter fruits"
              />
            </div>
            
            <em>press enter to add new tag</em>
          </div>
          <div style={{height:'100px', zIndex:100}}>
            <SearchLocationInput 
              setLocation={setLocation}
            /> 
            
          </div>
          

        </Form>
      </div>
    </div>
  );
};

export default UploadProfile;
