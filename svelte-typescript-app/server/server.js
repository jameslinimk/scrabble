"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const game_1 = require("./game");
const usernames_1 = require("./usernames");
const io = new socket_io_1.Server(3000, { cors: { origin: "*" } });
console.log("Starting server");
/* --------------------------------- Testing -------------------------------- */
const testRoom = new game_1.Game(io);
testRoom.id = "test";
game_1.games.push(testRoom);
let testUsernames = 0;
io.on("connection", (socket) => {
    usernames_1.usernames.setUsername(socket.id, `test#${testUsernames}`);
    console.log(`test#${testUsernames} connected`);
    testUsernames++;
    socket.on("setUsername", (username, callback) => {
        console.log(usernames_1.usernames.getUsername(socket.id), "changing to", username);
        const valid = usernames_1.usernames.setUsername(socket.id, username);
        console.log(" - ", valid);
        callback((valid === true) ? !valid : valid);
    });
    socket.on("joinRoom", (id, callback) => {
        console.log(usernames_1.usernames.getUsername(socket.id), "joining test");
        // Change later
        const valid = testRoom.addSocket(socket);
        console.log(" - ", valid);
        callback(false, testRoom.exportData());
    });
    socket.on("ping", (callback) => {
        callback();
    });
    socket.on("disconnect", () => {
        console.log(usernames_1.usernames.getUsername(socket.id), "left");
        usernames_1.usernames.removeUsername(socket.id);
        (0, game_1.getGameBySocketId)(socket.id)?.removeSocket(socket);
    });
});
//# sourceMappingURL=server.js.map