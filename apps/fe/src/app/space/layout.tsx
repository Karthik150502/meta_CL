import React from 'react'
import { montserrat400 } from '../fonts/montserrat'
import { cn } from '@/lib/utils'
import WSProvider from '@/context/ws'
export default function SpaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={cn('min-h-screen relative overflow-hidden antialiased', montserrat400.className)}>
            <WSProvider>
                {children}
            </WSProvider>
        </main>
    )
}
