import React, { useEffect, useState } from 'react'
import style from './Signup.module.css'
import logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router'
import { useFormik } from 'formik'
import axios from 'axios'
import Loading from '../Loading/Loading'
import * as Yup from 'yup'

export default function Signup() {
    const [vPassword, setvPassword] = useState(false)
    const [vRePassword, setvRePassword] = useState(false)
    let navigate = useNavigate()
    let [error, setError] = useState('')
    let [code, setCode] = useState(false)
    async function handelSingUp(formValues) {
        setCode(true)
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
            console.log(data);
            // localStorage.setItem('userToken', data.token)
            navigate('/login')
        } catch (error) {
            // 1. بنخزن الرسالة الأساسية لو موجودة (زي أخطاء الإيميل 404)
            let errorMsg = error.response?.data?.message;

            // 2. بنشوف هل فيه مصفوفة أخطاء فرعية (زي أخطاء الباسورد)؟
            // الـ API ده غالباً بيبعتها في error.response.data.errors
            if (error.response?.data?.errors) {
                // لو موجودة، بناخد أول رسالة خطأ تقابلنا (مثلاً الخاصة بالباسورد)
                errorMsg = error.response.data.errors.msg;
            }

            // 3. نظهر الرسالة اللي استقرينا عليها في الآخر
            setError(errorMsg);
            setCode(false)
        }
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name must be at least 3 characters').max(10, 'Name must be at most 10 characters').required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number, must be an Egyptian phone number').required('Phone number is required'),
        password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters, include letters and numbers').required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required')
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema,
        onSubmit: handelSingUp,
    })

    return <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={logo} alt="Your Company" className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#dc2626]">Sign Up to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-[#dc2626]">Name</label>
                        <div className="mt-2">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="name" type="text" name="name" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.name ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>

                    {formik.errors.name && formik.touched.name ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.name}</div> : null}

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-[#dc2626]">Email address</label>
                        <div className="mt-2">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" name="email" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.email ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>
                    {formik.errors.email && formik.touched.email ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.email}</div> : null}
                    <div>
                        <label htmlFor="phone" className="block text-sm/6 font-medium text-[#dc2626]">Phone number</label>
                        <div className="mt-2">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="phone" type="tel" name="phone" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.phone ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>
                    {formik.errors.phone && formik.touched.phone ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.phone}</div> : null}

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-[#dc2626]">Password</label>
                        </div>
                        <div className="mt-2 relative">
                            <span className='absolute right-0  top-1/2 -translate-x-1/2 -translate-y-1/2' onClick={() => setvPassword(!vPassword)}>
                                {vPassword ? <i class="fa-solid fa-eye"></i> : <i class="fa-solid fa-eye-slash"></i>}
                            </span>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" type={vPassword ? 'text' : 'password'} name="password" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.password ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>
                    {formik.errors.password && formik.touched.password ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.password}</div> : null}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="rePassword" className="block text-sm/6 font-medium text-[#dc2626]">Confirm Password</label>
                        </div>
                        <div className="mt-2 relative">
                            <span className='absolute right-0  top-1/2 -translate-x-1/2 -translate-y-1/2' onClick={() => setvRePassword(!vRePassword)}>
                                {vRePassword ? <i class="fa-solid fa-eye"></i> : <i class="fa-solid fa-eye-slash"></i>}
                            </span>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword" type={vRePassword ? 'text' : 'password'} name="rePassword" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.rePassword ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className='bg-red-50 p-3 rounded-md text-red-500'>{formik.errors.rePassword}</div> : null}
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div>
                        <button disabled={code} type="submit" className={`${code ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}>{code ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Sign Up'}</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}
