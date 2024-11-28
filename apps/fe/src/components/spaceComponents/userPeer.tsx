'use client'
import { cn } from '@/lib/utils'
import { Html } from '@react-three/drei'
import React, { useEffect, useMemo, useRef, useState } from 'react'


type Props = {
    x: number,
    y: number,
    name: string,
    message?: string
}


export default function UserPeer({ x, y, name, message }: Props) {


    const color = useMemo(() => { return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` }, []);

    const [msgVisible, setMsgVisible] = useState<boolean>(false);
    const timer = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setMsgVisible(true)
        timer.current = setTimeout(() => {
            setMsgVisible(false)
        }, 5000)

        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [message])


    return (
        <>
            {(msgVisible && message) && <Html position={[x - 0.75, y + 1.25, 0]} zIndexRange={[10, 20]} className={cn("transition-all duration-300select-none")}>
                <div className="bg-white max-w-[250px] max-h-[500px] px-3 py-1 rounded-lg shadow-lg text-sm whitespace-nowrap line-clamp-5 transition-all duration-300 opacity-60 hover:opacity-85 select-none">
                    {message}
                </div>
            </Html>}
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
