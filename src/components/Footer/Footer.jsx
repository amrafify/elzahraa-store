import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'

export default function Footer() {
    return (
        <footer className=" bg-zinc-200 pt-16 pb-8 shadow-md">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* العمود الأول: براند الموقع */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-black text-gray-900">
                            <img src={logo} alt="Logo" />
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your one-stop shop for premium automotive spare parts and accessories.
                            Quality guaranteed for every journey.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#dc2626] hover:shadow-md transition-all">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#dc2626] hover:shadow-md transition-all">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#dc2626] hover:shadow-md transition-all">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    {/* العمود الثاني: روابط سريعة */}
                    <div>
                        <h3 className="text-gray-900 font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">Home</Link></li>
                            <li><Link to="/products" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">All Products</Link></li>
                            <li><Link to="/brands" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">Our Brands</Link></li>
                            <li><Link to="/categories" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">Categories</Link></li>
                        </ul>
                    </div>

                    {/* العمود الثالث: الدعم الفني */}
                    <div>
                        <h3 className="text-gray-900 font-bold mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">Shipping Details</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-[#dc2626] text-sm transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* العمود الرابع: النشرة البريدية */}
                    <div>
                        <h3 className="text-gray-900 font-bold mb-6">Get App & Newsletter</h3>
                        <p className="text-gray-500 text-sm mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email .."
                                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-green-500"
                            />
                            <button className="bg-[#dc2626] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#dc2626] transition-colors">
                                Share
                            </button>
                        </div>
                    </div>

                </div>

                <hr className="border-gray-200" />

                {/* الجزء السفلي: طرق الدفع وحقوق الملكية */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">Payment Partners</span>
                        <div className="flex gap-3 text-2xl text-gray-400">
                            <i className="fa-brands fa-cc-visa hover:text-blue-600 transition-colors"></i>
                            <i className="fa-brands fa-cc-mastercard hover:text-red-500 transition-colors"></i>
                            <i className="fa-brands fa-cc-paypal hover:text-blue-800 transition-colors"></i>
                            <i className="fa-brands fa-cc-apple-pay hover:text-black transition-colors"></i>
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm">
                        © 2026 <span className="text-[#dc2626] font-bold">EKZHARAA STORE</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}