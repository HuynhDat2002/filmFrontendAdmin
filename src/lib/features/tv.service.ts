import axios from 'axios'
import { base_url,config } from '../../utils/axiosConfig';

export const getAllTV= async ()=>{
    const response = await axios.get(`${base_url}/tv/getAllTV`);
    console.log(response.data)
    return response.data;
}