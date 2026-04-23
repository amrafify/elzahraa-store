import React, { useEffect, useState } from 'react'
import style from './ProtectedRoutePassword.module.css'
import { Navigate } from 'react-router'
export default function ProtectedRoutePassword(prpos) {
    if (localStorage.getItem('userToken')) {
        return <Navigate to='/'></Navigate>
    } else {
        return prpos.children
    }
}
