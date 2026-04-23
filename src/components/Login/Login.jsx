import React, { useEffect, useState } from 'react'
import style from './Login.module.css'
import logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useContext } from 'react'
import { UserContext } from '../../Context/UesrContext'
export default function Login() {
    const [vPassword, setvPassword] = useState(false)
    let navigate = useNavigate()
    let [code, setCode] = useState(false)
    let [error, setError] = useState('')
    let { setUesrLogin } = useContext(UserContext)
    async function handelSingIn(formValues) {
        setCode(true)
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
            console.log(data);
            localStorage.setItem('userToken', data.token)
            setUesrLogin(data.token)
            navigate('/')
        } catch (error) {
            console.error("الخطأ من السيرفر:", error.response?.data)
            setCode(false)
            setError(error.response?.data?.message || '): حدث خطأ غير متوقع')
        }
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters, include letters and numbers').required('Password is required')
    })
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handelSingIn,
    })
    return <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={logo} alt="Your Company" className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#dc2626]">Login to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-[#dc2626b1]">Email address</label>
                        <div className="mt-2">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" name="email" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.email ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-[#dc2626b1]">Password</label>
                            <div className="text-sm">
                                <Link to="/forgotpassword" className="font-semibold text-[#dc2626b1] hover:text-indigo-300">Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2 relative">
                            <span className='absolute right-0 text-gray-700 top-1/2 -translate-x-1/2 -translate-y-1/2' onClick={() => setvPassword(!vPassword)}>
                                {vPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                            </span>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" type={vPassword ? 'text' : 'password'} name="password" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.password ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>
                    {error ? <div className="text-red-500 text-sm">{error} </div> : null}
                    <div>
                        <button disabled={code} type="submit" className={`${code ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#dc2626b1] hover:bg-[#dc2626] text-white'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}>{code ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Log in'}</button>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-[#dc2626b1] hover:text-[#dc2626]">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </>
}
