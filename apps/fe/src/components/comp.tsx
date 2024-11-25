import { OrthographicCamera } from '@react-three/drei'
import { Canvas, } from '@react-three/fiber'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import UserPlayer from './spaceComponents/user';
import UserPeer from './spaceComponents/userPeer';
import { useRecoilValue } from 'recoil';
import { SpaceInfoAtom } from '@/recoil';
import { useWSSocket } from '@/context/ws';
const PLAYER_SPEED = 0.5;
export default function ArenaMain() {

    const [playerPosition, setPlayerPosition] = useState<[number, number]>([0, 0]);
    const obstacles = useMemo(() => [
        [1.2, 0],
        [2.5, 1.5],
        [4.5, 4],
        [5.5, 7],
        [6.5, 9],
        [7.5, 10],
        [8.5, 11],
        [7.5, 12],
        [1.5, 10],
        [1.5, 3],
        [1.5, 15],
        [10, 16],
        [15, 11],
        [10, 5],
    ], [])


    const spaceInfo = useRecoilValue(SpaceInfoAtom);
    const wsHandler = useWSSocket();

    useEffect(() => {
        if (!wsHandler?.socket) {
            return;
        }

        wsHandler.socket.onmessage = (data) => {
            console.log("@data = ", data);
        }


        // All the events that server send should be received here.
    }, [wsHandler, wsHandler?.socket])



    useEffect(() => {
        console.log("@Space Info = ", spaceInfo)
    }, [spaceInfo])





    const setAndUpdate = useCallback((position: [number, number]) => {
        if (obstacles.some(i => isColliding([position[0], position[1], 0], [i[0], i[1], 0], 0.5, 0.5))) {
            return
        }
        setPlayerPosition([position[0], position[1]])
        // updatePosition([postion[0], postion[1]])
    }, [obstacles])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {



        switch (e.key) {
            case 'ArrowUp':
            case "w":
                setAndUpdate([playerPosition[0], playerPosition[1] + PLAYER_SPEED])
                break
            case 'ArrowDown':
            case 's':
                setAndUpdate([playerPosition[0], playerPosition[1] - PLAYER_SPEED])
                break
            case 'ArrowLeft':
            case 'a':
                setAndUpdate([playerPosition[0] - PLAYER_SPEED, playerPosition[1]])
                break
            case 'ArrowRight':
            case 'd':
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
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [playerPosition, handleKeyDown])


    // bg-[url('https://wallpapercave.com/w/wp9969379.jpg')]

    return (<Canvas className="bg-green-300 w-[500px] min-h-screen">
        <ambientLight />
        <OrthographicCamera makeDefault position={[playerPosition[0], playerPosition[1], 5]} zoom={25} />
        <pointLight position={[playerPosition[0], playerPosition[1], 0]} castShadow />
        {/* <Box position={[playerPosition[0], playerPosition[1], 0]} /> */}



        <UserPlayer x={playerPosition[0]} y={playerPosition[1]} name={"Karti15"} message="Hello" />

        {
            obstacles.map((item, i) => {
                return <UserPeer
                    key={i}
                    x={item[0]}
                    y={item[1]}
                    name=""
                />
            })
        }








    </Canvas >)
}
