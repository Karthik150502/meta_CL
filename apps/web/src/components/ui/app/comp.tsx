'use client'
import React, { useEffect } from 'react'
import { getTheCookie } from '@/app/actions/test'
export default function Comp() {

    useEffect(() => {
        getTheCookie();
    }, [])

    return (
        <div>
            Hello, this is the client component.
        </div>
    )
}
