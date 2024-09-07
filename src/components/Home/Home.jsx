import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import RecentProduct from '../RecentProduct/RecentProduct'
import Categories from '../Categories/Categories'
import MainSlider from '../MainSlider/MainSlider'


export default function Home() {
    


    return (
        <>
            <MainSlider/>

            <div className='py-7'>
                <h1 className='text-3xl text-green-600 py-4 ml-4 font-bold'>Shop popular categories</h1>
            <Categories />

            </div>
            <RecentProduct />
        </>
    )
}
