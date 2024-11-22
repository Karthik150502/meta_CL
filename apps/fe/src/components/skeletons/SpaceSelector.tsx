import React from 'react'

export default function SpaceSelectorSkeleton() {
    return (
        <div className='h-[250px] rounded-md shadow-md animate-pulse  flex flex-col items-center justify-between p-4'>
            <div className='bg-slate-200 w-[80%] h-[25px] rounded-full'></div>
            <div className='w-full'>
                
            </div>
            <div className='w-full flex justify-between items-center px-4'>
                <div className='bg-slate-100 h-[25px] w-[45%] rounded-full'></div>
                <div className='bg-slate-100 h-[25px] w-[45%] rounded-full'></div>
            </div>
        </div>
    )
}
