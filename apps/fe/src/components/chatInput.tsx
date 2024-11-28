'use client'
import React, { useCallback, useRef } from 'react'
import { Input } from './ui/input'
import { Send } from 'lucide-react';
import { useWSSocket } from '@/context/ws';
import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import { UserMessage } from '@/recoil';
export default function ChatInput() {

    const setMessage = useSetRecoilState(UserMessage);
    const ws = useWSSocket();
    const { data: session } = useSession();
    const inputref = useRef<HTMLInputElement | null>(null);

    const handleSendMessage = useCallback(() => {
        if (ws && inputref.current?.value) {
            setMessage(inputref.current?.value)
            ws.sendMessage(JSON.stringify({
                type: "chat",
                payload: {
                    userId: session?.user.id,
                    message: inputref.current?.value
                }
            }));
            inputref.current.value = ""
        }
    }, [ws, setMessage, session?.user.id])

    return (
        <div className='max-w-[60%] md:w-[50%] w-[90%]  h-[80px] mx-auto flex items-center justify-center gap-x-2 absolute bottom-5 right-4'>
            <Input ref={inputref} />
            <div className='w-10 h-10 bg-purple-700 rounded-full grid place-items-center place-content-center cursor-pointer' onClick={handleSendMessage}>
                <Send className='stroke-white' />
            </div>
        </div>
    )
}
