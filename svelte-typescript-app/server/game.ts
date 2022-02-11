import { Server, Socket } from "socket.io"
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types"
import { usernames } from "./usernames"

// Maybe add a web ui to track logs, games, and more

class Ids {
    adjectives: string[]
    nouns: string[]
    gameIds: Set<string>

    constructor() {
        this.adjectives = ["silly", "strong", "big", "small", "tiny", "weak", "white", "black", "brown", "yellow", "green", "blue", "red", "dull", "sharp", "pink", "purple"]
        this.nouns = ["car", "bus", "monkey", "keyboard", "laptop", "mouse", "sword", "cable", "phone", "bowl", "fork", "spoon", "knife", "bike", "pencil", "apple", "orange", "banana"]
        this.gameIds = new Set()
    }

    generateId() {
        let id = `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]}-${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`
        while (this.gameIds.has(id)) {
            id = `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]}-${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`
        }
        this.gameIds.add(id)
        return id
    }
}
const ids = new Ids()

enum GameStates {
    WAITING, GAME, END
}
interface ExportedGame {
    usernames: (string | undefined)[]
    id: string
}
class Game {
    id: string
    state: GameStates
    get clients() {
        const room: Set<string> = <any>this.io.sockets.adapter.rooms.get(this.id)
        return (room) ? room : new Set<string>()
    }
    get clientUsernames() {
        return Array.from(this.clients).map(client => usernames.getUsername(client))
    }

    exportData(): ExportedGame {
        return {
            usernames: this.clientUsernames,
            id: this.id
        }
    }

    constructor(private io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
        this.id = ids.generateId()
        this.state = GameStates.WAITING
    }

    addSocket(socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
        const username = usernames.getUsername(socket.id)
        if (!username) return "No username"
        if (this.clients.has(socket.id)) return "Already in this game"
        if (getGameBySocketId(socket.id)) return "Already in game"
        if (this.clients.size !== 0) this.io.to(this.id).emit("userJoin", username)

        socket.join(this.id)
        return true
    }

    removeSocket(socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
        const username = usernames.getUsername(socket.id)
        if (!username) return "No username"
        if (!this.clients.has(socket.id)) return "Not in this game"

        socket.leave(this.id)
        socket.emit("userLeft", username)
    }
}

const games: Game[] = []
function getGameBySocketId(id: string) {
    return games.filter(game => game.clients.has(id))?.[0]
}

export {
    GameStates,
    ExportedGame,
    Game,
    getGameBySocketId,
    games
}
