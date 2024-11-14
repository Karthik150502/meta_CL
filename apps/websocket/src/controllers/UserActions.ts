import { UserJoinPayload, UserLeavePayload, UserMovePayload, WebSocketInc } from "../types";
import { RoomManager } from "./RoomManager";
import { type User } from "./User";
import prisma from "@repo/db/client";




export class UserActions {



    constructor(private ws: WebSocket) {
        this.ws = ws;
    }


    static async addUser(data: WebSocketInc<UserJoinPayload>, user: User) {

        let spaceId = data.payload.spaceId;
        const space = await prisma.space.findFirst({
            where: {
                id: spaceId
            }
        })
        if (!space) {
            user.close();
            return;
        }
        user.setSpaceid(spaceId);

        console.log("Spaceid of the user joined = ", spaceId)

        user.setPosition(Math.floor(Math.random() * space.width), Math.floor(Math.random() * space.height))

        user.send({
            type: "space-joined",
            payload: {
                spawn: {
                    x: user.getPosition()[0],
                    y: user.getPosition()[1]
                },
                users: RoomManager.getInstance().rooms.get(spaceId)?.map((u) => ({
                    userid: u.id,
                    x: u.getPosition()[0],
                    y: u.getPosition()[1],
                })) ?? []
            }
        })


        RoomManager.getInstance().addUser(spaceId, user);


        RoomManager.getInstance().broadcast({
            type: "user-join",
            payload: {
                userId: user.id,
                x: user.getPosition()[0],
                y: user.getPosition()[1]
            }
        }, user, spaceId)
    }




    static async userMove(data: WebSocketInc<UserMovePayload>, user: User) {
        let moveX = data.payload.x
        let moveY = data.payload.y

        let xDisp = Math.abs(moveX - user.getPosition()[0])
        let yDisp = Math.abs(moveY - user.getPosition()[1])

        if (xDisp == 1 && yDisp == 0 || xDisp == 0 && yDisp == 1) {
            user.setPosition(moveX, moveY);
            RoomManager.getInstance().broadcast({
                type: "move",
                payload: {
                    id: user.id,
                    x: moveX,
                    y: moveY
                }
            }, user, user.getSpaceid()!)
        } else {
            user.send({
                type: "movement-rejected",
                payload: {
                    x: user.getPosition()[0],
                    y: user.getPosition()[1]
                }
            })
        }

    }



    static async userLeave(data: WebSocketInc<UserLeavePayload>, user: User) {
        this.destroy(data, user);
    }



    static async destroy(data: WebSocketInc<UserLeavePayload>, user: User) {
        let spaceId = data.payload.spaceId;
        let userId = data.payload.id;
        RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: userId,
            }
        }, user, spaceId)
        RoomManager.getInstance().removeUser(spaceId, user);
    }








}