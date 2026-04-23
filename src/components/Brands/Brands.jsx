import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import uesBrand from '../../Hooks/uesBrand';
export default function AllBrands() {
    const { data, isError, isLoading, error } = uesBrand()
    let brands = data?.data.data
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        console.log(error);
    }
    return (
        <div className="bg-gray-50 min-h-screen py-20 px-4">
            <div className="container mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Our <span className="text-[#dc2626]">Brands</span>
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Find the best quality spare parts from top-tier global manufacturers.
                        Select a brand to explore its catalog.
                    </p>
                    <div className="w-24 h-1.5 bg-[#dc2626b1] mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {brands?.map((brand) => (
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

                            {/* Brand Name */}
                            <h3 className="text-lg font-bold text-gray-700 group-hover:text-[#dc2626] transition-colors">
                                {brand.name}
                            </h3>

                            {/* Badge (Optional) */}
                            <span className="mt-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold bg-gray-50 px-3 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#dc2626] transition-colors">
                                View Collection
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}