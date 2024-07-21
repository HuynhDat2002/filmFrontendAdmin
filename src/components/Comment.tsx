
'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getCommentByFilm } from "@/lib/features/comment.slice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fassFaHeart } from '@fortawesome/free-regular-svg-icons'
import { FaHeart } from 'react-icons/fa'
const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "long" })
export default function Comment() {
    const dispatch = useAppDispatch()
    const [comments, setComments] = useState(Array<any>([]))
    const movie: any = useAppSelector((state) => state.movieReducer.movie.metadata)
    const comment: any = useAppSelector((state) => state.commentReducer)
    useEffect(() => {
        dispatch(getCommentByFilm({ filmId: movie._id as string }))
    }, [movie])

    useEffect(() => {
        if (comment.isSuccess && comment.isGetCommentByFilm) setComments(comment.comments?.metadata)
    }, [comment.isLoading])

    console.log('commentssss', comments)
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user") as string) ? JSON.parse(localStorage.getItem("user") as string) : { user: { _id: "" }, tokens: "" }
    console.log('user commenttttttttt', user)
    return (
        <div className="mt-5  flex flex-col border-1 shadow-lg  rounded-lg shadow-lg">
            <span className="font-bold text-2xl mx-5 py-5">Comment</span>
            {comments?.length > 0 && comments.map((comment: any) => (
                <div key={comment._id} id="comment" className="flex flex-col mx-5 p-2 ring-1 ring-ctBlue-logo rounded-lg shadow-lg">
                    <div id="header" className="flex flex-row justify-between">
                        <div className="text-lg font-bold">
                            {comment.comment_user?.name}
                        </div>

                        <div className="flex text-ctBlue-header">
                            {(() => {
                                const createDate = new Date(comment.createdAt);
                                return !isNaN(createDate.getTime())
                                    ? dateFormatter.format(createDate)
                                    : 'Ngày không hợp lệ';
                            })()}
                        </div>
                    </div>
                    <div>{comment.comment_content}</div>
                    <div>
                        <div >
                            <FaHeart 
                            
                            style={{
                                color:"red",
                                border: "1px solid black"
                            }} 
                           
                            />
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}