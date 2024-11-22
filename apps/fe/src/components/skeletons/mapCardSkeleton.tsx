import React from 'react'

export default function MapCardSkeleton() {
    return (
        <div className='w-[200px] h-[150px] rounded-md shadow-lg flex flex-col items-center justify-between py-2 animate-pulse'
        >
            <p className='bg-slate-100 h-[20px] rounded-full w-[80%]'></p>
            <p className="bg-slate-100 h-[20px] rounded-full w-[50%]"></p>
        </div >
    )
}
