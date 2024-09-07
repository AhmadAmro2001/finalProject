import React from 'react'
import styles from './ProtectedRoutesAgian.module.css'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutesAgian(props) {
    if(!localStorage.getItem("token")){
        return(
            <>
            {props.children}
            </>
        ) 
    }else{
        return <Navigate to={'/home'}/>

    }
}
