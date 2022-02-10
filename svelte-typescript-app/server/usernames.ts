class Usernames {
    usernames: Set<string>
    socketUsernames: Map<string, string>

    constructor() {
        this.usernames = new Set()
        this.socketUsernames = new Map()
    }

    /* -------------------------------- Usernames ------------------------------- */
    usernameCheck(username: string) {
        if (username.length > 20) return "Username too long"
        if (/\s/g.test(username)) return "Username contains spaces"
        if (this.usernames.has(username)) return "Username taken"
        return true
    }

    setUsername(socketId: string, username: string) {
        this.usernames.add(username)
        this.socketUsernames.set(socketId, username)
    }

    removeUsername(socketId: string) {
        const username = this.socketUsernames.get(socketId)
        if (!username) return "No username"
        this.usernames.delete(username)
        this.socketUsernames.delete(socketId)
    }
}

export {
    Usernames
}

