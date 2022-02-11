import { Server } from "socket.io"
import { Game, games, getGameBySocketId } from "./game"
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types"
import { usernames } from "./usernames"

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(3000, { cors: { origin: "*" } })
console.log("Starting server")

/* --------------------------------- Testing -------------------------------- */
const testRoom = new Game(io)
testRoom.id = "test"
games.push(testRoom)

let testUsernames = 0
io.on("connection", (socket) => {
    usernames.setUsername(socket.id, `test#${testUsernames}`)
    console.log(`test#${testUsernames} connected`)
    testUsernames++

    socket.on("setUsername", (username, callback) => {
        console.log(usernames.getUsername(socket.id), "changing to", username)
        const valid = usernames.setUsername(socket.id, username)
        console.log(" - ", valid)
        callback((valid === true) ? !valid : valid)
    })

    socket.on("joinRoom", (id, callback) => {
        console.log(usernames.getUsername(socket.id), "joining test")
        // Change later
        const valid = testRoom.addSocket(socket)
        console.log(" - ", valid)
        callback(false)
    })

    socket.on("ping", (callback) => {
        callback()
    })

    socket.on("disconnect", () => {
        console.log(usernames.getUsername(socket.id), "left")
        usernames.removeUsername(socket.id)
        getGameBySocketId(socket.id)?.removeSocket(socket)
    })
})