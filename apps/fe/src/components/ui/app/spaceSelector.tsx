'use client'
import React from 'react'
import { GetSpacesType } from "@repo/common"
import { DoorOpenIcon } from 'lucide-react'
import arena_default from "@/public/assets/arena-default-bg.jpeg"
import { Button } from '../button'
import { useRouter } from 'next/navigation'
type Props = {
    space: GetSpacesType
}

export default function SpaceSelector({ space }: Props) {

    const router = useRouter()


    return (
        <div className='h-auto rounded-md shadow-xl flex flex-col items-center justify-between p-4'>
            <div className='w-full flex justify-center items-center px-4 py-2'>
                <p className='text-black text-center text-sm'>{space.name}</p>
            </div>
            {<img src={space.thumbnail ? space.thumbnail : arena_default.src} className='w-[250px] h-[150px] rounded-xl'></img>}
            <div className='w-full flex justify-between items-center px-4 py-2'>
                <p className='text-black text
                -center text-xs'>Hosted by {space.creator.username}</p>
                <Button size={"icon"} variant={"outline"} onClick={() => {
                    router.push(`/space/${space.id}`)
                }}>
                    <DoorOpenIcon size={15} />
                </Button>
                <p className='text-black text
                -center text-sm'>{space.width} x {space.height}</p>
            </div>
        </div>
    )
}
