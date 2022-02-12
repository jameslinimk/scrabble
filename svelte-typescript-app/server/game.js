import { usernames } from "./usernames";
// Maybe add a web ui to track logs, games, and more
class Ids {
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
class Game {
    constructor(io) {
        this.io = io;
        this.id = ids.generateId();
        this.state = GameStates.WAITING;
    }
    get clients() {
        const room = this.io.sockets.adapter.rooms.get(this.id);
        return (room) ? room : new Set();
    }
    get clientUsernames() {
        return Array.from(this.clients).map(client => usernames.getUsername(client));
    }
    exportData() {
        return {
            usernames: this.clientUsernames,
            id: this.id
        };
    }
    addSocket(socket) {
        const username = usernames.getUsername(socket.id);
        if (!username)
            return "No username";
        if (this.clients.has(socket.id))
            return "Already in this game";
        if (getGameBySocketId(socket.id))
            return "Already in game";
        if (this.clients.size !== 0)
            this.userJoin(username);
        socket.join(this.id);
        return true;
    }
    removeSocket(socket) {
        const username = usernames.getUsername(socket.id);
        if (!username)
            return "No username";
        if (!this.clients.has(socket.id))
            return "Not in this game";
        socket.leave(this.id);
        this.userLeft(username);
    }
    /* ---------------------------- Server to client ---------------------------- */
    userJoin(username) {
        this.io.to(this.id).emit("userJoin", username);
    }
    userLeft(username) {
        this.io.to(this.id).emit("userLeft", username);
    }
    gameData() {
        this.io.to(this.id).emit("gameData", this.exportData());
    }
}
const games = [];
function getGameBySocketId(id) {
    var _a;
    return (_a = games.filter(game => game.clients.has(id))) === null || _a === void 0 ? void 0 : _a[0];
}
export { GameStates, Game, getGameBySocketId, games };
//# sourceMappingURL=game.js.map