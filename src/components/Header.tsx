'use client'
import Image from "next/image"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react'
import Login from "./Login";
import {useDisclosure} from '@nextui-org/use-disclosure'

export default function Header() {
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const {isOpen,onOpen,onOpenChange} = useDisclosure()
    return (
        <>
            <header className="px-4 py-4 bg-ctBlue-header relative" >
                <div className="flex flex-row text-white">
                    <div className="flex-1 flex justify-start items-center gap-4">

                        <div className="flex items-center">
                            <button className=" rounded-lg p-1">
                                <Image
                            src="/menu.png"
                            width={24}
                            height={24}
                            alt=""
                            />
                                {/* <FontAwesomeIcon icon={faBarsStaggered} /> */}
                            </button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Image
                                src="/logo-film.png"
                                width={24}
                                height={24}
                                alt=""
                            />
                            <p className="font-bold text-xl text-center">Navy</p>
                        </div>
                    </div>
                    <div className="flex-1 justify-center items-center ">
                        <form className="max-w-md mx-auto">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative focus:outline-none">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="ct-button-search"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex-1 flex justify-end items-center">
                        <button
                            type="button"
                            className='text-white font-bold bg-ctBlue-logo py-2 px-4 hover:bg-ctBlue-logo_hover rounded-lg'
                            onClick={onOpen}

                        >
                            Login
                        </button>
                    </div>
                </div>
              
            </header>
                <Login isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            
        </>
    )
}   