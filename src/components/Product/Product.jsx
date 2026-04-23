import React, { useContext, useEffect, useState } from 'react'
import style from './Product.module.css'
import { Link, NavLink, useParams } from 'react-router'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
import toster, { toast, Toaster } from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PreviousPage from '../PreviousPage/PreviousPage'
export default function Product() {
    const { addToCart, setCountItems } = useContext(CartContext)
    const { id } = useParams()
    const [imgSrc, setImgSrc] = useState(null)

    const addCart = (id) => {
        // 1. بنعمل Promise جديد بيفحص الداتا اللي جوه الـ Response
        const addToCartPromise = addToCart(id).then((res) => {
            // ريأكت هوت توست بيعتبر أي return "نجاح"
            // وأي throw "فشل"

            localStorage.setItem('uesrId', res.data.data.cartOwner)
            if (res.data.status !== "success") {
                // لو السيرفر بعت "fail" هنرمي أيرور عشان التوست يقلب أحمر
                throw new Error(res.data.statusMsg || "Failed to add product");
                // QueryClient.invalidateQueries({ queryKey: ['recntCart'] });
            }

            // لو كله تمام، بنرجع الـ response عشان التوست يقلب أخضر
            return res;
        });

        // 2. بنمرر الـ Promise المعدل ده للـ toast
        toast.promise(addToCartPromise, {
            loading: 'Adding to cart...',
            success: (res) => <b>{res.data.message} 🛒</b>, // ممكن تاخد الرسالة من الـ API نفسه
            error: (err) => <b>حدث خطأ غير متوقع ❌</b>,      // هنا هياخد الرسالة اللي إنت رميتها فوق
        });
    };
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            // السطر ده هيخلي الـ Navbar "تحس" وتعمل Refetch للرقم فوراً
            queryClient.invalidateQueries({ queryKey: ['recntCart'] });
        },

    });
    function getData(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: () => getData(id),
        refetchOnReconnect: true
    })
    let product = data?.data.data
    useEffect(() => {
        if (!imgSrc) {

            setImgSrc(product?.imageCover);
        }

    }, [data, imgSrc])
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        console.log("رسالة السيرفر:", error.response?.data?.message);
    }
    return <>
        <div className="container mx-auto px-4 py-10 ">
            <PreviousPage />
            <div className="flex flex-wrap lg:flex-nowrap bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">

                {/* الجزء الأيسر: معرض الصور */}
                <div className="w-full lg:w-1/2 bg-gray-50 p-8">
                    {/* الصورة الكبيرة */}
                    <div className="flex items-center justify-center mb-6 bg-white rounded-xl p-4 shadow-sm">
                        <img
                            src={imgSrc}
                            alt={product?.title}
                            className="max-h-[400px] object-contain"
                        />
                    </div>

                    {/* معرض الصور المصغرة (لو الـ API باعت صور إضافية) */}
                    <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
                        {product?.images?.map((images, index) => (
                            <div key={index} className="w-20 h-20 border-2 border-gray-200 rounded-md overflow-hidden hover:border-[#dc2626b1] cursor-pointer bg-white flex-shrink-0">
                                <img onClick={() => setImgSrc(images)} src={images} className="w-full h-full object-cover" alt={`view-${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* الجزء الأيمن: تفاصيل المنتج */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
                    <nav className="text-sm text-gray-500 mb-4">
                        <Link className='hover:text-[#dc2626] hover:font-bold' to="/">Home</Link> / <Link className='hover:text-[#dc2626] hover:font-bold' to="/product">Products</Link> / <Link to={`/category/${product?.category?.slug}`} className="text-[#dc2626] font-bold">{product?.category?.name}</Link >
                    </nav>

                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product?.title}</h1>

                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400 text-sm">
                            {[1, 2, 3, 4, 5].map((num) => {
                                if (num <= product?.ratingsAverage) {
                                    return <i key={num} className="fa-solid fa-star"></i>;
                                } else if (num - 0.5 <= product?.ratingsAverage) {
                                    return <i key={num} className="fa-solid fa-star-half-stroke"></i>;
                                } else {
                                    return <i key={num} className="fa-regular fa-star"></i>;
                                }
                            })}
                        </div>
                        <span className="text-gray-400 text-sm ml-2">({product?.ratingsAverage})</span>
                        {product?.ratingsQuantity > 0 && (
                            <span className="text-gray-400 text-sm ml-4">{product?.ratingsQuantity} reviews</span>
                        )}
                    </div>
                    <div className='flex justify-between items-center'>
                        <h3 className="text-xl font-bold text-gray-800 ">{product?.brand?.name}</h3>
                        <img className='w-[100px]' src={product?.brand?.image} alt={product?.brand?.name} />
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 border-b pb-8">
                        {product?.description}
                    </p>

                    <div className="mb-8">
                        <span className="text-3xl font-bold text-[#dc2626]">{product?.priceAfterDiscount ? product?.priceAfterDiscount : product?.price} EGP</span>
                        {product?.priceAfterDiscount && (
                            <span className="text-lg text-gray-400 line-through ml-4">{product?.price} EGP</span>
                        )}
                    </div>

                    {/* زراير التحكم */}
                    <div className="flex gap-4 mt-auto">
                        <button onClick={() => addCart(product?.id)} className="flex-1 bg-[#dc2626b1] hover:bg-[#dc2626] text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                            <i className="fa-solid fa-cart-shopping"></i>
                            Add to Cart
                        </button>

                        <button className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all text-gray-400">
                            <i className="fa-regular fa-heart text-xl"></i>
                        </button>
                    </div>

                    {/* معلومات إضافية سريعة */}
                    <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-8">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <i className="fa-solid fa-truck-fast text-[#dc2626b1]"></i>
                            <span>Fast Delivery</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <i className="fa-solid fa-shield-halved text-[#dc2626b1]"></i>
                            <span>1 Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
