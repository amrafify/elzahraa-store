import React, { useEffect, useState } from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router'
export default function ProtectedRoute(prpos) {
    if (localStorage.getItem('userToken')) {
        return prpos.children
    } else {
        return <Navigate to='/login'></Navigate>
    }
}
