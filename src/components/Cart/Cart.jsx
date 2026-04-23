import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'
import { number } from 'yup'
import { useNavigate } from 'react-router'
import PreviousPage from '../PreviousPage/PreviousPage'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'


export default function Cart() {
    const navigate = useNavigate()
    // const [cartList, setCartList] = useState([])
    let { displayCart, deletProduct, updataProduct, setCountItems, countItems, removeProduct, setCartId, cartId } = useContext(CartContext)
    let { data, isError, isLoading, error } = useQuery({
        queryKey: ['recntCart'],
        queryFn: displayCart,
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    })
    setCountItems(data?.data.data.products?.length)
    setCartId(localStorage.setItem('cartId', data?.data.cartId))
    console.log(localStorage.getItem('cartId', data?.data.cartId), "id");
    if (data) {

        console.log(data?.data.data);
    }
    let cartList = data?.data.data
    const queryClient = useQueryClient();
    const { mutate: deleteItem, isPending, variables } = useMutation({
        mutationFn: (id) => deletProduct(id), // دي الفانكشن اللي بتكلم الـ API
        onSuccess: () => {
            // 2. تحديث السلة تلقائياً بعد المسح (الزتونة)
            queryClient.invalidateQueries({ queryKey: ['recntCart'] });
            toast.success("Product removed!");
        },
        onError: (err) => {
            // هنا بنمسك الأيرور بتاع المونجو
            console.error("Database Error:", err);
            toast.error("عذراً، حدث خطأ في الاتصال بالسيرفر. حاول مرة أخرى");
        }
    });
    // 3. في اللوج
    if (isPending) {
        console.log('جاري المسح الآن...');
    }

    const { mutate: rProduct, isPending: isRemove, variables: removed } = useMutation({
        mutationFn: async () => {
            const response = await removeProduct();
            return response;
        },// دي الفانكشن اللي بتكلم الـ API
        onSuccess: () => {
            // 2. تحديث السلة تلقائياً بعد المسح (الزتونة)
            console.log("Success Data:", data);
            toast.success("Products removed!");
            console.log('done');

            queryClient.invalidateQueries({ queryKey: ['recntCart'] });
        },
        onError: (err) => {
            // هنا بنمسك الأيرور بتاع المونجو
            console.error("Database Error:", err);
            toast.error("عذراً، حدث خطأ في الاتصال بالسيرفر. حاول مرة أخرى");
        }
    });
    const {
        mutate: updateQty,
        isPending: isUpdating,
        variables: updateId
    } = useMutation({
        mutationFn: ({ id, count }) => updataProduct(id, count),
        onMutate: () => { return toast.loading('جاري تحديث الكمية...'); },
        onSuccess: (data, variables, context) => {
            toast.success("Product Update!", { id: context });
            setCountItems(data?.data.data.products?.length)
            queryClient.invalidateQueries({ queryKey: ['updataCart'] })
        },
        onError: (err, variables, context) => {
            // بنشيل رسالة التحميل ونظهر فشل
            toast.error('فشل التحديث', { id: context });
        }
    });
    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        console.log(error);

    }



    console.log(countItems);


    return (<>


        <div className="container mx-auto  px-4">
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart 🛒</h1>
            </div>
            <PreviousPage />

            <div className="flex flex-wrap lg:flex-nowrap gap-8">
                {/* الجزء الأيسر: جدول المنتجات */}
                <div className="w-full lg:w-3/4">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-100">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Qty</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList?.products.map((item) => (
                                    <tr key={item?.product?._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-4 flex items-center gap-4">
                                            <img src={item?.product?.imageCover} className="w-16 md:w-24 rounded-lg" alt={item?.product?.title} />
                                            <div>
                                                <div className="font-semibold text-gray-900">{item?.product?.title.split(' ').slice(0, 3).join(' ')}</div>
                                                <div className="text-xs text-[#dc2626]">{item?.product?.category?.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => item?.count > 1 ? updateQty({ id: item?.product?._id, count: item?.count - 1 }) : deleteItem(item?.product._id)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
                                                <span className="font-medium text-gray-900">{item?.count}</span>
                                                <button onClick={() => updateQty({ id: item?.product?._id, count: item?.count + 1 })} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {item?.price} EGP
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => deleteItem(item?.product?._id)} className={`font-medium text-red-600  flex items-center gap-1 cursor-pointer `} disabled={isPending && variables === item?.product?._id ? true : false}>
                                                {isPending && variables === item?.product?._id ? <i className="fa-solid fa-spinner fa-spin mr-2 cursor-not-allowed"></i> : "Remove"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            {/* هنا الـ tfoot اللي سألت عليه */}
                            <tfoot className="bg-gray-50 font-bold text-gray-900">
                                <tr>
                                    <td colSpan="2" className="px-6 py-4 text-lg">Total Items: {cartList?.products?.length}</td>
                                    <td colSpan="2" className="px-6 py-4 text-right text-[#dc2626] text-xl">
                                        Total: {cartList?.totalCartPrice} EGP
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* الجزء الأيمن: ملخص الطلب Order Summary */}
                <div className="w-full lg:w-1/4">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <button onClick={() => removeProduct()} className='hover:text-[#dc2626] transition-colors flex items-center gap-2 mb-4 cursor-pointer '>
                            Remove all Products 🛒
                        </button>
                        <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">{cartList?.totalCartPrice} EGP</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-[#dc2626] font-semibold">100 EGP</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between mb-8">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold text-[#dc2626]">{cartList?.totalCartPrice + 100} EGP</span>
                        </div>
                        <button onClick={() => navigate('/cart/checkout')} className="w-full bg-[#dc2626b1] text-white py-4 rounded-xl font-bold hover:bg-[#dc2626] transition-all shadow-md">
                            Checkout Now
                        </button>
                    </div>
                </div>

            </div>
        </div>



    </>)
}
