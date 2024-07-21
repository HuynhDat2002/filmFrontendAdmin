'use client'

import React, { useState, useEffect } from "react"
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getA } from "@/lib/features/movie.slice"
import { useParams } from 'next/navigation'
import ReactPlayer from 'react-player'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Rating as ReactRating } from '@smastrom/react-rating'
import { ratingMovie, getRatings } from "@/lib/features/movie.slice"
import Comment from "@/components/Comment"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Link, Spinner } from "@nextui-org/react";

export default function MovieDetail() {
    const dispatch = useAppDispatch()
    const [src, setSrc] = useState("")
    const [poster, setPoster] = useState("")
    const [playing, setPlaying] = useState(false);
    const [rating, setRating] = useState(0)
    const [ratingAverage, setRatingAverage] = useState(0)
    const [country, setCountry] = useState("")
    const [type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [actor, setActor] = useState("")
    const [director, setDirector] = useState("")
    const movie: any = useAppSelector((state) => state.movieReducer)
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user") as string) ? JSON.parse(localStorage.getItem("user") as string) : { user: { _id: "" }, tokens: "" }
    const params = useParams<{ id: string }>()
    
    useEffect(() => {
        // if (params?.id!==undefined) {
            dispatch(getA({ id: params?.id as string }))
            dispatch(getRatings({ filmId: params?.id as string }))
        // }
    }, [params])

    useEffect(() => {
        if (movie.isSuccess && movie.isGetA) {
            setSrc(movie.movie.metadata.video);
            setPoster(movie.movie.metadata.poster_url)


            const countryString = movie.movie.metadata.country.map((item: any) => item.name)
            setCountry(countryString.join(", "))
            const directorString = movie.movie.metadata.director.map((item: any) => item)
            setDirector(directorString.join(", "))

            const actorString = movie.movie.metadata.actor.map((item: any) => item)
            setActor(actorString.join(", "))
            const categoryString = movie.movie.metadata.category.map((item: any) => item.name)
            setCategory(categoryString.join(", "))

            setType(movie.movie.metadata.type[0].toUpperCase() + movie.movie.metadata.type.slice(1))
        }
        if (movie.isSuccess && movie.isGetRatings) { setRatingAverage(movie.ratings.metadata.ratingAverage) }
    }, [movie.isLoading])


    useEffect(() => {
        if (movie.ratings.metadata) {
            const userFound = movie.ratings.metadata.ratings.filter((r: any) => r.userId.toString() === user.user._id.toString())
            if (userFound.length > 0) {
                console.log('userFoundddddd', userFound[0].rating)
                setRating(userFound[0].rating as number)
            }
        }
    }, [movie.ratings])
    const handlePlay = (e: any) => {
        e.preventDefault()
        setPlaying(true);
    };


    
    const handleRating = (newRating: number) => {
        dispatch(ratingMovie({ filmId: params?.id as string, rating: newRating }))
        setRating(newRating)
    }

    return (
        <div className="w-[95%]">
            <div className=" flex flex-col  mx-auto mt-10 shadow-lg">

                {
                    !playing && poster !== "" &&

                    <div className="relative">
                        <img
                            src={movie.movie.metadata.poster_url}
                            alt="Movie poster"
                            className=""
                        />
                        <button
                            onClick={handlePlay}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-ctBlue-logo bg-opacity-50 ring-2 ring-ctBlue-logo"
                        >
                            <FontAwesomeIcon icon={faPlay} className="rounded-full" />
                        </button>
                    </div>
                }
                {playing &&
                    <iframe
                        src={movie.movie.metadata.video + "?autoplay=1"}
                        className="w-full h-[calc(8/16*100vw)] flex justify-center items-center"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay"
                    ></iframe>

                }
                {

                    !playing && poster === "" &&
                    <iframe
                        src={movie.movie.metadata.video + "?autoplay=1"}
                        className="w-full h-[calc(8/16*100vw)] flex justify-center items-center"
                        frameBorder="0"
                        allowFullScreen

                        allow="autoplay"
                    // allow="autoPlay"
                    ></iframe>
                }
                <div>
                    <p>Tập</p>
                    <p>Full</p>
                </div>
            </div>
            <div id="infomovie" className="mt-5  flex flex-row border-1 shadow-lg  rounded-lg shadow-lg">
                <div className="flex flex-col mx-5">

                    <p className="flex justify-start text-start py-5 font-bold dark:text-white text-xl">{movie.movie.metadata.name}</p>
                    <div className="flex flex-row gap-2 mb-2">
                        <div className="text-ctBlue-logo">
                            <p className="ring-1 ring-ctBlue-logo p-1">{movie.movie.metadata.quality}</p>
                        </div>
                        <div className="flex items-center text-red-600">
                            {movie.movie.metadata.time}
                        </div>
                        <div className="flex flex-row gap-2 justify-center items-center content-center">
                            <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={handleRating} />
                            <div>
                                {movie.ratings.metadata?.ratingAverage}/5
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            ({movie.movie.metadata.view} lượt xem)
                        </div>
                    </div>
                    <div className="text-gray-600">
                        {movie.movie.metadata.content}
                    </div>
                    {/* <div className="flex flex-col">
                        <div className="flex flex-row">
                            <p className="pr-5">Loại:</p>
                            <div>

                                {type}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <p className="pr-5">Quốc gia:</p>
                            <div>

                                {country}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <p className="pr-5">Thể  loại:</p>
                            <div>

                                {category}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <p className="pr-5">Năm:</p>
                            <div>

                                {movie.movie.metadata.year}
                            </div>

                        </div>
                        <div className="flex flex-row">
                            <p className="pr-5">Đạo diễn:</p>
                            <div>

                                {director}
                            </div>

                        </div>
                        <div className="flex flex-row">
                            <p className="pr-5">Diễn viên:</p>
                            <div>
                                {actor}
                            </div>

                        </div>
                        </div> */}
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/6">
                            <p className="pr-5">Loại:</p>
                            <p className="pr-5">Quốc gia:</p>
                            <p className="pr-5">Thể  loại:</p>
                            <p className="pr-5">Năm:</p>
                            <p className="pr-5">Đạo diễn:</p>
                            <p className="pr-5">Diễn viên:</p>
                        </div>
                        <div className="flex flex-col w-5/6">
                            <div>
                                {type}
                            </div>
                            <div>
                                {country}
                            </div>
                            <div>
                                {category}
                            </div>
                            <div>
                                {movie.movie.metadata.year}
                            </div>
                            <div>
                                {director}
                            </div>
                            <div>
                                {actor}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end w-[calc(12/9*100vh)] object-cover">
                    <Image
                        src={movie.movie.metadata.thumb_url}
                        alt={movie.movie.metadata.name}
                        width={231}
                        height={231}
                        className="object-cover rounded-md h-full"
                        unoptimized
                    />
                </div>
            </div>

            <Comment/>
        </div>
    )
}