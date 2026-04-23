import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
export default function uesCategory() {
    function getData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const category = useQuery({
        queryKey: ['recentCategory'],
        queryFn: getData,
    })
    return category
}
