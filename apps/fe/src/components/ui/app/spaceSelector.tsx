'use client'
import React, { useRef, useState } from 'react'
import { GetSpacesType } from "@repo/common"
import { DoorOpenIcon, Copy, CopyCheck } from 'lucide-react'
import arena_default from "@/public/assets/arena-default-bg.jpeg"
import { Button } from '../button'
import { useRouter } from 'next/navigation'
import TooltipWrapper from '@/providers/tooltipProvider';

type Props = {
    space: GetSpacesType
}

import { toast } from 'sonner'
import { NEXTAUTH_URL } from '@/lib/config'
import Image from 'next/image'
export default function SpaceSelector({ space }: Props) {

    const router = useRouter();

    const [copied, setCopied] = useState<boolean>(false);
    const copyTimer = useRef<NodeJS.Timeout | null>(null);

    const handleCopy = () => {
        setCopied(true);
        toast.success("Copied Space Id", { id: "spaceid-copy" })
        window.navigator.clipboard.writeText(`${NEXTAUTH_URL}/space/join/${space.id}`);
        if (copyTimer.current) {
            clearTimeout(copyTimer.current)
        }

        copyTimer.current = setTimeout(() => {
            setCopied(false);
        }, 5000)
    }



    return (
        <div className='h-auto rounded-md shadow-xl flex flex-col items-center justify-between p-4'>
            <div className='w-full flex justify-center items-center px-4 py-2'>
                <p className='text-black text-center text-sm'>{space.name}</p>
            </div>
            {<Image src={space.thumbnail ? space.thumbnail : arena_default.src} className='w-[250px] h-[150px] rounded-xl' alt={space.name} height={250} width={250} />}
            <div className='w-full flex justify-between items-center px-4 py-2'>
                <p className='text-black text
                -center text-xs'>Hosted by {space.creator.username}</p>

                <p className='text-black text
                -center text-sm'>{space.width} x {space.height}</p>
            </div>
            <div className='w-full flex justify-between items-center px-4 py-2'>
                <TooltipWrapper content='Copy Invite Link'>
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => {
                            handleCopy()
                        }}
                        disabled={copied}
                    >
                        {copied ? <CopyCheck size={15} /> : <Copy size={15} />}
                    </Button>
                </TooltipWrapper>

                <TooltipWrapper content='Enter Space'>
                    <Button size={"icon"} variant={"outline"} onClick={() => {
                        router.push(`/space/join/${space.id}`)
                    }}>
                        <DoorOpenIcon size={15} />
                    </Button>
                </TooltipWrapper>
            </div>
        </div >
    )
}
