'use client'
// import { cn } from '@/lib/utils'

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Html } from '@react-three/drei'
import React from 'react'

export default function PlayerAvatar({ playerPosition, name }: { playerPosition: [number, number], name: string | undefined | null }) {





    return (
        <>

            {/* <Html position={[playerPosition[0] - 0.35, playerPosition[1] + 0.35, 0]} className={cn(msgVisible ? "block" : "hidden", "transition-all duration-300")}>
                <div className="bg-white max-w-[250px] max-h-[500px] px-3 py-1 rounded-lg shadow-lg text-sm whitespace-nowrap line-clamp-5 transition-all duration-300 opacity-60 hover:opacity-85">
                    {msg}
                </div>
            </Html> */}
            <Html position={[playerPosition[0], playerPosition[1], 0]} >
                <div className="relative">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg" />
                        {/* <AvatarFallback>{name ? name[0].toUpperCase() : "U"}</AvatarFallback> */}
                    </Avatar>
                </div>
            </Html>
            {/* Player Name */}
            <Html position={[playerPosition[0] - 0.33, playerPosition[1] - 0.35, 0]}>
                <p className='font-bold text-black text-center text-xs truncate w-[100px]'>{name}</p>
            </Html>

        </>

    )
}
