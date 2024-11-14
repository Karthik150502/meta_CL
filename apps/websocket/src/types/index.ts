


export type UserJoinPayload = {
    spaceId: string,
    token: string

}
export type UserLeavePayload = {
    id: string,
    spaceId: string
}

export type UserMovePayload = {
    x: number,
    y: number
}



export type WebSocketInc<T> = {
    type: string,
    payload: T
}


export type OutgoingPayload = {

}




