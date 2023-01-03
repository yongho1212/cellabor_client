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
import { adUserInfo, adEditUserProfile } from "../../../api"

const ADEditProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { adloginUser } = bindActionCreators(actionCreators, dispatch);

  const auth = getAuth();
  const uid = auth?.currentUser?.uid || "undefined"
  const adQuery = useQuery({queryKey:['ad'], queryFn: () => adUserInfo(uid)})
  if (adQuery.isLoading === "loading") console.log('loading')
  if (adQuery.status === "error") console.log('err')
  console.log(adQuery.data)

  const adEditPrfQuery = useMutation({
    mutationFn: () => adEditUserProfile(
      uid,brand_name,tags,insta,mobile,logo,website,facebook,twitter,youtube,location,about
      ),
    onError: console.log('err'),
    onMutate: console.log('mutate'),
    onSuccess: console.log('sucess')
    })
    if( adEditPrfQuery.isSuccess ) console.log('loadad')
    if( adEditPrfQuery.status === 'success') console.log('suc')


  
  const email = adQuery?.data?.data?.email;
  const [about, setAbout] = useState(adQuery?.data?.data?.about);
  const role = adQuery?.data?.data?.role;
  const [location, setLocation] = useState(
    adQuery?.data?.data?.location
  );
  const [brand_name, setBrand_name] = useState(
    adQuery?.data?.data?.brand_name
  );
  const [tags, setTags] = useState(adQuery?.data?.data?.tags);

  const [insta, setInsta] = useState(adQuery?.data?.data?.insta);
  const [facebook, setFacebook] = useState(
    adQuery?.data?.data?.facebook
  );
  const [website, setWebsite] = useState(adQuery?.data?.data?.website);

  const [twitter, setTwitter] = useState(
    adQuery?.data?.data?.twitter
  );
  const [youtube, setYoutube] = useState(
    adQuery?.data?.data?.youtube
  );
  const [logo, setLogo] = useState(
    adQuery?.data?.data?.logo
  );
  const [mobile, setMobile] = useState(
    adQuery?.data?.data?.mobile
  );

  const progress_prd = adQuery?.data?.data?.progress_prd;
  const history_prd = adQuery?.data?.data?.history_prd;
  const joined_channel = adQuery?.data?.data?.joined_channel;

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
        Key: "BRANDLOGO" + uid + ".jpg",
        Body: file,
      },
    });
    const promise = upload.promise();

    promise.then(
      function (data) {
        setLogo(data.Location.toString());
        console.log("checkthephoto: ", data.Location);
        alert("이미지 업로드에 성공했습니다.");
        console.log("data: ", logo, "data type: ", typeof logo);
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
        .post(`${process.env.REACT_APP_SERVER_URL}/ad/ad_update_profile`, {
          uid,
          brand_name,
          tags,
          insta,
          mobile,
          logo,
          tags,
          website,
          facebook,
          twitter,
          youtube,
          location,
          about,
        })
        .then((res) => {
          console.log("success");
        });
      console.log( uid,brand_name,tags,insta,mobile,logo,tags,website,facebook,twitter,youtube,location,about);
    } catch (err) {
      console.log("failed updateProfile");
      console.log(uid,brand_name,tags,insta,mobile,logo,tags,website,facebook,twitter,youtube,location,about);
    }
    const userinfo = {
        uid,
        brand_name,
        email,
        about,
        tags,
        role,
        logo,
        insta ,
        facebook,
        twitter,
        youtube,
        website,
        mobile,
        location,
        progress_prd,
        history_prd,
        joined_channel
    };
    adloginUser(userinfo);
    navigate("/Main");
  };

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
        <img className="profile-img" src={logo} />

        <div> 안녕하세요 {adQuery?.data?.data?.brand_name} 님</div>
        <Form onSubmit={handlePost} id="my-form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="brand name"
              placeholder={brand_name}
              onChange={(e) => setBrand_name(e.target.value)}
              defaultValue={adQuery?.data?.data?.brand_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="tags"
              placeholder="choose Tag!"
              onChange={(e) => setTags(e.target.value)}
              defaultValue={adQuery?.data?.data?.tags}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="Date"
              placeholder="how old?"
              onChange={(e) => setBirthday(e.target.value)}
              defaultValue={adQuery?.data?.data?.birthday}
            />
          </Form.Group> */}

          {/* <FormControl sx={{ m: 1, width: 300 }}>
            
            <InputLabel id="demo-simple-select-label">Sex</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sex}
              label="sex"
              onChange={(e) => setSex(e.target.value)}
              defaultValue={adQuery?.data?.data?.birthday}
            >
              <MenuItem value={'male'}>male</MenuItem>
              <MenuItem value={'female'}>female</MenuItem>
              
            </Select>
          </FormControl> */}

          {/* <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="today"
              placeholder="date today"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="InstaId"
              placeholder={adQuery?.data?.data?.insta}
              onChange={(e) => setInsta(e.target.value)}
              defaultValue={adQuery?.data?.data?.insta}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="mobile"
              placeholder="your Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              defaultValue={adQuery?.data?.data?.mobile}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <TextField
              type="photo"
              placeholder={adQuery?.data?.data?.logo}
              value={logo}
            />
          </Form.Group>

          <div>
            <h1>Add Fruits</h1>

            <pre>{JSON.stringify(tags)}</pre>

            <TagsInput
                value={tags}
                onChange={setTags}
                name="fruits"
                placeHolder="enter fruits"
            />
            <em>press enter to add new tag</em>
            </div>
        </Form>
      </div>
    </div>
  );
};

export default ADEditProfile;
