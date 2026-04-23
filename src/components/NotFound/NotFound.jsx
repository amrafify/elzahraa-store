import React, { useEffect, useState } from 'react'
import style from './NotFound.module.css'
import erro from '../../assets/error.svg'
export default function NotFound() {
    const [state, setState] = useState(null)

    useEffect(() => {
        // Effect logic here
    }, [])

    return <>
        <div className='text-center w-full h-screen flex  justify-center items-center'>

            <img className='mx-auto' src={erro} alt="NotFound" />
        </div>
    </>
}
