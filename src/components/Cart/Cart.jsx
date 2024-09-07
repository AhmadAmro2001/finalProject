import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'

export default function Cart() {
    let [cartInfo,setCartInfo]=useState(null)
    let [isLoading,setIsLoading]=useState(true)
    let { getCart,removeProduct,updateProductCount ,setCartId,cartId,cartItemNo,setCartItemNo } = useContext(CartContext)
    let navigate =useNavigate()
    useEffect(() => {
        getCartInfo()
    }, [])

    async function getCartInfo() {
        let cartItems = await getCart()
        console.log(cartItems)
        if(cartItems){
            setCartItemNo(cartItems.numOfCartItems)
            setCartId(cartItems.data._id)
            setCartInfo(cartItems)
        }
        setIsLoading(false)
    }
    async function removeItem(id){
        let deletedItem = await removeProduct(id)
        console.log(deletedItem);
        setCartInfo(deletedItem)
        setCartItemNo(deletedItem.numOfCartItems)
        
    }
    async function updateCountNum(id,count){
        let UpdateItem = await updateProductCount(id,count)
        console.log(UpdateItem);
        setCartInfo(UpdateItem)
        setCartItemNo(UpdateItem.numOfCartItems)
        
    }
    function goToCheckout(){
        navigate(`/checkout/${cartId}`)
    }
    
    return (
        <>
            {isLoading ? <div className="flex justify-center align-middle my-32"><i className='fa fa-spinner fa-spin text-green-500 text-5xl'></i></div> :
            <div className="w-[70%] mx-auto my-32 relative overflow-x-auto shadow-md sm:rounded-lg">

            <h1 className='text-4xl text-green-500 font-bold mt-5 text-center'> Shipping Cart</h1>
            <div className="flex justify-between px-7 my-6">
                <h2 className='text-gray-600 text-xl'>Total cart Item: {cartInfo.numOfCartItems}</h2>
                <h2 className='text-gray-600 text-xl'>Total cart Price:{cartInfo.data.totalCartPrice} </h2>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total price per item
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cartInfo.data.products.filter(ele =>ele.count !=0).map(ele => <CartItem ele={ele} updateCountNum={updateCountNum} removeItem={removeItem} />)}
                    
                    
                </tbody>
            </table>
            <div className="flex justify-center mb-5">
            <button className='btn max-w-60' onClick={goToCheckout}>Checkout</button>
            </div>
        </div>
        
            }
            

            


        </>
    )
}
