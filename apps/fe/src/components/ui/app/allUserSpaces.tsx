'use client'
import { getAllUserSpaces } from '@/actions/getSpsaces'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SpaceSelector from './spaceSelector'
import { GetSpacesType } from '@repo/common'
import SpaceSelectorSkeleton from '@/components/skeletons/SpaceSelector'


type DataFromGetSpaces = {
    id: string,
    userId: string,
    spaceid: string,
    space: GetSpacesType
}

export default function AllUserSpaces() {


    const { data, isPending } = useQuery({
        queryKey: ['spaces'],
        queryFn: async () => {
            return await getAllUserSpaces()
        }
    })

    return (
        <div className='shadow-inner w-[80%] rounded-2xl py-3 h-[450px] overflow-auto no-scrollbar grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-content-start  px-2 gap-x-2 gap-y-2'>
            {
                isPending ? (
                    ["", "", "", "", "", "", "", ""].map((item, index) => <SpaceSelectorSkeleton key={index} />)
                ) : (
                    [...data, ...data, ...data, ...data].map((item: DataFromGetSpaces) => <SpaceSelector key={item.id} space={item.space} />)
                )
            }
        </div>
    )
}
