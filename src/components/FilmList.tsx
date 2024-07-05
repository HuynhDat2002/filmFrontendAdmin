import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import React, { useEffect } from "react"
import { getMovies } from "@/lib/features/movie.slice"
import axios from 'axios'
import FilmCard from './FilmCard'
import Image from 'next/image'
import { FilmIcon,MonitorIcon } from "@iconicicons/react"
import { getAllTV } from "@/lib/features/tv.slice"


export default function FilmList(tab: any) {
  console.log(`tabbbb`, tab)
  const dispatch = useAppDispatch()
  const movies: any = useAppSelector((state) => state.movieReducer.movies.metadata)
  const tvs: any = useAppSelector((state) => state.tvReducer.tvs.metadata)

  useEffect(() => {
    // Gọi hành động getMovies khi component được mount
    dispatch(getMovies());
    dispatch(getAllTV());

  }, []);

  const renderCategoryIcon = (category: string) => {
    if (category === 'movie') {
      return <FilmIcon className="pl-1 text-base" />
    } else {
      return <MonitorIcon className="pl-1 text-base" />
    }
  }

  const renderCategoryText = (category: string) => {
    if (category === 'movie') {
      return 'Movie'
    } else {
      return 'TV Shows'
    }
  }
  return (
    <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-start  ">
      {tab.tab === "Movies" && movies.map((movie: any) => (
        <div
          key={movie._id}
        >
          <FilmCard data ={movie}/>
        </div>
      ))}
       {tab.tab === "TV Shows" && tvs.map((tv: any) => (
        <div
          key={tv._id}
        >
          <FilmCard data ={tv}/>
        </div>
      ))}
    </div>
  )
}
