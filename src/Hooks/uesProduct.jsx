import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
export default function uesProduct() {

    function getProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=70`)
    }
    let productsList = useQuery({
        queryKey: ['recentProduct'],
        queryFn: getProduct,
        staleTime: 80000,
    })
    return productsList


}
