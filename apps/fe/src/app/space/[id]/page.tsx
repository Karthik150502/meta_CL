'use client'
import { Button } from '@/components/ui/button'
import { useWSSocket } from '@/context/ws'
import { Home } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect } from 'react'
import ArenaMain from '@/components/comp';
import { useRecoilValue } from 'recoil';
import { SpaceInfoAtom } from '@/recoil';
import { useRouter } from 'next/navigation';
import ChatInput from '@/components/chatInput';
type Props = {
    params: {
        id: string
    }
}

export default function SpaceRenderer({ params }: Props) {


    const spaceInfo = useRecoilValue(SpaceInfoAtom)
    const router = useRouter();

    const ws = useWSSocket();

    useEffect(() => {
        if (!spaceInfo.spaceId) {
            router.push(`/space/join/${params.id}`)
        }
    }, [params, spaceInfo.spaceId, router])









    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log("Removing user from the space..........");
            ws?.sendMessage(JSON.stringify({
                type: "leave-space"
            }))
        }
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [ws])






    return (
        <main className='min-h-screen overflow-hidden relative flex items-center justify-center'>
            <header className='fixed left-0 min-h-screen border-r border-r-black/15 w-[80px] flex items-center flex-col justify-between py-4 z-20'>
                <Link href={"/"} className='cursor-pointer'>
                    <Button size={"icon"} variant={"outline"}>
                        <Home />
                    </Button>
                </Link>
            </header>
            <div className='flex items-center justify-start w-full min-h-screen pl-[80px] relative'>
                <ArenaMain />
                <ChatInput />
            </div>
        </main>
    )
}
