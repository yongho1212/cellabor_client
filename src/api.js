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

// 해당 인플루언서 진행중인 상품 불러오기
export const infPrd = async (uid) => {
  const response = await authApi.get("/products/getlistbyid", {
    params: { uid },
  });
  return response;
};

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

// 서버에 올라와있는 상품들 불러오기
