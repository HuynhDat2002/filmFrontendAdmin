import { base_url, updateAxiosUserInstanceFilm } from '../../utils/axiosConfig';

let axios = updateAxiosUserInstanceFilm()
export const getAllTV = async () => {
    try {
        const response = await axios.get(`${base_url}/tv/getAllTV`);
        console.log(response.data)
        return response.data;

    }
    catch (error: any) {
        throw error.response.data
    }
}

export const search = async (data: { query: string, page: string }) => {
    try {

        const response = await axios.get(`${base_url}/tv/getAllTV?query=${data.query}&page=${data.page}`);
        console.log(response.data)
        return response.data;
    }
    catch (error: any) {
        throw error.response.data
    }
}

export const getA = async (data: {id:string}) => {
    try {

        const response = await axios.get(`${base_url}/tv/getTV/${data.id}`);
        console.log(response.data)
        return response.data;
    }
    catch (error: any) {
        throw error.response.data
    }
}



export const ratingTV = async (data:{filmId:string,rating:number})=>{
    try{
        updateAxiosUserInstanceFilm()
        const response = await axios.patch(`/tv/ratingTV`,{filmId:data.filmId,rating:data.rating});
        console.log(response.data)
        return response.data;
    }
    catch (error:any){
        throw error
    }
}

export const getRatings = async (data:{filmId:string})=>{
    try{
        updateAxiosUserInstanceFilm()

        const response = await axios.get(`/tv/getRatings/${data.filmId}`);
        console.log(response.data)
        return response.data;
    }
    catch (error:any){
        throw error
    }
}