import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios';

export default function Brands() {
    let [isLoading, setIsLoading] = useState(false)
    let [brandsItems, setBrandsItem] = useState([])

    useEffect(() => {
        getBrands()
    }, [])

    function getBrands() {
        axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then(res => {
                setIsLoading(true)
                // console.log("brands", res.data);
                setBrandsItem(res.data.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div className='mt-32 mx-auto container'>
                <h1 className='text-green-600 text-2xl text-center text-bold'> All Brands</h1>
                {isLoading ? <div className="flex justify-center pt-36 w-full">
                    <i className='fa fa-spinner fa-spin mx-3  text-green-500 text-5xl'></i>
                </div> :<>
                    <div className="row">
                        {brandsItems.map(brand => <div key={brand._id} className="w-1/4  p-1 ">
                                <div className='border border-1 hover:border-green-600'>
                                <img src={brand?.image} className='' alt="" />
                                <p className='text-green-600 text-center'>{brand?.name}</p>
                                </div>
                            </div>)}                
                    </div>
                    </>
                }
                
            </div>
        </>
    )
}
