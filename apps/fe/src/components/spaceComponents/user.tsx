'use client'
import { cn } from '@/lib/utils'
import { Html } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'


type Props = {
    x: number,
    y: number,
    message?: string,
    name: string
}


export default function UserPlayer({ x, y, message, name }: Props) {


    const [msgVisible, setMsgVis] = useState<boolean>(false);
    const timer = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        setMsgVis(true)
        timer.current = setTimeout(() => {
            setMsgVis(false)
        }, 7000)

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        }
    }, [message])


    return (
        <>
            <Html position={[x - 0.75, y + 1.25, 0]} zIndexRange={[10, 20]} className={cn(msgVisible ? "block" : "hidden", "transition-all duration-300select-none")}>
                <div className="bg-white max-w-[250px] max-h-[500px] px-3 py-1 rounded-lg shadow-lg text-sm whitespace-nowrap line-clamp-5 transition-all duration-300 opacity-60 hover:opacity-85 select-none">
                    {message}
                </div>
            </Html>
            <Html position={[x, y, 0]} zIndexRange={[5, 10]} className='h-[25px] w-[25px] rounded-full bg-white select-none'>
            </Html>
            <Html position={[x - 1.5, y - 1.25, 0]} zIndexRange={[10, 20]} className='select-none'>
                <p className='select-none font-bold text-black text-center text-xs truncate w-[100px]'>{name}</p>
            </Html>
        </>
    )
}
