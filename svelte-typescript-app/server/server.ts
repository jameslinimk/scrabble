import { Server } from "socket.io"
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types"

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(3000, { cors: { origin: "*" } })

/* -------------------------------- Usernames ------------------------------- */
const usernames = new Set<string>()
const socketUsernames = new Map<string, string>()
function usernameCheck(username: string) {
    if (usernames.has(username)) return "Username taken"
    if (username.length > 20) return "Username too long"
    if (/\s/g.test(username)) return "Username contains spaces"
    usernames.add(username)
    return true
}