import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import Products from '../Products/Products'
import { Atom } from 'react-loading-indicators'
import Loading from '../Loading/Loading'
import Categories from '../Categories/Categories';
import BrandSlider from '../BrandSlider/BrandSlider'

export default function Home() {
    return <>
        <Categories />
        <BrandSlider />
        <Products />
    </>
}
