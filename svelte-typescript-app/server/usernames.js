class Usernames {
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
        if (Array.from(this.usernames.values()).includes(username))
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
export { usernames };
//# sourceMappingURL=usernames.js.map