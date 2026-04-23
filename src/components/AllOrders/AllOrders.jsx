import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AllOrders() {
    let [orders, setOrders] = useState([])
    const [vDetails, setVDetails] = useState(false)
    async function getAllOrders(uesrId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('uesrId')}`)
            setOrders(data)
            // console.log(data);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getAllOrders()
    }, [])
    function toggleOrderDetails(orderId) {
        // لو اللي ضغطت عليه هو نفسه اللي مفتوح، قفله (خليه null)
        // لو مختلف، افتح الجديد
        setVDetails(vDetails === orderId ? null : orderId);
    }
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    console.log(orders, 'order');

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">

                {/* العنوان */}
                <h2 className="text-3xl font-black text-gray-800 mb-8 border-l-8 border-[#dc2626b1] pl-4">
                    My Orders <span className="text-gray-400 text-lg font-medium">({orders?.length})</span>
                </h2>

                <div className="space-y-6">
                    {orders?.map((order) => (
                        <div key={order?._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

                            {/* رأس الكارت (Order Header) */}
                            <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-[#dc2626]">
                                        <i className="fa-solid fa-box-open text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Order ID: {order?.id}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* طريقة الدفع */}
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Payment</p>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <i className={order?.paymentMethodType === "card" ? 'fa-solid fa-credit-card text-blue-500' : 'fa-solid fa-money-bill-wave text-[#dc2626b1]'}></i>
                                            <span className="font-semibold">{order?.paymentMethodType}</span>
                                        </div>
                                    </div>

                                    {/* الحالة */}
                                    <div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${order?.isDelivered === true ? 'bg-red-100 text-[#dc2626]' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order?.isDelivered === true ? 'Delivered' : 'Processing'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* محتوى الكارت (Order Details) */}

                            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                                <div className="flex -space-x-4 overflow-hidden w-[25%]">
                                    {/* هنا بنعرض صور مصغرة للمنتجات اللي جوه الطلب */}
                                    {order?.cartItems?.map((item) => (
                                        <img key={item._id} className="inline-block h-16 w-16 rounded-lg ring-4 ring-white object-cover border" src={item?.product?.imageCover} alt="product" />
                                    ))}
                                </div>

                                <div className="text-right w-[25%]">
                                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                    <p className="text-2xl font-black text-[#dc2626]">{order?.totalOrderPrice} EGP</p>
                                </div>

                                <div className="flex gap-2 w-[25%] justify-end">
                                    <button
                                        onClick={() => toggleOrderDetails(order.id)}
                                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${vDetails === order.id
                                            ? 'bg-red-50 text-red-600' // شكل الزرار وهو مفتوح
                                            : 'bg-gray-900 text-white hover:bg-gray-800' // شكل الزرار وهو مقفول
                                            }`}
                                    >
                                        {vDetails === order.id ? 'Close Details' : 'View Details'}
                                    </button>
                                </div>
                            </div>
                            {vDetails === order.id ? <div className="mt-4 bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-white">
                                    <h4 className="text-sm font-bold text-gray-700">Order Items</h4>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {order?.cartItems.map((item) => (
                                        <div key={item?._id} className="p-4 flex items-center justify-between hover:bg-white transition-colors">
                                            <div className="flex items-center gap-4">
                                                {/* صورة المنتج */}
                                                <div className="relative">
                                                    <img
                                                        src={item?.product.imageCover}
                                                        alt={item?.product.title}
                                                        className="w-16 h-16 rounded-lg object-cover border bg-white"
                                                    />
                                                    <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                        x{item?.count}
                                                    </span>
                                                </div>

                                                {/* بيانات المنتج */}
                                                <div>
                                                    <h5 className="text-sm font-bold text-gray-800 line-clamp-1">{item.product.title}</h5>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        <span className="font-semibold text-[#dc2626]">{item?.price} EGP</span> / per unit
                                                    </p>
                                                </div>
                                            </div>

                                            {/* السعر الإجمالي للقطعة (الكمية × السعر) */}
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Subtotal</p>
                                                <p className="text-sm font-black text-gray-900">
                                                    {item?.price * item.count} <span className="text-[10px]">EGP</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* ملخص الحساب الصغير في نهاية التفاصيل */}
                                <div className="p-4 bg-white flex justify-between items-center border-t border-gray-100">
                                    <div className="text-xs text-gray-400">
                                        Items: <span className="text-gray-700 font-bold">{order.cartItems.length}</span> |
                                        Shipping: <span className="text-gray-700 font-bold font-mono">{order.shippingPrice === 0 ? 'FREE' : order.shippingPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase">Total:</span>
                                        <span className="text-lg font-black text-[#dc2626]">{order.totalOrderPrice} EGP</span>
                                    </div>
                                </div>
                            </div> : null
                            }
                        </div>

                    ))}
                    {/* كارت تفاصيل الطلب - يُكرر لكل طلب */}

                </div>

                {/* لو مفيش طلبات */}
                {orders.length === 0 && (
                    <div className="text-center py-20">
                        <i className="fa-solid fa-cart-shopping text-6xl text-gray-200 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-800">No orders yet</h3>
                        <p className="text-gray-500 mt-2">Start shopping to see your orders here!</p>
                    </div>
                )}

            </div>
        </div>
    );
}