'use client'
import { getSpaceById } from '@/actions/getSingleSpace'
import { getTheCookie } from '@/actions/test'
import { Button } from '@/components/ui/button'
import TooltipWrapper from '@/providers/tooltipProvider'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { SpaceInfoAtom } from '@/recoil'
import { useWSSocket } from '@/context/ws'
import { checkSpaceMember } from '@/actions/checkCreateSpaceMember'
import { createSpaceMember } from '@/actions/checkCreateSpaceMember'
type Props = {
    params: {
        id: string
    }
}

export default function JoinPage({ params }: Props) {


    const router = useRouter();
    const setSpaceInfo = useSetRecoilState(SpaceInfoAtom)
    const ws = useWSSocket();

    const { data, isPending } = useQuery({
        queryKey: ['join'],
        queryFn: async () => {
            return await getSpaceById(params.id);
        }
    });


    const { data: isMemberOfSpace } = useQuery({
        queryKey: ["check-space-member"],
        queryFn: async () => await checkSpaceMember({
            spaceId: params.id
        })
    })



    const { mutate: joinSpace } = useMutation({
        mutationKey: [`space-member-create`],
        mutationFn: async () => {
            return await handleSpaceJoin();
        }
    })


    useEffect(() => {
        if (ws?.socket) {
            ws.socket.onmessage = (data) => {
                setSpaceInfo({
                    spaceId: params.id,
                    message: data.data
                });
                router.push(`/space/${params.id}`);
            }
        }
        return () => {
            if (ws?.socket) {
                ws.socket.onmessage = () => {
                }
            }
        }
    }, [ws?.socket, setSpaceInfo, params.id, router])


    const handleSpaceJoin = async () => {
        if (!isMemberOfSpace) {
            try {
                await createSpaceMember({ spaceId: params.id });
            } catch {
                return;
            }
        }
        const token = await getTheCookie()
        if (ws) {
            const data = JSON.stringify({
                type: "join",
                payload: {
                    spaceId: params.id,
                    token
                }
            })
            ws.sendMessage(data)
        }
    }

    return (
        <div className='min-h-screen relative overflow-hidden flex items-center justify-center'>
            <div className='flex flex-col gap-y-2 items-center justify-center'>
                <pre className='text-black'>{JSON.stringify(data, null, 4)}</pre>
                <div className="flex w-full items-center justify-center gap-2">
                    <TooltipWrapper content="go back">
                        <Button size="icon" variant={"outline"}
                            onClick={() => {
                                router.push(`/`)
                            }}
                        >
                            <ArrowLeft />
                        </Button>
                    </TooltipWrapper>
                    <Button
                        disabled={isPending}
                        onClick={async () => {
                            joinSpace();
                        }}
                    >Enter Space</Button>
                </div>
            </div>
        </div >
    )
}
