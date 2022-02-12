import type { ExportedGame } from "./game"

interface ServerToClientEvents {
    userJoin: (username: string) => void
    userLeft: (username: string) => void
    gameData: (exportedGame: ExportedGame) => void
}
interface ClientToServerEvents {
    setUsername: (username: string, callback: (error: false | "Username too long" | "Username contains spaces" | "Username taken") => void) => void
    joinRoom: (id: string, callback: (error: false | "No username" | "Already in this game" | "Already in game", exportedGame?: ExportedGame) => void) => void
    ping: (callback: () => void) => void
}
interface InterServerEvents { ping: () => void }
interface SocketData { name: string, age: number }

export type {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
}

