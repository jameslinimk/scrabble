import { ExportedGame } from "./game"

interface ServerToClientEvents {
    userJoin: (username: string) => void
    userLeft: (username: string) => void
    gameData: (exportedGame: ExportedGame) => void
}
interface ClientToServerEvents {
    setUsername: (username: string, callback: (error: false | "Username too long" | "Username contains spaces" | "Username taken") => void) => void
    joinRoom: (id: string, callback: (error: boolean) => void) => void
    ping: (callback: () => void) => void
}
interface InterServerEvents { ping: () => void }
interface SocketData { name: string, age: number }

export {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
}

