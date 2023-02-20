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

// import SearchLocationInput from "./SearchLoaction";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

import {
  getAuth,
  updateProfile,
} from "firebase/auth";

import {
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import { infUserInfo, infPrd, infEditUserProfile } from "../../../api"

const UploadProfile = () => {
  
  const auth = getAuth();

  const uid = auth?.currentUser?.uid || "undefined"
  const infQuery = useQuery({queryKey:['inf'], queryFn: () => infUserInfo(uid)})
  if (infQuery.isLoading === "loading") console.log('loading')
  if (infQuery.status === "error") console.log('err')
  console.log(infQuery.data)

  const infEditPrfQuery = useMutation({
    mutationFn: () => infEditUserProfile(
       uid,nickname,tags,sex,birthday,insta,mobile,avatar,location
      ),
    onError: console.log('err'),
    onMutate: console.log('mutate'),
    onSuccess: console.log('sucess')
    })
    if( infEditPrfQuery.isSuccess ) console.log('loadinf')
    if( infEditPrfQuery.status === 'success') console.log('suc')




  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { infloginUser } = bindActionCreators(actionCreators, dispatch);

 
  
  const email = infQuery?.data?.data?.email;
  const [about, setAbout] = useState(infQuery?.data?.data?.about);
  const role = infQuery?.data?.data?.role;
  const [location, setLocation] = useState(
    infQuery?.data?.data?.location
  );
  const [nickname, setNickname] = useState(
    infQuery?.data?.data?.nickname
  );
  const [tags, setTags] = useState(infQuery?.data?.data?.tags);
  const [sex, setSex] = useState(infQuery?.data?.data?.sex);
  const [birthday, setBirthday] = useState(
    infQuery?.data?.data?.birthday
  );
  const [insta, setInsta] = useState(infQuery?.data?.data?.insta);
  const [facebook, setFacebook] = useState(
    infQuery?.data?.data?.facebook
  );
  const [tiktok, setTiktok] = useState(
    infQuery?.data?.data?.tiktok
  );
  const [twitter, setTwitter] = useState(
    infQuery?.data?.data?.twitter
  );
  const [youtube, setYoutube] = useState(
    infQuery?.data?.data?.youtube
  );
  const [avatar, setAvatar] = useState(
    infQuery?.data?.data?.avatar
  );
  const [mobile, setMobile] = useState(
    infQuery?.data?.data?.mobile
  );
  const denied_prd = infQuery?.data?.data?.denied_prd;
  const wait_prd = infQuery?.data?.data?.wait_prd;
  const progress_prd = infQuery?.data?.data?.progress_prd;
  const history_prd = infQuery?.data?.data?.history_prd;
  const joined_channel = infQuery?.data?.data?.joined_channel;



  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:f1312c6d-5d6d-49bd-9b44-7a3504d36aef",
    }),
  });

  const handleFileInput = (e) => {

    const file = e.target.files[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "cellabor",
        Key: "prfs/" + "INFPROFILE" + uid + ".jpg",
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
    } catch (err) {
      console.log("failed updateProfile");
    }
    // const userinfo = {
    //   uid,
    //   nickname,
    //   email,
    //   tags,
    //   about,
    //   role,
    //   avatar,
    //   sex,
    //   birthday,
    //   location,
    //   insta,
    //   facebook,
    //   tiktok,
    //   twitter,
    //   youtube,
    //   mobile,
    //   wait_prd,
    //   denied_prd,
    //   progress_prd,
    //   history_prd,
    //   joined_channel,
    // };
    // infloginUser(userinfo);
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

        <div> 안녕하세요 {infQuery?.data?.data?.nickname} 님</div>
        <Form onSubmit={handlePost} id="my-form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="nickname"
              placeholder={nickname}
              onChange={(e) => setNickname(e.target.value)}
              defaultValue={infQuery?.data?.data?.nickname}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="tags"
              placeholder="choose Tag!"
              onChange={(e) => setTags(e.target.value)}
              defaultValue={infQuery?.data?.data?.tags}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="Date"
              placeholder="how old?"
              onChange={(e) => setBirthday(e.target.value)}
              defaultValue={infQuery?.data?.data?.birthday}
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
              defaultValue={infQuery?.data?.data?.birthday}
            >
              <MenuItem value={'male'}>male</MenuItem>
              <MenuItem value={'female'}>female</MenuItem>
              <MenuItem value={'none'}>none</MenuItem>
              
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
              placeholder={infQuery?.data?.data?.insta}
              onChange={(e) => setInsta(e.target.value)}
              defaultValue={infQuery?.data?.data?.insta}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="mobile"
              placeholder="your Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              defaultValue={infQuery?.data?.data?.mobile}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="photo"
              placeholder={infQuery?.data?.data?.avatar}
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
          <GooglePlacesAutocomplete
                    apiKey= {process.env.REACT_APP_GOOGLEPLACES_API}
                    apiOptions={{ language: 'kor', region: 'kor' }}
                    selectProps={{
                      location,
                      onChange: setLocation
                    }}
                    styles={{
                      textInputContainer: {
                        backgroundColor: 'grey',
                      },
                      textInput: {
                        height: 38,
                        width:50,
                        color: '#5d5d5d',
                        fontSize: 16,
                      }
                    }}
                  />
            
          </div>
          

        </Form>
      </div>
    </div>
  );
};

export default UploadProfile;
