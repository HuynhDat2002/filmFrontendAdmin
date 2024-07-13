import axios from "axios";
import { NextApiRequest,NextApiResponse } from "next";

export const base_url = "http://localhost:5003/api"

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

const createAxiosUserInstanceFilm = (token: Token) => {
    return axios.create({
        baseURL: base_url,
        withCredentials: true,
        headers: {
            'x-client-id': token.user._id || '',
            'authorization': token.tokens || '',
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