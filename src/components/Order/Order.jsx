import React, { useContext, useEffect, useState } from 'react'
import styles from './Order.module.css'
import { CartContext } from '../../Context/CartContext'
import { UserTokenContext } from '../../Context/UserTokenContext'
import { Accordion } from "flowbite-react";
import CartItem from '../CartItem/CartItem';

export default function Order() {
    let [orders, setOrders] = useState([])

    let { getOrders } = useContext(CartContext)
    let { userId } = useContext(UserTokenContext)

    useEffect(() => {
        if (userId) getAllOrders()
    }, [userId])

    async function getAllOrders() {
        let res = await getOrders(userId)
        console.log(res);
        setOrders(res)

    }

    return (
        <>
            
            <Accordion className='mx-auto w-[50%] my-32' >
                {orders.map((order,index) => <Accordion.Panel key={index} >
                    <Accordion.Title className='py-3'>{order.paymentMethodType} {order.isDelivered ==false ?`not delivered` :'delivered'}</Accordion.Title>
                    <Accordion.Content >
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
                    {order?.cartItems.filter(ele =>ele.count !=0).map(ele => <CartItem ele={ele}  />)}
                    
                    
                </tbody>
            </table>
                    </Accordion.Content>
                </Accordion.Panel>) }
                
                
            </Accordion>
            
        </>
    )
}
