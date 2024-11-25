'use client'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Html } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'


type Props = {
    position: [number, number],
    name: string | undefined | null,
    message?: string
}


export default function PeerPlayer({ position, name, message }: Props) {



    const [msgVisible, setMsgVisible] = useState<boolean>(false);
    const messageTimer = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (message) {
            setMsgVisible(true);
            if (messageTimer.current) {
                clearTimeout(messageTimer.current)
            }
            messageTimer.current = setTimeout(() => {
                setMsgVisible(false);
            }, 7000);
        }
        return () => {
            if (messageTimer.current) {
                clearTimeout(messageTimer.current);
            }
        };
    }, [message])





    return (
        <>

            <Html position={[position[0] + 0.25, position[1] + 0.35, 0]} className={cn(msgVisible ? "block" : "hidden", "transition-all duration-300")}>
                <div className="bg-white max-w-[250px] max-h-[500px] px-3 py-1 rounded-tr-lg rounded-tl-lg rounded-br-lg shadow-lg text-sm whitespace-nowrap line-clamp-5 transition-all duration-300 opacity-60 hover:opacity-85">
                    {message}
                </div>
            </Html>
            <Html position={[position[0], position[1], 0]} >
                <div className="relative">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{name ? name[0].toUpperCase() : "U"}</AvatarFallback>
                    </Avatar>
                </div>
            </Html>
            {/* Player Name */}
            <Html position={[position[0] - 0.33, position[1] - 0.35, 0]}>
                <p className='font-bold text-black text-center text-xs truncate w-[100px]'>{name}</p>
            </Html>

        </>

    )
}
