import React, { useEffect, useState } from 'react'
import style from './Loading.module.css'
import { Atom } from 'react-loading-indicators'

export default function Loading() {

    return <>
        <div className="flex justify-center items-center h-screen">
            <Atom color="#dc2626" size="medium" text="جاري التحميل" textColor="" />
        </div>
    </>
}
