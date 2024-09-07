import axios from "axios";

import { createContext, useState } from "react";

const headers = {
    token: window.localStorage.getItem("token")
}


export let CartContext = createContext();

function addProductToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
            headers
        }
    ).then(res => res.data)
        .catch(err => err.response.data)
}
function getCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        
        {
            headers
        }
    ).then(res => res.data)
        .catch(err => err.response.data)
}
function removeProduct(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
    .then(res => res.data)
    .catch(err => err.response.data)
}
function updateProductCount(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers})
    .then(res => res.data)
    .catch(err => err.response.data)
}
function cashOut(url,shippingAddress){
    // console.log(cartId,shippingAddress,"bl7");
    
    return axios.post(url,{shippingAddress},{headers})
    .then(res => res.data)
    .catch(err => err.response.data)
}
function getOrders(userId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then(res => res.data)
    .catch(err => err.response.data)
}


export default function CartContextProvider(props) {
    
    let [cartId,setCartId] = useState(null)
    let [cartItemNo,setCartItemNo] =useState(null)

    return <CartContext.Provider value={{ cartItemNo,setCartItemNo,cartId ,setCartId,getOrders ,addProductToCart, getCart,removeProduct,updateProductCount,cashOut}}>
        {props.children}

    </CartContext.Provider>
}