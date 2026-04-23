import React, { useEffect, useState, useContext } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading';
import { Link } from 'react-router';
import BrandSlider from '../BrandSlider/BrandSlider';
import uesCategory from '../../Hooks/uesCategory';

export default function Categories() {

    const { data, isLoading, isError, error } = uesCategory()
    let categories = data?.data.data
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        console.log(error);

    }
    return <>
        <div className="bg-white py-10">
            <div className="container mx-auto px-4">

                <h2 className="text-2xl font-black text-gray-800 mb-8 border-l-4 border-[#dc2626b1] pl-4">
                    Popular Categories
                </h2>

                {/* الجريد: صفين في كل الحالات */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-4">
                    {categories?.map((cat) => (
                        <Link
                            to={`/category/${cat.slug}`}
                            key={cat._id}
                            className="group flex flex-col items-center"
                        >
                            {/* الحاوية الخارجية للصورة */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-50 flex items-center justify-center p-3 transition-all duration-300 group-hover:bg-red-50 group-hover:shadow-md border border-gray-100 group-hover:border-red-200 overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            {/* الاسم تحت الصورة */}
                            <span className="mt-4 text-sm font-bold text-gray-700 group-hover:text-[#dc2626] text-center transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>



    </>
}
