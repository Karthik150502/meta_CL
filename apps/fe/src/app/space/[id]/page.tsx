import Arena from '@/components/ui/app/arena'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


type Props = {
    params: {
        id: string
    }
}

export default function SpaceRenderer({ params }: Props) {
    return (
        <main className='min-h-screen overflow-hidden relative flex items-center justify-center'>
            <header className='fixed left-0 min-h-screen border-r border-r-black/15 w-[80px] flex items-center flex-col justify-between py-4'>
                <Link href={"/"}>
                    <Button size={"icon"} variant={"outline"}>
                        <Home />
                    </Button>
                </Link>
            </header>
            <div className='flex items-center justify-start w-full min-h-screen pl-[80px]'>
                <Arena />
                <div className="min-h-screen w-full">

                </div>
            </div>
        </main>
    )
}
