'use client'
import React,{useState,useEffect} from "react";
import {Pagination} from "@nextui-org/react";
import { useAppDispatch,useAppSelector } from "@/lib/hooks";

export default function Page({type}:{type:string}) {
    const [pageTotal,setPageTotal] = useState(0)
    const movie = useAppSelector((state)=>state.movieReducer)
    const tv = useAppSelector((state)=>state.tvReducer)
    useEffect(()=>{
        if(movie.isSuccess && movie.isGetAll && type==="Movies") {
           
            setPageTotal(Math.ceil(movie.movies.metadata.length/20))
            
        }
        if(tv.isSuccess && tv.isGetAll && type==="TV Shows") {
           
            setPageTotal(Math.ceil(tv.tvs.metadata.length/20))
            
        }
    },[movie.isLoading,tv.isLoading])

    console.log('pagetotal',pageTotal)
  return (
    <div className="flex justify-center">
        <Pagination isCompact showControls total={pageTotal} />
    </div>
  );
}
