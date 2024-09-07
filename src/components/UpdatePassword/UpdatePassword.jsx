import React, { useContext, useState } from 'react'
import styles from './UpdatePassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { UserTokenContext } from '../../Context/UserTokenContext';
export default function UpdatePassword() {
    let[apiError,setApiError] = useState(null)
    let[isLoading,setIsLoading] = useState(null)
    let navigate = useNavigate()
    let {setToken ,convertToken} = useContext(UserTokenContext)

    function updatePass(formValue) {
        // console.log("hiiiii", formValue);
        setApiError(null);
        setIsLoading(true)
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', formValue)
        .then((res) => {
            let {data} = res;
            
            if(data.token){
                
                setIsLoading(false)
                setToken(data.token)
                window.localStorage.setItem("token",data.token)
                convertToken()
                navigate('/home')
                
            }
            else{
                // grb tany
            }
        })
        .catch((err) =>{
            setApiError(err.response.data.message)
            setIsLoading(false)
        })

        

    }



    let myForm = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("invalid email").required("Required"),
            newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/).required("Required"),
        }),
        onSubmit: updatePass
    })



    return (
        <>
            <form onSubmit={myForm.handleSubmit} className='max-w-lg mx-auto mt-20'>
                <h1 className='text-center py-4'><span className='text-green-500' >Sign in</span> and start Now </h1>

                {apiError && <h1 className='text-red-600'>Incorrect email or password</h1>}
                
                
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your email" />
                </div>
                {myForm.errors.email && myForm.touched.email?<div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.email}</span> 
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new Password</label>
                    <input type="password" name='newPassword' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.newPassword} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your password" />
                </div>
                {myForm.errors.newPassword && myForm.touched.newPassword?<div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.newPassword}</span> 
                </div> : null}
                    
                    
                <button type="submit" disabled={isLoading} className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading ? <i className='fa fa-spinner fa-spin mx-3 text-white text-2xl'></i> : 'login'}
                </button>

            </form>
        </>
    )
}
