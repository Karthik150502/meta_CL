'use client'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";

type Props = {
    content: string,
    children: React.ReactNode,
    side?: "top" | "bottom" | "left" | "right"
}

export default function TooltipWrapper({ content, children, side = "top" }: Props) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} className='text-xs'>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
