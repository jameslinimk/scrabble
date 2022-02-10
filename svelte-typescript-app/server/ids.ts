class Ids {
    adjectives: string[]
    nouns: string[]
    gameIds: Set<string>

    constructor() {
        this.adjectives = ["silly", "strong", "big", "small", "tiny", "weak", "white", "black", "brown", "yellow", "green", "blue", "red", "dull", "sharp", "pink", "purple"]
        this.nouns = ["car", "bus", "monkey", "keyboard", "laptop", "mouse", "sword", "cable", "phone", "bowl", "fork", "spoon", "knife", "bike", "pencil", "apple", "orange", "banana"]
        this.gameIds = new Set()
    }

    generateId() {
        let id = `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]}-${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`
        while (this.gameIds.has(id)) {
            id = `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]}-${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`
        }
        this.gameIds.add(id)
        return id
    }
}

export {
    Ids
}
