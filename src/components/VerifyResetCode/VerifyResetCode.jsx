import React, { useEffect, useState } from 'react'
import style from './VerifyResetCode.module.css'
import logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
export default function VerifyResetCode() {
    let [code, setCode] = useState(false)
    let [error, setError] = useState('')
    let navigate = useNavigate()

    async function handelSingIn(formValues) {
        setCode(true)
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formValues)
            console.log(data);
            navigate('/resetpassword')
        } catch (error) {
            console.error("الخطأ من السيرفر:", error.response?.data)
            setCode(false)
            setError(error.response?.data?.message || 'حدث خطأ غير متوقع')
        }

    }
    const validationSchema = Yup.object().shape({
        resetCode: Yup.string().matches(/^[0-9]{3,6}$/).required('Reset code is required'),
    })
    let formik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validationSchema,
        onSubmit: handelSingIn,
    })

    return <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={logo} alt="Your Company" className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#dc2626]">Forget Password</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="resetCode" className="block text-sm/6 font-medium text-[#dc2626]">Reset Code</label>
                        <div className="mt-2">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} id="resetCode" type="text" name="resetCode" className={`block w-full rounded-md bg-zinc-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 ${formik.errors.resetCode ? 'focus:outline-red-500' : 'focus:outline-green-500'} sm:text-sm/6`} />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error} go to <Link to="/forgotpassword" className="text-[#dc2626] hover:text-green-600">forgot password</Link></div>}
                    <div>
                        <button disabled={code} type="submit" className={`${code ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#dc2626] hover:bg-green-600 text-white'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}>{code ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Verify Reset Code'}</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}
