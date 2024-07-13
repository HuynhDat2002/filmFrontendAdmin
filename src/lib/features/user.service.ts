
import axios from 'axios';
import {LoginValueProps,SignUpValueProps} from '@/types' 
import { updateAxiosUserInstanceFilm } from '@/utils/axiosConfig';
interface Token {
    user: { _id: string };
    tokens: string;
}

export const getToken = (): Token => {
    if (typeof window !== "undefined" && localStorage.getItem("user") as string) {
        return JSON.parse(localStorage.getItem("user") as string) as Token;
    }
    return {
        user: { _id: "" },
        tokens: ""
    };
};

const base_url_user = "http://localhost:5000/api"

const createAxiosUserInstance = (token: Token) => {
    return axios.create({
        baseURL: base_url_user,
        withCredentials: true,
        headers: {
            'x-client-id': token.user._id || '',
            'authorization': token.tokens || '',
            Accept: "application/json",
        },
    });
};
  
  
let axiosUser = createAxiosUserInstance(getToken());

export const updateAxiosUserInstance = () => {
    axiosUser = createAxiosUserInstance(getToken());
};
  
const getEmail =():string=>  {
    if(localStorage.getItem('email') ) return localStorage.getItem('email') as string
    return ""
} 

  
export const checkLogin = async ()=>{
    try{
        updateAxiosUserInstance()
        const response = await axiosUser.post(`/user/checkLogin`);
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const logIn = async (data:LoginValueProps)=>{
    try{

        const response = await axiosUser.post(`/user/signIn`,data);
        localStorage.setItem('user', JSON.stringify(response.data.metadata));
        updateAxiosUserInstance();  // Update the axios instance with new token
updateAxiosUserInstanceFilm()
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const signUp = async ()=>{
    try{
        const response = await axiosUser.post(`/user/signUp`);
        console.log('dataaa',response.data)
        localStorage.setItem('user', JSON.stringify(response.data.metadata));
        updateAxiosUserInstance();  // Update the axios instance with new token
updateAxiosUserInstanceFilm()
        return response.data;
    }
    catch (error:any){
        throw error.response.data
    }
}
export const logout = async ()=>{
    try{

        const response = await axiosUser.post(`/user/logout`);
        localStorage.clear();
        updateAxiosUserInstance();  // Update the axios instance after removing token
        updateAxiosUserInstanceFilm()
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const forgotPassword = async (data:{email:string})=>{
    try{

        const response = await axiosUser.post(`/user/forgotPassword`,data);
        localStorage.setItem('email',data.email)
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const verify = async (data:{otp:string})=>{
    try{
        const email = getEmail()
        const response = await axiosUser.post(`/user/verifyOTP`,{
            email:email,
            otp:data.otp
        });
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const resetPassword = async (data:{password:string,confirmPassword:string})=>{
    try{
        const email = getEmail()
        const response = await axiosUser.post(`/user/resetPassword`,{
            email:email,
            newPassword:data.password
        });
        if(response)
            localStorage.removeItem('email')
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}


export const sendOTP = async (data:{name:string,email:string,password:string})=>{
    try{
        const response = await axiosUser.post(`/user/sendOTP`,data);
        localStorage.setItem('email',data.email)

        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const changePassword=async (data:{password:string,newPassword:string})=>{
    try{
        updateAxiosUserInstance()
        const response = await axiosUser.post(`/user/changePassword`,data);
        updateAxiosUserInstanceFilm()
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const getUser=async ()=>{
    try{
        updateAxiosUserInstance()
        const response = await axiosUser.get(`/user/getUser`);
        if(localStorage.getItem('userinfo')) localStorage.removeItem('userinfo')
        localStorage.setItem('userinfo',JSON.stringify(response.data.metadata))
    updateAxiosUserInstanceFilm()
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}

export const editUser=async (data:{name:string})=>{
    try{
        updateAxiosUserInstance()
        const response = await axiosUser.patch(`/user/editUser`,data);
        if(localStorage.getItem('userinfo')) localStorage.removeItem('userinfo')

        localStorage.setItem('userinfo',JSON.stringify(response.data.metadata))
        return response.data;
    }
    catch (error:any){
        console.log(`error login`,error.response.data)
        throw error.response.data
    }
   
}