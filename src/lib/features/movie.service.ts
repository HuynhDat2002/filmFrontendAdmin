import axios from 'axios'
import { base_url,config } from '../../utils/axiosConfig';

export const getMovies = async ()=>{
    const response = await axios.get(`${base_url}/movie/getAllMovie`);
    console.log(response.data)
    return response.data;
}