
interface ServerToClientEvents {
}
interface ClientToServerEvents {
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

