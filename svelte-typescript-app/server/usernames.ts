class Usernames {
    usernames: Map<string, string>

    constructor() {
        this.usernames = new Map()
    }

    /* -------------------------------- Usernames ------------------------------- */
    getUsername(id: string) {
        return this.usernames.get(id)
    }

    usernameCheck(username: string) {
        if (username.length > 20) return "Username too long"
        if (/\s/g.test(username)) return "Username contains spaces"
        if (this.usernames.has(username)) return "Username taken"
        return true
    }

    setUsername(id: string, username: string) {
        const valid = this.usernameCheck(username)
        if (valid !== true) return valid
        this.usernames.set(id, username)
        return true
    }

    removeUsername(id: string) {
        const username = this.getUsername(id)
        if (!username) return "No username"

        this.usernames.delete(id)
        return true
    }
}
const usernames = new Usernames()

export {
    usernames
}

