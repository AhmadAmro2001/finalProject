import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { data } from 'autoprefixer'

import Slider from 'react-slick';
export default function Categories() {
    let [categories, setCategories] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
    };

    useEffect(() => {
        getCategories()
    }, [])

    function getCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({ data }) => {
                setCategories(data.data)
                console.log(data.data);

            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className="mt-32">
            <div className={styles.sliderCss}>
                <Slider {...settings}>
                    {categories.map((category, index) => (<div key={index} className=''>
                        <img src={category.image} className='w-full px-1 h-[300px]' alt="" />
                        <h2>{category.name}</h2>
                    </div>)
                    )}
                </Slider>
            </div>
            </div>

        </>
    )
}
