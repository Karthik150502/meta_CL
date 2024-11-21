'use client'
import React, { useRef, useEffect, useState } from 'react'

interface Player {
    id: number
    x: number
    y: number
    color: string
}

const PLAYER_SIZE = 20
const MOVE_SPEED = 20

export default function Arena() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [players, setPlayers] = useState<Player[]>([
        { id: 1, x: 100, y: 100, color: 'red' },
        { id: 2, x: 200, y: 200, color: 'blue' },
    ])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()
            setPlayers(prevPlayers =>
                prevPlayers.map(player => {
                    if (player.id === 1) {
                        switch (key) {
                            case 'arrowup':
                            case 'w':
                                return { ...player, y: Math.max(0, player.y - MOVE_SPEED) }
                            case 'arrowdown':
                            case 's':
                                return { ...player, y: Math.min(canvas.height - PLAYER_SIZE, player.y + MOVE_SPEED) }
                            case 'arrowleft':
                            case 'a':
                                return { ...player, x: Math.max(0, player.x - MOVE_SPEED) }
                            case 'arrowright':
                            case 'd':
                                return { ...player, x: Math.min(canvas.width - PLAYER_SIZE, player.x + MOVE_SPEED) }
                            default:
                                return player
                        }
                    }
                    return player
                })
            )
        }

        window.addEventListener('keydown', handleKeyDown)

        const gameLoop = () => {
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height)

            // Draw players
            players.forEach(player => {
                context.fillStyle = player.color
                context.fillRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE)
            })

            // Request next frame
            requestAnimationFrame(gameLoop)
        }

        gameLoop()

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [players])

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border border-gray-300 bg-white"
            />
        </div>
    )
}

