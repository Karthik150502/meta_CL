'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMaps } from '@/actions/getMaps'
import MapCard from './mapCard'
export default function MapsLister({ setMapId }: { setMapId: (val: string) => void }) {


    const [selectedMap, setSelectedMap] = useState<string>("");

    const { data, isPending } = useQuery({
        queryKey: ['maps'],
        queryFn: async () => await getMaps()
    })

    const onSelect = (val: string) => {
        setSelectedMap(val);
        setMapId(val);
    }

    return (
        <div className='w-full h-full'>
            <div className='py-8'>
                <p className='text-3xl text-center'>Select the Map</p>
            </div>
            <div className='w-full h-[350px] grid grid-cols-2 gap-y-4 place-content-start place-items-center overflow-auto no-scrollbar py-4'>
                {
                    isPending ? <p>Loading....</p> : (
                        data?.map((map) => {
                            return <MapCard id={map.id} onSelect={onSelect} selected={selectedMap === map.id} key={map.id} name={map.name} height={map.height} width={map.width} />
                        })
                    )
                }
            </div>
        </div>
    )
}


// (
//     data?.map((map, index) => {
//         return <pre key={index}>{JSON.stringify(map, null, 4)}</pre>
//     })
// )