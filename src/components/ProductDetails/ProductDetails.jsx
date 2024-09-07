import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';

import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
    };

    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id, categoryId } = useParams();
    let { cartItemNo, setCartItemNo } = useContext(CartContext)

    let { addProductToCart } = useContext(CartContext)
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
                setProductDetails(data.data);
                fetchRelatedProducts(data.data.category._id);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchRelatedProducts = async (categoryId) => {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
                const filteredProducts = data.data.filter(
                    (product) => product.category._id === categoryId && product.id !== id
                );
                setRelatedProducts(filteredProducts);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center pt-8 w-full">
                <i className='fa fa-spinner fa-spin mx-3 text-green-500 text-5xl'></i>
            </div>
        );
    }

    if (!productDetails) {
        return <div>Product not found</div>;
    }

    async function addToCartItem(id) {
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
    }

    return (
        <>
            {/* <div className="row mt-28">
                <div className="flex justify-center  mx-auto  items-center gap-10">
                    <div className='w-1/4'>
                        <Slider {...settings}>
                            {productDetails.images.map((src, index) => (
                                <div key={index}>
                                    <img src={src}  className='w-full' alt={`Slide ${index}`} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="productDetailsCss w-3/4">
                        <h2 className='text-4xl font-light mb-3 max-w-lg'>{productDetails.title}</h2>
                        <p className='mb-5 text-gray-400 max-w-lg'>{productDetails.description}</p>
                        <span>{productDetails.category.name}</span>
                        <div className='flex justify-between mt-3'>
                            <span>{productDetails.price} EGP</span>
                            <span>{productDetails.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
                        </div>
                        <button className='btn hover:bg-green-400' onClick={()=>addToCartItem(productDetails.id)}>+ Add to cart</button>
                    </div>
                </div>
            </div> */}
            <div className='row'>
                <div className='w-1/4 p-10'>
                    <Slider {...settings}>
                        {productDetails.images.map((src, index) => (
                            <div key={index}>
                                <img src={src} className='w-full' alt={`Slide ${index}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="w-3/4 p-10">
                    <h2 className='text-4xl font-light mb-3 max-w-lg'>{productDetails.title}</h2>
                    <p className='mb-5 text-gray-400 max-w-lg'>{productDetails.description}</p>
                    <span>{productDetails.category.name}</span>
                    <div className='flex justify-between mt-3'>
                        <span>{productDetails.price} EGP</span>
                        <span>{productDetails.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
                    </div>
                    <button className='btn hover:bg-green-400' onClick={() => addToCartItem(productDetails.id)}>+ Add to cart</button>
                </div>
            </div>
            <h2 className='text-green-600 text-2xl my-5 ml-8'>Related items</h2>
            <div className="row">
                {relatedProducts.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}

