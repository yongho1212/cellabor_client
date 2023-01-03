import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

// 인플루언서 로그인데이터 불러오기
export const infUserInfo = async (uid) => {
  const response = await authApi.get("/inf/getInfInfo", {
    params: { uid: uid },
  });
  return response;
};

// 광고주 로그인데이터 불러오기
export const adUserInfo = async (uid) => {
  const response = await authApi.get("/ad/getAdInfo", {
    params: { uid: uid },
  });
  return response;
};

// 해당 인플루언서 진행중인 상품 불러오기
export const infPrd = async (uid) => {
  const response = await authApi.get("/products/getlistbyid", {
    params: { uid },
  });
  return response;
};

export const adPrd = async (uid) => {
  const response = await authApi.get("/ad/getAdInfo", {
    params: { uid },
  });
  return response
}

// 인플루언서 회원데이터 수정
export const infEditUserProfile = async ({
  uid,nickname,tags,sex,birthday,insta,mobile,avatar,location
}) => {
  const response = await authApi.get("/inf/inf_update_profile", {
    uid,
    nickname,
    tags,
    sex,
    birthday,
    insta,
    mobile,
    avatar,
    location,
  });
  return response;
};

// 광고주 회원데이터 수정
export const adEditUserProfile = async ({
  uid,brand_name,tags,insta,mobile,logo,website,facebook,twitter,youtube,location,about
}) => {
  const response = await authApi.get("/ad/ad_update_profile", {
    uid,
    brand_name,
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
  });
  return response;
};

// 서버에 올라와있는 상품들 불러오기
export const importAllProducts = async () => {
  const response = await authApi.post("/products/getlist")
  return response.data;
};
