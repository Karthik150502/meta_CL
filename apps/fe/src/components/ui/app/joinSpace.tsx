'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogFooter
} from "@/components/ui/alert-dialog"
import { Button } from '../button'
import { Input } from '../input'
import { useRouter } from 'next/navigation'
export default function JoinSpace() {


    const [open, setOpen] = useState<boolean>(false);
    const [spaceId, setSpaceId] = useState<string>("");
    const router = useRouter();

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className='text-black/70 hover:text-black transition-colors'>
                Join Space
            </AlertDialogTrigger>


            <AlertDialogContent className='w-[500px] h-[200px] flex flex-col items-center justify-center'>
                <div className='w-full'>
                    <p className='text-lg'>Enter Space Id</p>
                </div>
                <Input value={spaceId} onChange={(e) => { setSpaceId(e.target.value) }} />
                <AlertDialogFooter className='w-full border-t border-t-black/15 py-4'>
                    <Button variant={"default"} onClick={() => {
                        router.push(`/space/join/${spaceId}`)
                        setOpen(false)
                    }}>Join</Button>
                    <Button variant={"outline"} onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
