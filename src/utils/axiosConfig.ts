import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const base_url = "https://localhost/film/api"
const base_url_user = "https://localhost/admin/api"


interface Token {
    user: { _id: string };
    tokens: {accessToken:string,refreshToken:string};
}

export const getToken = (): Token => {
    const user = localStorage.getItem("user") as string;
    if (user) {

        console.log('getToken',JSON.parse(user))
        return JSON.parse(user) as Token;

    }
    return {
        user: { _id: "" },
        tokens: {accessToken:"",refreshToken:""}
    };
};


const createAxiosUserInstance = (token: Token) => {
    return axios.create({
        baseURL: base_url_user,
        withCredentials: true,
        headers: {
            'x-client-id': token.user._id || '',
            'authorization': token.tokens.accessToken || '',
            Accept: "application/json",
        },
    });
};

const createAxiosUserInstanceFilm = (token: Token) => {
    return axios.create({
        baseURL: base_url,
        withCredentials: true,
        headers: {
            'x-client-id': token.user._id || '',
            'authorization': token.tokens.accessToken || '',
            Accept: "application/json",
        },
    });
};



export const updateAxiosUserInstance = () => {
    const axiosUser = createAxiosUserInstance(getToken());
    return axiosUser
};

export const updateAxiosUserInstanceFilm = () => {
    const axios = createAxiosUserInstanceFilm(getToken());
    return axios
};