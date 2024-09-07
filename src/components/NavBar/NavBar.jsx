import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import { UserTokenContext } from '../../Context/UserTokenContext'
import { CartContext } from '../../Context/CartContext'
export default function NavBar() {
    let x = useContext(CounterContext)
    let { token, setToken } = useContext(UserTokenContext)
    let {cartItemNo} = useContext(CartContext)
    let navigate = useNavigate()
    console.log(token);


    function logOut() {
        setToken(null)
        localStorage.removeItem("token")
        navigate('/login')
    }
    return (
        <>


            <nav className="bg-slate-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse mr-6">
                        <img src={logo} className="h-8" alt="e-commerce Logo" />
                    </a>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse " >
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between   hidden w-full md:flex md:m-auto md:order-1" id="navbar-sticky">

                        <div>
                            {token ? <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <NavLink to='home' className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500" aria-current="page">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='cart' className="block py-2 px-3 text-gray-900 rounded   md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to='product' className="block py-2 px-3 text-gray-900 rounded   md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Product</NavLink>
                                </li>
                                <li>
                                    <NavLink to='categories' className="block py-2 px-3 text-gray-900 rounded   md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Category</NavLink>
                                </li>
                                <li>
                                    <NavLink to='brands' className="block py-2 px-3 text-gray-900 rounded   md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
                                </li>
                                <li>
                                    <NavLink to='wishList' className="block py-2 px-3 text-gray-900 rounded   md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">wish list</NavLink>
                                </li>
                            </ul> : null}

                        </div>
                        <div>
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                <span className='text-green-500 mx-2 text-bold'>{cartItemNo}</span>
                                <i className="fa-solid fa-cart-shopping text-green-500"></i>
                                
                                </li>
                                <li>
                                    <div className='flex gap-x-5 mt-1'>
                                        <i className="fa-brands fa-facebook" />
                                        <i className="fa-brands fa-youtube" />
                                        <i className="fa-brands fa-instagram" />
                                        <i className="fa-brands fa-tiktok" />
                                        <i className="fa-brands fa-linkedin" />
                                        <i className="fa-brands fa-twitter" />
                                    </div>

                                </li>
                                {token ? <li>
                                    <button className="block py-2 px-3 text-gray-900 rounded md:hover:text-green-700 " onClick={logOut}>Logout</button>
                                </li> : <>
                                    <li>
                                        <NavLink to='login' className="block py-2 px-3 text-gray-900 rounded   md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='register' className="block py-2 px-3 text-gray-900 rounded   md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</NavLink>
                                    </li>
                                </>}



                            </ul>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}
