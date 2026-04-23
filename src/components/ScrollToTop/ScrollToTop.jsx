import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import style from './ScrollToTop.module.css'
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // أول ما اللينك يتغير، اطلع فوق فوراً

    // return null;
}