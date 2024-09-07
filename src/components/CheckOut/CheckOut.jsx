import React, { useContext, useState } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function CheckOut() {
    let {cartId} =useParams()
    let {cashOut} =useContext(CartContext)
    let navigate = useNavigate()
    let [isOnlinePayment,setIsOnlinePayment] = useState(false)
    async function pay() {
        console.log(myForm.values);
        let url =`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` 
        if(isOnlinePayment){
            url=`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
        }

        let res =await cashOut( url,myForm.values)
        if(res.status =="success"){
            if(isOnlinePayment){
                window.location.href = res.session.url
            }else{
            navigate("/allorders")
            }
        }

    }
    let myForm = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""

        },

        onSubmit: pay
    })
    return (
        <>
            <form onSubmit={myForm.handleSubmit} className=' mx-auto my-32'>
            <div className=' w-[50%] mx-auto'>
                <h1 className='text-green-600 text-2xl my-4'>Checkout</h1>
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                    <input type="text" name='details' onChange={myForm.handleChange} value={myForm.values.details} id="details" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your name" />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input type="tel" name='phone' onChange={myForm.handleChange} value={myForm.values.phone} id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your name" />
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                    <input type="text" name='city' onChange={myForm.handleChange} value={myForm.values.city} id="city" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Enter your name" />
                </div>
                <div className='flex flex-col'>
                    <div>
                    <input type="checkbox" id='forOnline' onChange={()=>setIsOnlinePayment(!isOnlinePayment)} />
                    <label htmlFor="forOnline">Pay online</label>
                    </div>
                <button type="submit" onClick={pay} className="text-white bg-green-500 mt-3 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isOnlinePayment ? 'Pay online ':'Cash on delivery'}
                </button>
                </div>
            </div>
            </form>
        </>
    )
}
