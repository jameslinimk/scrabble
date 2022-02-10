"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(3000, { cors: { origin: "*" } });
/* -------------------------------- Usernames ------------------------------- */
const usernames = new Set();
const socketUsernames = new Map();
function usernameCheck(username) {
    if (usernames.has(username))
        return "Username taken";
    if (username.length > 20)
        return "Username too long";
    if (/\s/g.test(username))
        return "Username contains spaces";
    usernames.add(username);
    return true;
}
//# sourceMappingURL=server.js.map