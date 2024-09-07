import React from 'react'
import styles from './NotFound.module.css'
import notFoundPic from '../../assets/error.svg'
export default function NotFound() {
    return (
        <>
            <div className="conatiner mx-auto flex justify-center">

            <img src={notFoundPic} className="w-1/2 " alt="" />
            </div>
        </>
    )
}
