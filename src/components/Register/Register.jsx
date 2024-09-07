import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default function Register() {

    let[apiError,setApiError] = useState(null)
    let[isLoading,setIsLoading] = useState(null)
    let navigate = useNavigate()

    function register(formValue) {
        // console.log("hiiiii", formValue);
        setApiError(null);
        setIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValue)
        .then((res) => {
            let {data} = res;

            if(data.message == "success"){
                navigate('/login')
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
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, "not less than 3").max(10, "not more than 10").required("Required"),
            email: Yup.string().email("invalid email").required("Required"),
            password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/).required("Required"),
            rePassword: Yup.string().oneOf([Yup.ref('password')]).required("Required"),
            phone: Yup.string().matches(/^01[0125][0-9]{8}$/).required("Required"),
        }),
        onSubmit: register
    })



    return (
        <>
            <form onSubmit={myForm.handleSubmit} className='max-w-lg mx-auto mt-20'>
                <h1 className='text-center py-4'><span className='text-green-500' >Signup NOW!</span> let's get started </h1>

                {apiError && <h1 className='text-red-600'>This email is used before try using another one</h1>}
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="text" name='name' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.name} id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your name" />
                </div>
                {myForm.errors.name && myForm.touched.name?<div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.name}</span> 
                </div> : null}
                
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your email" />
                </div>
                {myForm.errors.email && myForm.touched.email?<div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.email}</span> 
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name='password' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.password} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your password" />
                </div>
                {myForm.errors.password && myForm.touched.password?<div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.password}</span> 
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
                    <input type="password" name='rePassword' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.rePassword} id="rePassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your password again" />
                </div>
                {myForm.errors.rePassword && myForm.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.rePassword}</span> 
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input type="tel" name='phone' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.phone} id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your phone number" />
                </div>
                {myForm.errors.phone && myForm.touched.phone?<div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.phone}</span> 
                </div> : null}

                <button type="submit" disabled={isLoading} className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading ? <i className='fa fa-spinner fa-spin mx-3 text-white text-2xl'></i> : 'Register new account'}
                </button>
            </form>
        </>
    )
}
