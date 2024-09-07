import React from 'react'
import styles from './ProtectedRoutesAgian.module.css'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutesAgian({children}) {
    if(!localStorage.getItem("token")){
        return children
    }else{
        return <Navigate to={'/home'}/>

    }
}
