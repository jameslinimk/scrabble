import { Server } from "socket.io"
import { Ids } from "./ids"
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types"
import { Usernames } from "./usernames"

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(3000, { cors: { origin: "*" } })

const usernames = new Usernames()
const ids = new Ids()

enum GameStates {
    WAITING, GAME, END
}
class Game {
    id: string
    state: GameStates

    constructor() {
        this.id = ""
        this.state = GameStates.WAITING
    }
}

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)
})