import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useLocation } from 'react-router'
export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        // السطر ده هيتنفذ مع كل تغيير في اللينك
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, [pathname]);
    return <>
        <Navbar />
        <main className='py-[80px]'>

            <Outlet />
        </main>
        <Footer />
    </>
}
