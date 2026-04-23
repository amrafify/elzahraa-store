import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/logo.svg'
import { Link, NavLink, useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useContext } from 'react'
import { UserContext } from '../../Context/UesrContext'
import { CartContext } from '../../Context/CartContext'
import { useQuery } from '@tanstack/react-query'

export default function Navbar() {
    let { uesrLogin, setUesrLogin } = useContext(UserContext)
    let { setCountItems, countItems, displayCart } = useContext(CartContext)
    let navigate = useNavigate()
    const { data } = useQuery({
        queryKey: ['recntCart'],
        queryFn: displayCart,
        staleTime: 5000
    });
    const count = data?.data?.numOfCartItems || 0;
    function handelLogout() {
        navigate('/login')
        localStorage.removeItem('userToken')
        localStorage.removeItem('uesrId')
        localStorage.removeItem('cartId')
        setUesrLogin(null)
    }
    return <>
        <nav className=' fixed top-0 left-0 right-0 z-50 bg-zinc-100 shadow-md p-3'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex justify-between gap-4 items-center'>
                    <Link to={"/"}><img width={200} src={logo} alt="Logo" /></Link>
                    {uesrLogin ? <ul className='flex justify-between gap-9'>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/products/1">Products</NavLink></li>
                        <li><NavLink to="/categories">Categories</NavLink></li>
                        <li><NavLink to="/brands">Brands</NavLink></li>
                    </ul> : null}
                </div>
                <div className='flex justify-between gap-4'>
                    <ul className='flex justify-between gap-9'>
                        <li>{countItems}</li>
                        <li><NavLink to="/cart"><i className="fa-solid fa-cart-shopping text-lg"></i></NavLink></li>
                        {!uesrLogin ? <> <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/signup">Sign Up</NavLink></li> </> : <li><span className='cursor-pointer' onClick={handelLogout} >Logout</span></li>}
                    </ul>
                </div>
            </div>
        </nav >
    </>
}
