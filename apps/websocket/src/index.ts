import { WebSocketServer } from "ws";
import { PORT } from "./lib/config";
import { User } from "./controllers/User";


const wss = new WebSocketServer({ port: PORT })

wss.on("connection", (ws) => {
    let user: User | undefined;
    console.log("user connected")
    user = new User(ws);
    

    ws.on("error", (error) => {
        console.log("Error connecting to the Websocket connection;");
        console.error(error);
    });

    ws.on("close", () => {
        user?.destroy();
    })

})