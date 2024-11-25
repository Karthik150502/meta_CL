'use client'
import { Button } from '@/components/ui/button'
import { } from '@/context/ws'
import { Home } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect } from 'react'
import ArenaMain from '@/components/comp';
import { useRecoilState } from 'recoil';
import { SpaceInfoAtom } from '@/recoil';
import { useRouter } from 'next/navigation';
type Props = {
    params: {
        id: string
    }
}

export default function SpaceRenderer({ params }: Props) {


    const [spaceInfo, setSpaceInfo] = useRecoilState(SpaceInfoAtom)
    const router = useRouter();

    useEffect(() => {
        if (!spaceInfo.spaceId) {
            router.push(`/space/join/${params.id}`)
        }

        return () => {
            setSpaceInfo({
                spaceId: '',
                message: '',
            })
        }
    }, [params.id, setSpaceInfo, spaceInfo.spaceId, router])






    return (
        <main className='min-h-screen overflow-hidden relative flex items-center justify-center'>
            <header className='fixed left-0 min-h-screen border-r border-r-black/15 w-[80px] flex items-center flex-col justify-between py-4'>
                <Link href={"/"}>
                    <Button size={"icon"} variant={"outline"}>
                        <Home />
                    </Button>
                </Link>
                {/* <Button size={"icon"} variant={"outline"} onClick={() => {}}>
                    <SendToBack />
                </Button> */}
            </header>
            <div className='flex items-center justify-start w-full min-h-screen pl-[80px]'>
                <ArenaMain />
            </div>
        </main>
    )
}
