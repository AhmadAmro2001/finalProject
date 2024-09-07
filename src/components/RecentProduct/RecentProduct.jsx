import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProduct.module.css'
import axios from 'axios'
import ProductItem from '../ProductItem/ProductItem'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'

export default function RecentProduct() {
    let [loading, setLoading] = useState(false)
    let [products, setProducts] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    let { addProductToCart, cartItemNo, setCartItemNo } = useContext(CartContext)
    const {
        addProductToWishList,
        getWishListProducts,
        removeProductFromWishList,
    } = useContext(WishListContext);
    useEffect(() => {
        getProduct()

    }, [])
    const addToWishList = async (productId) => {
        // setCurrentId(productId);
        const data = await addProductToWishList(productId);
        console.log("WishList", data);
        // if (data?.data?.status == "success") {
        //   toast.success(data.data.message, {
        //     icon: <i className="fa-solid fa-heart text-gray-700 text-lg me-2"></i>,
        //   });
        // } else {
        //   toast.error(data.response.data.message);
        // }
      };

    function getProduct() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then(res => {
                console.log(res.data);
                setProducts(res.data.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }
    async function addToCartItem(id) {
        setLoading(true)
        let cartItem = await addProductToCart(id)
        console.log(cartItem);

        if (cartItem.status == "success") {
            let newCartItem = cartItemNo + 1;
            setCartItemNo(newCartItem)
            toast.success(cartItem.message, {
                position: "bottom-right"
            });
        } else {
            toast.error(cartItem.message, {
                position: "bottom-right"
            });
        }
        setLoading(false)
    }
    return (
        <>
            {isLoading ? <div className="flex justify-center pt-36 w-full">
                <i className='fa fa-spinner fa-spin mx-3  text-green-500 text-5xl'></i>
            </div> :
                <div className="row">
                    {products.map(product => <ProductItem key={product.id} loading={loading} addToWishList={addToWishList} addCart={addToCartItem} product={product} />)}
                </div>
            }

        </>
    )
}
