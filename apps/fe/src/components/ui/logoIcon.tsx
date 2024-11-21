import { cn } from '@/lib/utils'
import React from 'react'

export default function LogoIcon({ size = 30 }: { size: number }) {
    return (
        <p className={cn('text-black font-bold bg-clip-text text-transparent bg-gradient-to-tl from-purple-950 via-purple-900 to-purple-200', `text-[${size}px]`)}>
            MetaCL
        </p>
    )
}
