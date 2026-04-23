import React, { useEffect, useState } from 'react'
import style from './PreviousPage.module.css'
import { Link, NavLink, useNavigate, useParams } from 'react-router'
export default function PreviousPage() {
    const navigate = useNavigate();


    return <>
        <button
            onClick={() => navigate(-1)}
            className="hover:text-[#dc2626] transition-colors flex items-center gap-2 mb-4 cursor-pointer"
        >
            <i className="fa-solid fa-chevron-left text-sm"></i>
            <span>Return to previous page</span>
        </button>
    </>
}
