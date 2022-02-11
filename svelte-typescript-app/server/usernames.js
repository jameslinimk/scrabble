"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernames = void 0;
class Usernames {
    usernames;
    constructor() {
        this.usernames = new Map();
    }
    /* -------------------------------- Usernames ------------------------------- */
    getUsername(id) {
        return this.usernames.get(id);
    }
    usernameCheck(username) {
        if (username.length > 20)
            return "Username too long";
        if (/\s/g.test(username))
            return "Username contains spaces";
        if (this.usernames.has(username))
            return "Username taken";
        return true;
    }
    setUsername(id, username) {
        const valid = this.usernameCheck(username);
        if (valid !== true)
            return valid;
        this.usernames.set(id, username);
        return true;
    }
    removeUsername(id) {
        const username = this.getUsername(id);
        if (!username)
            return "No username";
        this.usernames.delete(id);
        return true;
    }
}
const usernames = new Usernames();
exports.usernames = usernames;
//# sourceMappingURL=usernames.js.map