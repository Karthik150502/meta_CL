import React from 'react'
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';


interface Props {
    id: string,
    name: string,
    width: number,
    height: number,
    selected?: boolean,
    onSelect: (val: string) => void
}

export default function MapCard({ id, name, width, height, selected, onSelect }: Props) {
    return (
        <div className={cn('w-[200px] h-[150px] rounded-md shadow-lg flex flex-col items-center justify-between py-2 cursor-pointer hover:scale-105 transition-all duration-300 relative', { 'border-2 border-primary': selected })}
            onClick={() => { onSelect(id) }}
        >
            {
                selected && <Check className='bg-primary rounded-full h-6 w-6 p-1 absolute left-2 bottom-2 stroke-white' />
            }

            <p>{name}</p>
            <p className="text-xs">{width} x {height}</p>
        </div>
    )
}
