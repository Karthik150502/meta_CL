"use client"

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { SpaceInfoAtom } from '@/recoil'
interface WSInterface {
  children?: React.ReactNode
}

export interface WSContextProps {
  sendMessage: (msg: string) => void;
  socket: WebSocket | null
}

export const WSContext = React.createContext<WSContextProps | null>(null);

export default function WSProvider({ children }: WSInterface) {

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const setSpaceInfo = useSetRecoilState(SpaceInfoAtom);

  const sendMessage = useCallback((msg: string) => {
    if (socket) {
      socket.send(msg);
    }
  }, [socket])

  useEffect(() => {
    const state = new WebSocket("http://localhost:3002");
    setSocket(state);
    return () => {
      state.close();
      setSpaceInfo({
        spaceId: '',
        message: ''
      })
      setSocket(null);
    }
  }, [setSpaceInfo])

  return (
    <WSContext.Provider value={{ sendMessage, socket }}>
      {children}
    </WSContext.Provider>
  )
}





export function useWSSocket() {
  const state = useContext(WSContext);
  const [ws, setWs] = useState<WSContextProps | null>(null);


  useEffect(() => {
    if (state) {
      setWs(state)
    }
  }, [state])
  return ws
}