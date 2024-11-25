'use client'
import { Html } from '@react-three/drei'
import React, { useMemo } from 'react'


type Props = {
    x: number,
    y: number,
    name: string
}


export default function UserPeer({ x, y, name }: Props) {


    const color = useMemo(() => { return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` }, []);


    return (
        <>
            <Html position={[x, y, 0]} zIndexRange={[5, 10]} className='h-[25px] w-[25px] rounded-full bg-white select-none border border-black' style={{
                backgroundColor: color
            }}>
            </Html>
            <Html position={[x - 1.5, y - 1.25, 0]} zIndexRange={[10, 20]} className='select-none'>
                <p className='select-none font-bold text-black text-center text-xs truncate w-[100px]'>{name}</p>
            </Html>
        </>
    )
}
