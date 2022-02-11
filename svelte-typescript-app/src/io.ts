import { io as _io, Socket } from "socket.io-client"
import { writable as _writable } from "svelte/store"
import type { ClientToServerEvents, ServerToClientEvents } from "../server/types"

const io: Socket<ServerToClientEvents, ClientToServerEvents> = _io("localhost:3000")
const ioWritable = _writable(io)

export {
    ioWritable
}

