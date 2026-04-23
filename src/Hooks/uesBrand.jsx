import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
export default function uesBrand() {
    function getData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }
    const brands = useQuery({
        queryKey: ['recentBrand'],
        queryFn: getData,
    })
    return brands
}
