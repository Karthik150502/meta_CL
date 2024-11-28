import { OrthographicCamera, Html } from '@react-three/drei'
import { Canvas, } from '@react-three/fiber'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import UserPlayer from './spaceComponents/user';
import UserPeer from './spaceComponents/userPeer';
import { SpaceInfoAtom } from '@/recoil';
import { useWSSocket } from '@/context/ws';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { UserMessage } from '@/recoil';
import { ServerEvents } from '@/types';
const PLAYER_SPEED = 1;



type User = {
    x: number,
    y: number,
    message?: string,
    username: string
}

type InitialUserType = {
    userid: string,
    username: string,
    x: number,
    y: number
}

type Users = Record<string, User>;



export default function ArenaMain() {


    const { data: session } = useSession();
    const [playerPosition, setPlayerPosition] = useState<[number, number]>([0, 0]);
    const [characters, setCharacters] = useState<Users>({} as Users);
    const message = useRecoilValue(UserMessage);

    const boundary = useMemo(() => {
        return {
            left: -780,
            right: 780,
            top: 900,
            bottom: -900,
        }
    }, [])


    const spaceInfo = useRecoilValue(SpaceInfoAtom);
    const wsHandler = useWSSocket();

    const addUser = useCallback((userId: string, username: string, x: number, y: number) => {
        const newUser = {
            username: username,
            x: x,
            y: y
        }
        const chrs = { ...characters }
        chrs[userId] = newUser;
        setCharacters({
            ...chrs
        })
    }, [characters])

    const updateMessagefromPeer = useCallback((userId: string, message: string) => {
        const chars = { ...characters };
        chars[userId].message = message;
        setCharacters({ ...chars });
    }, [characters])

    const removeUser = useCallback((userId: string) => {
        const chrs = { ...characters }
        delete chrs[userId]
        setCharacters({
            ...chrs
        })
    }, [characters])



    const updatePeerPosition = useCallback((userId: string, x: number, y: number) => {
        const chars = { ...characters };
        chars[userId] = {
            ...chars[userId],
            x: x,
            y: y
        }
        setCharacters({ ...chars });
    }, [characters])




    useEffect(() => {
        if (!wsHandler?.socket) {
            return;
        }

        wsHandler.socket.onmessage = ({ data }) => {
            const parsed = JSON.parse(data);
            console.log("@Data => ", parsed);
            console.log("@event => ", parsed.type);
            switch (parsed.type) {
                case ServerEvents.USER_JOIN: {
                    addUser(parsed.payload.userId,
                        parsed.payload.username,
                        parsed.payload.x,
                        parsed.payload.y)
                    break;
                }
                case ServerEvents.USER_LEFT: {
                    removeUser(parsed.payload.userId)
                    break;
                }
                case ServerEvents.USER_MOVE: {
                    console.log(parsed.payload.id, parsed.payload.x, parsed.payload.y)
                    updatePeerPosition(parsed.payload.id, parsed.payload.x, parsed.payload.y);
                    break;
                }
                case ServerEvents.USER_MESSAGE: {
                    updateMessagefromPeer(parsed.payload.id, parsed.payload.message);
                    break;
                }

                default:
                    break;
            }

        }


        // All the events that server send should be received here.
    }, [wsHandler, wsHandler?.socket, addUser, removeUser, updatePeerPosition, updateMessagefromPeer])


    const updatePosition = useCallback((x: number, y: number) => {
        setPlayerPosition([x, y])
        wsHandler?.sendMessage(JSON.stringify({
            type: "move",
            payload: {
                x: x,
                y: y
            }
        }))
    }, [wsHandler])




    const setAndUpdate = useCallback((position: [number, number]) => {
        if (position[0] > boundary.right || position[0] < boundary.left || position[1] > boundary.top || position[1] < boundary.bottom) {
            return;
        }

        if (Object.entries(characters).some(([, user]) => isColliding([position[0], position[1], 0], [user.x, user.y, 0], 0.5, 0.5))) {
            return
        }

        updatePosition(position[0], position[1])
    }, [boundary.right, boundary.left, boundary.top, boundary.bottom, characters, updatePosition])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {



        switch (e.key) {
            case 'ArrowUp':
                setAndUpdate([playerPosition[0], playerPosition[1] + PLAYER_SPEED])
                break
            case 'ArrowDown':
                setAndUpdate([playerPosition[0], playerPosition[1] - PLAYER_SPEED])
                break
            case 'ArrowLeft':
                setAndUpdate([playerPosition[0] - PLAYER_SPEED, playerPosition[1]])
                break
            case 'ArrowRight':
                setAndUpdate([playerPosition[0] + PLAYER_SPEED, playerPosition[1]])
                break
        }
    }, [playerPosition, setAndUpdate])


    const isColliding = (pos1: [number, number, number], pos2: [number, number, number], radius1: number, radius2: number) => {
        const distance = Math.sqrt(
            Math.pow(pos2[0] - pos1[0], 2) +
            Math.pow(pos2[1] - pos1[1], 2) +
            Math.pow(pos2[2] - pos1[2], 2)
        );
        return distance < radius1 + radius2;
    };




    useEffect(() => {
        console.log("Space Info = ", spaceInfo)
        if (spaceInfo.message) {
            const parsed = JSON.parse(spaceInfo.message);
            setPlayerPosition([parsed.payload.spawn.x, parsed.payload.spawn.y])
            const newChrs: Users = {} as Users;
            parsed.payload.users.map((u: InitialUserType) => {
                newChrs[u.userid] = {
                    username: u.username,
                    x: u.x,
                    y: u.y,
                }
            })
            setCharacters((prev) => ({ ...prev, ...newChrs }))
        }

    }, [spaceInfo])


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [playerPosition, handleKeyDown])




    // bg-[url('https://wallpapercave.com/w/wp9969379.jpg')]

    return (<Canvas className="bg-green-300 w-[500px] min-h-screen">
        <ambientLight />
        <OrthographicCamera makeDefault position={[playerPosition[0], playerPosition[1], 5]} zoom={25} />
        <pointLight position={[playerPosition[0], playerPosition[1], 0]} castShadow />
        {/* <Html position={[0, 0, 0]} zIndexRange={[5, 10]} className='border-2 border-black '
            style={{
                height: `${boundary.top}px`,
                width: `${boundary.right}px`
            }}
        >

        </Html> */}



        <Html position={[22, 12, 0]} zIndexRange={[5, 10]} className='bg-white select-none'
            style={{
                height: "50px",
                width: "50px"
            }}
        >
        </Html>


        {
            Object.entries(characters).map(([, user], i) => {
                return <UserPeer
                    key={i}
                    x={user.x}
                    y={user.y}
                    name={user.username}
                    message={user.message}
                />
            })
        }


        <UserPlayer x={playerPosition[0]} y={playerPosition[1]} name={session?.user.username} message={message} />

    </Canvas >)
}
