import { atom } from "recoil";



type SpaceInfo = {
    spaceId: string | null,
    message: string | null
}


export const SpaceInfoAtom = atom<SpaceInfo>({
    key: 'SpaceInfoAtom',
    default: {} as SpaceInfo
})

export const UserMessage = atom<string>({
    key: 'UserMessage',
    default: ""
})