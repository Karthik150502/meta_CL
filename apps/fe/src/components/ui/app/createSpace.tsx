'use client'
import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogFooter
} from "@/components/ui/alert-dialog"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { useState } from 'react'
import EnterSpaceDetails from './enterSpaceDetails'
import { CreateSpaceSchemaType } from '@repo/common'
import MapsLister from './mapsLister'
import { useMutation } from '@tanstack/react-query'
import { spaceCreateHandler } from '@/actions/createSpace'
import { toast } from 'sonner'
import { Button } from '../button'
import { useRouter } from 'next/navigation'
export default function CreateSpace() {
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: async (data: CreateSpaceSchemaType) => await spaceCreateHandler(data),
        mutationKey: ['create-space'],
        onSuccess: (data) => {
            setOpen(false);
            setMapId("");
            toast.success("Created a space successfully.", { id: "space-create" })
            router.push(`/space/join/${data.id}`)
        },
        onError: () => {
            toast.error("Failed to create space.", { id: "space-create" })
        }
    })

    const [open, setOpen] = useState<boolean>(false);
    const [mapId, setMapId] = useState<string>("")
    const onSubmit = (values: CreateSpaceSchemaType) => {
        toast.loading("Creating space.", { id: "space-create" })
        mutate({
            mapId: mapId,
            name: values.name,
            dimensions: values.dimensions
        })

    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className='text-black/70 hover:text-black transition-colors'>
                Create Space
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[500px] h-[550px] flex flex-col items-center justify-center'>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem><MapsLister setMapId={(val: string) => {
                            setMapId(val)
                        }} /></CarouselItem>
                        <CarouselItem className='flex items-center justify-center'><EnterSpaceDetails onSubmit={onSubmit} /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className='' />
                    <CarouselNext className='key' />
                </Carousel>
                <AlertDialogFooter className='w-full border-t border-t-black/15 py-4'>
                    <Button variant={"outline"} onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )   
}
