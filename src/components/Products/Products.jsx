import React, { useEffect, useState, useContext } from 'react'
import style from './Products.module.css'
import Loading from '../Loading/Loading'
import { Link, useNavigate, useParams } from 'react-router'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import uesProduct from '../../Hooks/uesProduct'
import { CartContext } from '../../Context/CartContext'
import toster, { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import NotFound from '../NotFound/NotFound'
export default function Products() {
    const { pageNum } = useParams()
    const navigate = useNavigate()
    const [products, setproducts] = useState([])
    const [pageNumber, setPageNumber] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { addToCart } = useContext(CartContext)
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
    async function getProducts(page) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=8&page=${page}`)
            setproducts(data?.data)
            setIsLoading(false)
            setPageNumber(data?.metadata.numberOfPages)
            console.log(data?.metadata);

        } catch (erro) {
            setIsLoading(false)
            console.error(erro);

        }
    }
    useEffect(() => {
        getProducts(pageNumber)
    }, [])
    if (pageNum < 1) {
        return <NotFound />
    }

    return <>
        <h2 className="text-2xl font-black text-gray-800 mb-8 border-l-4 border-[#dc2626] pl-4 container mx-auto">
            Popular Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto'>
            {products?.map((products) => {
                return (
                    <div key={`${products.id}`} className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                        {/* 1. جزء الصورة - ثابت الارتفاع ومحمي من التمدد */}
                        <div className="relative h-56 overflow-hidden bg-gray-100">
                            <Link to={`/product/${products.id}`} >
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={products.imageCover}
                                    alt={products.title}
                                />
                            </Link>
                            <Link to={`/brandproducts/${products.brand.name}`}>

                                <img className='absolute w-[50px] bottom-0 right-0 border border-black border-solid border-1' src={products.brand.image} alt="" />
                            </Link>
                            {/* Badge اختياري لو فيه خصم أو ماركة معينة */}
                            <span className="absolute top-2 left-2 bg-[#dc2626] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                New
                            </span>
                        </div>
                        {/* 2. محتوى الكارت - الجزء اللي بيتمط (flex-grow) */}
                        <div className="p-4 flex flex-col flex-grow">
                            <Link to={`/product/${products.id}`} >
                                <h4 className="text-gray-900 font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#dc2626] transition-colors">
                                    {products.title}
                                </h4>
                            </Link>
                            <h4 className="text-gray-500 font-bold  mb-2 line-clamp-1  transition-colors">
                                {products.brand.name}
                            </h4>

                            <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {products.description}
                            </p>

                            {/* السعر والتقييم - هينزلوا تحت دايماً بفضل الـ flex-grow */}
                            <div className="mt-auto border-t pt-3 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-gray-400 block">Price</span>
                                    <span className="text-3xl font-bold text-[#dc2626]">{products?.priceAfterDiscount ? products?.priceAfterDiscount : products?.price} EGP</span>
                                    {products?.priceAfterDiscount && (
                                        <span className="text-lg text-gray-400 line-through ml-4">{products?.price} EGP</span>
                                    )}
                                </div>

                                {/* أيقونة إضافة للسلة سريعة */}
                                <button onClick={() => addCart(products.id)} className="bg-gray-100 hover:bg-[#dc2626] hover:text-white p-2 rounded-lg transition-colors">
                                    <i className="fa-solid fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>

                        {/* 3. زرار الأكشن السفلي - اختياري */}
                        <Link to={`/product/${products.id}`} >
                            <button className="w-full py-3 bg-gray-900 text-white font-semibold text-sm hover:bg-[#dc2626] transition-colors cursor-pointer">
                                View Details
                            </button>
                        </Link>
                    </div>
                )
            })}
        </div>
        {
            pageNum >= 1 ? <div className='flex container mx-auto w-[50%] justify-between mt-6'>
                <button disabled={pageNum <= 1} className={'disabled:text-[#dc2626b1] text-[#dc2626] cursor-pointer disabled:cursor-not-allowed'} onClick={() => {
                    getProducts(pageNum - 1)
                    navigate(`/products/${pageNum - 1}`)
                }
                }>
                    <i class="fa-solid fa-circle-left"></i>
                </button>
                {[...Array(pageNumber)].map((_, i) => (
                    <span className={`cursor-pointer font-bold ${pageNum == i + 1 ? 'text-[#dc2626]' : null} `} onClick={
                        () => {
                            navigate(`/products/${i + 1}`)
                            getProducts(i + 1)
                        }


                    } key={i}>{i + 1}</span>
                ))}
                <button disabled={pageNum >= pageNumber} className={'disabled:text-[#dc2626b1] text-[#dc2626] cursor-pointer disabled:cursor-not-allowed'} onClick={() => {
                    getProducts(Number(pageNum) + 1)
                    navigate(`/products/${Number(pageNum) + 1}`)
                }
                }>
                    <i class="fa-solid fa-circle-right"></i>
                </button>
            </div> : null
        }

    </>
}
