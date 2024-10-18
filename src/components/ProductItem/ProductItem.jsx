import React, { useState } from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom'

export default function ProductItem({ product , addCart ,loading ,addToWishList}) {
    
    let [currentId , setCurrentId] = useState(null)

    return (
        <>
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-1 ">
                <div className="product  hover:rounded-md">
                    <Link to={`/productDetails/${product.id}/${product.category._id}`}>
                    <div className="productDetials">
                        <img src={product.imageCover} alt="" />
                        <div className="p-2">
                            <span className='text-green-500'>{product.category?.name}</span>
                            <h2 className='font-bold mb-3'>{product.title.split(" ").splice(0, 2).join(" ")}</h2>
                            <div className="flex justify-between">
                                <span>{product.price} EGP</span>
                                <span>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
                            </div>
                        </div>
                    </div>
                    </Link>
                    <i className="fa-solid fa-heart p-2 text-2xl cursor-pointer text-red-500" onClick={()=>addToWishList(product.id)}></i>
                    <div className="px-3 pb-1">
                        <button className='btn' onClick={()=>{addCart(product.id); setCurrentId(product.id);}}>
                            {loading && product.id == currentId ? <i className='fa fa-spinner fa-spin mx-3  text-white text-xl'></i> :<span>Add to cart</span>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
