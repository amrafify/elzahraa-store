import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { data, Link, useNavigate } from 'react-router'
import { useFormik } from 'formik'
import axios from 'axios'
import Loading from '../Loading/Loading'
import * as Yup from 'yup'
import style from './CheckOut.module.css'
export default function CheckOut() {
    let navigate = useNavigate()
    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)
    let [erro, setErro] = useState(false)
    let [visa, setVisa] = useState(false)
    let [cash, setCash] = useState(false)
    let [message, setMessage] = useState('')
    let [urlVisa, setUrlVisa] = useState('')

    let [code, setCode] = useState(false)
    async function handelChashOrder(formValues) {
        setCode(true)
        try {
            const cartId = localStorage.getItem('cartId')
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, formValues, { headers: { token: localStorage.getItem('userToken') } })
            console.log(data);
            setMessage(data)
            setSuccess(true)
            setCode(false)
            setTimeout(() => {
                navigate('/allorders');
            }, 2000);
            // navigate('/login')
        } catch (error) {
            setErro(error.response?.data.message)
            setCode(false)
        }
    }
    async function handelVisaOrder(formValues) {
        setCode(true)
        try {
            const cartId = localStorage.getItem('cartId')
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://amraffiy.github.io/elzahraa-store/#`, formValues, { headers: { token: localStorage.getItem('userToken') } })
            console.log(data);
            setMessage(data)
            if (data.status === "success") {
                // التحويل لصفحة "Stripe" أو "Accept" للدفع
                window.location.href = data.session.url;
            }
            console.log(urlVisa);

            setSuccess(true)
            setCode(false)
        } catch (error) {
            setErro(error.response?.data.message)
            setCode(false)
        }
    }
    const validationSchema = Yup.object().shape({
        shippingAddress: Yup.object().shape({
            phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number, must be an Egyptian phone number').required('Phone number is required'),
            details: Yup.string().required('details is required'),
            city: Yup.string().required('city is required'),
            postalCode: Yup.string().matches(/^\d{5}$/, "ZIP code must be exactly 5 digits")
                .required("ZIP code is required")
        })
    })
    let formik = useFormik({
        initialValues: {
            shippingAddress: {
                phone: '',
                details: '',
                city: '',
                postalCode: ''
            }
        },
        validationSchema,
        onSubmit: handelChashOrder,
    })
    let formikVisa = useFormik({
        initialValues: {
            shippingAddress: {
                phone: '',
                details: '',
                city: '',
                postalCode: ''
            }
        },
        validationSchema,
        onSubmit: handelVisaOrder,
    })


    return <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={logo} alt="Your Company" className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#dc2626]">Check Out</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={cash ? formik.handleSubmit : formikVisa.handleSubmit} className="space-y-6">
                    <div className="flex gap-4 mt-4">
                        {/* خيار الكاش */}
                        <label className="flex items-center gap-2 border p-3 rounded-md cursor-pointer hover:border-[#dc2626b1] transition-colors" onClick={() => { setVisa(false); setCash(true) }}>
                            <input type="radio" name="payment" value="cash" className="accent-[#dc2626]" />
                            <i className="fa-solid fa-money-bill-wave text-[#dc2626]"></i>
                            <span>Cash on Delivery</span>
                        </label>

                        {/* خيار الفيزا */}
                        <label className="flex items-center gap-2 border p-3 rounded-md cursor-pointer hover:border-[#dc2626b1] transition-colors">
                            <input type="radio" name="payment" value="card" className="accent-[#dc2626]" onClick={() => { setVisa(true); setCash(false); }} />
                            <i className="fa-solid fa-credit-card text-blue-600"></i>
                            <span>Online Payment</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-[#dc2626b1]">Your Address</label>
                        <div className="mt-2">
                            <input onBlur={cash ? formik.handleBlur : formikVisa.handleBlur} onChange={cash ? formik.handleChange : formikVisa.handleChange} value={cash ? formik.values.shippingAddress.details : formikVisa.values.shippingAddress.details} id="details" type="text" name="shippingAddress.details" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.details ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'} sm:text-sm/6 ${formikVisa.errors.details ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'} sm:text-sm/6`} />
                        </div>
                    </div>

                    {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.shippingAddress?.details}</div> : null}
                    {formikVisa.errors.shippingAddress?.details && formikVisa.touched.shippingAddress?.details ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formikVisa.errors.shippingAddress?.details}</div> : null}

                    <div>
                        <label htmlFor="city" className="block text-sm/6 font-medium text-[#dc2626b1]">your city</label>
                        <div className="mt-2">
                            <input onBlur={cash ? formik.handleBlur : formikVisa.handleBlur} onChange={cash ? formik.handleChange : formikVisa.handleChange} value={cash ? formik.values.shippingAddress.city : formikVisa.values.shippingAddress.city} id="city" type="text" name="shippingAddress.city" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.shippingAddress?.city ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'} sm:text-sm/6 ${formikVisa.errors.shippingAddress?.city ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'} sm:text-sm/6`} />
                        </div>
                    </div>
                    {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.shippingAddress?.city}</div> : null}
                    {formikVisa.errors.shippingAddress?.city && formikVisa.touched.shippingAddress?.city ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formikVisa.errors.shippingAddress?.city}</div> : null}
                    <div>
                        <label htmlFor="phone" className="block text-sm/6 font-medium text-[#dc2626b1]">Phone number</label>
                        <div className="mt-2">
                            <input onBlur={cash ? formik.handleBlur : formikVisa.handleBlur} onChange={cash ? formik.handleChange : formikVisa.handleChange} value={cash ? formik.values.shippingAddress.phone : formikVisa.values.shippingAddress.phone} id="phone" type="tel" name="shippingAddress.phone" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.shippingAddress?.phone ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'} sm:text-sm/6 ${formikVisa.errors.shippingAddress?.phone ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'}`} />
                        </div>
                    </div>
                    {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.shippingAddress?.phone}</div> : null}
                    {formikVisa.errors.shippingAddress?.phone && formikVisa.touched.shippingAddress?.phone ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formikVisa.errors.shippingAddress?.phone}</div> : null}

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-[#dc2626b1]">PostalCode</label>
                        </div>
                        <div className="mt-2 relative">
                            <input onBlur={cash ? formik.handleBlur : formikVisa.handleBlur} onChange={cash ? formik.handleChange : formikVisa.handleChange} value={cash ? formik.values.shippingAddress.postalCode : formikVisa.values.shippingAddress.postalCode} id="postalCode" type='text' name="shippingAddress.postalCode" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.shippingAddress?.postalCode ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'} sm:text-sm/6 ${formik.errors.shippingAddress?.postalCode ? 'focus:outline-red-500' : 'focus:outline-[#dc2626b1]'}`} />
                        </div>
                    </div>
                    {formik.errors.postalCode && formik.touched.shippingAddress?.postalCode ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.postalCode}</div> : null}
                    {formikVisa.errors.postalCode && formikVisa.touched.shippingAddress?.postalCode ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formikVisa.errors.postalCode}</div> : null}

                    {cash ? <button disabled={code} type={`submit`} className={`${code ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#dc2626b1] hover:bg-[#dc2626] text-white'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}>{code ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Check Out Cash Payment'}</button> : null}
                    {visa ? <button disabled={code} type={`submit`} className={` ${code ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#dc2626b1] hover:bg-[#dc2626] text-white'}  flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}>{code ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Check Out Visa Payment'}</button> : null}

                    {!erro && success ? <div className='bg-green-50 p-3 rounded-md text-[#dc2626b1]'>{message?.message}</div> : null}
                    {erro ? <div className='bg-red-50 p-3 rounded-md text-red-500 whitespace-nowrap overflow-hidden'>{erro}</div> : null}
                </form>
            </div>
        </div>
    </>
}
