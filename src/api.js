import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'



const authApi = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`
})

export const infUserInfo = async(uid) => {
    const response =  await authApi.get('/inf/getInfInfo', {params: { uid: uid }})
    return response
  }

export const infPrd = async(uid) => {
    const response =  await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/getlistbyid`, { params: { uid }})
    return response
  }