import { OutgoingPayload } from "../types";
import { type User } from "./User";

export class RoomManager {


    public rooms: Map<string, User[]> = new Map();
    static instance: RoomManager | undefined;


    private constructor() {
    }



    static getInstance() {
        if (!this.instance) {
            this.instance = new RoomManager();
        }
        return this.instance;
    }


    public addUser(spaceId: string, user: User) {
        this.rooms.set(spaceId, [...(this.rooms.get(spaceId) ?? []), user])
    }




    public removeUser(spaceId: string, user: User) {
        if (!this.rooms.get(spaceId)) {
            return;
        }
        this.rooms.set(spaceId, this.rooms.get(spaceId)?.filter(u => u.id != user.id) ?? []);
    }



    public broadcast(payload: OutgoingPayload, user: User, spaceId: string) {


        console.log(payload)
        console.log(spaceId)
        if (!this.rooms.get(spaceId)) {
            return;
        }

        this.rooms.get(spaceId)?.forEach((u) => {
            // debug logs
            console.log(`Sending message to user ${u.id} in space ${user.id}`);
            if (u.id != user.id) {
                console.log("event is sent")
                u.send(payload)
            }
        })

    }



}