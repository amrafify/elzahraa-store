import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()
export default function CartContextProvider(props) {
    const [countItems, setCountItems] = useState(0)
    const [cartId, setCartId] = useState(localStorage.getItem('cartId'))//
    let token = localStorage.getItem('userToken')
    function updataProduct(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, { count: count }, { headers: { token: localStorage.getItem('userToken') } }).then((res) => res).catch((err) => err)
    }
    function removeProduct() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v2/cart`, { headers: { token: localStorage.getItem('userToken') } }).then((res) => res).catch((err) => err)
    }
    function deletProduct(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, { headers: { token: localStorage.getItem('userToken') } }).then((res) => res).catch((err) => err)
    }
    function displayCart() {

        return axios.get('https://ecommerce.routemisr.com/api/v2/cart', { headers: { token: localStorage.getItem('userToken') } }).then((res) => res).catch((err) => err)
    }
    function addToCart(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers: { token: localStorage.getItem('userToken') } }).then((res) => res).catch((err) => err)
    }
    return <CartContext.Provider value={{ addToCart, displayCart, deletProduct, updataProduct, setCountItems, countItems, removeProduct, setCartId, cartId }}>
        {props.children}
    </CartContext.Provider>
}