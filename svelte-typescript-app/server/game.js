"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.games = exports.getGameBySocketId = exports.Game = exports.GameStates = void 0;
const usernames_1 = require("./usernames");
class Ids {
    adjectives;
    nouns;
    gameIds;
    constructor() {
        this.adjectives = ["silly", "strong", "big", "small", "tiny", "weak", "white", "black", "brown", "yellow", "green", "blue", "red", "dull", "sharp", "pink", "purple"];
        this.nouns = ["car", "bus", "monkey", "keyboard", "laptop", "mouse", "sword", "cable", "phone", "bowl", "fork", "spoon", "knife", "bike", "pencil", "apple", "orange", "banana"];
        this.gameIds = new Set();
    }
    generateId() {
        let id = `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]}-${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`;
        while (this.gameIds.has(id)) {
            id = `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]}-${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`;
        }
        this.gameIds.add(id);
        return id;
    }
}
const ids = new Ids();
var GameStates;
(function (GameStates) {
    GameStates[GameStates["WAITING"] = 0] = "WAITING";
    GameStates[GameStates["GAME"] = 1] = "GAME";
    GameStates[GameStates["END"] = 2] = "END";
})(GameStates || (GameStates = {}));
exports.GameStates = GameStates;
class Game {
    io;
    id;
    state;
    get clients() {
        const room = this.io.sockets.adapter.rooms.get(this.id);
        return (room) ? room : new Set();
    }
    get clientUsernames() {
        return Array.from(this.clients).map(client => usernames_1.usernames.getUsername(client));
    }
    exportData() {
        return {
            usernames: this.clientUsernames,
            id: this.id
        };
    }
    constructor(io) {
        this.io = io;
        this.id = ids.generateId();
        this.state = GameStates.WAITING;
    }
    addSocket(socket) {
        const username = usernames_1.usernames.getUsername(socket.id);
        if (!username)
            return "No username";
        if (this.clients.has(socket.id))
            return "Already in this game";
        if (getGameBySocketId(socket.id))
            return "Already in game";
        if (this.clients.size !== 0)
            this.io.to(this.id).emit("userJoin", username);
        socket.join(this.id);
        return true;
    }
    removeSocket(socket) {
        const username = usernames_1.usernames.getUsername(socket.id);
        if (!username)
            return "No username";
        if (!this.clients.has(socket.id))
            return "Not in this game";
        socket.leave(this.id);
        socket.emit("userLeft", username);
    }
}
exports.Game = Game;
const games = [];
exports.games = games;
function getGameBySocketId(id) {
    return games.filter(game => game.clients.has(id))?.[0];
}
exports.getGameBySocketId = getGameBySocketId;
//# sourceMappingURL=game.js.map