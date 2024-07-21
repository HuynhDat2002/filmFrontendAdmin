import { base_url ,updateAxiosUserInstanceFilm} from '../../utils/axiosConfig';
let axios = updateAxiosUserInstanceFilm()

export const getCommentByFilm = async (data:{filmId:string})=>{
    try{
        updateAxiosUserInstanceFilm()
        const response = await axios.get(`${base_url}/comment/getAllCommentByFilm/${data.filmId}`);
        console.log('get comments by film')
        return response.data;
    }
    catch (error:any){
        console.log('movie',error.response.data)
        throw error.response.data
    }
}

