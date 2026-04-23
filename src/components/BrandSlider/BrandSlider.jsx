import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import style from './BrandSlider.module.css'
import uesBrand from '../../Hooks/uesBrand';
export default function BrandSlider() {
    const { data, isError, isLoading, error } = uesBrand()
    let brands = data?.data.data
    if (isError) {
        console.log(error);
    }
    return (<>
        <div className="py-10 container mx-auto">
            <h2 className="text-2xl font-black text-gray-800 mb-8 border-l-4 border-[#dc2626b1] pl-4">
                Popular Brand
            </h2>
            <Swiper
                // 3. تفعيل الـ Modules اللي محتاجها
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}       // المسافة بين السلايدات
                slidesPerView={2}      // يعرض كام سلايد في الشاشة الصغيرة
                autoplay={{ delay: 2500, disableOnInteraction: false }} // يقلب لوحده

                // 4. الـ Breakpoints (عشان يكون Responsive)
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {brands?.map((brand) => (
                    <SwiperSlide key={brand._id}>
                        <Link
                            to={`/brandproducts/${brand.name}`}
                            key={brand._id}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center"
                        >
                            {/* Logo Container */}
                            <div className="w-full h-32 flex items-center justify-center mb-4 overflow-hidden">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </>
    )
}
