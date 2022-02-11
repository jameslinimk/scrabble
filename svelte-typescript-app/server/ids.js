"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ids = exports.Ids = void 0;
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
exports.Ids = Ids;
const ids = new Ids();
exports.ids = ids;
//# sourceMappingURL=ids.js.map