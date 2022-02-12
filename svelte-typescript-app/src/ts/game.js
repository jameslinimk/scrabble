import { writable } from "svelte/store";
const Colors = {
    "empty": "#E9D8A6",
    "center": "#94D2BD",
    2: "#AE2012",
    3: "#005F73"
};
function initBoard(board) {
    function getMultiplier(i) {
        switch (i) {
            case 0:
                return 2;
            case 1:
                return 3;
            case 6:
                return 3;
            default:
                return 2;
        }
    }
    const boardCenter = { x: (board.length - 1) / 2, y: (board.length - 1) / 2 };
    /* -------------------------------------------------------------------------- */
    /*                                 Multipliers                                */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- Diagonals ------------------------------- */
    for (let i = 0; i < 7; i++)
        board[boardCenter.y + i + 1][boardCenter.x + i + 1] = getMultiplier(i);
    for (let i = 0; i < 7; i++)
        board[boardCenter.y - i - 1][boardCenter.x - i - 1] = getMultiplier(i);
    for (let i = 0; i < 7; i++)
        board[boardCenter.y + i + 1][boardCenter.x - i - 1] = getMultiplier(i);
    for (let i = 0; i < 7; i++)
        board[boardCenter.y - i - 1][boardCenter.x + i + 1] = getMultiplier(i);
    /* ---------------------------------- Sides --------------------------------- */
    // Top
    board[0][3] = 2;
    board[0][boardCenter.x] = 3;
    board[0][board.length - 4] = 2;
    // Bottom
    board[board.length - 1][3] = 2;
    board[board.length - 1][boardCenter.x] = 3;
    board[board.length - 1][board.length - 4] = 2;
    // Left
    board[3][0] = 2;
    board[boardCenter.x][0] = 3;
    board[board.length - 4][0] = 2;
    // Right
    board[3][board.length - 1] = 2;
    board[boardCenter.x][board.length - 1] = 3;
    board[board.length - 4][board.length - 1] = 2;
    /* ---------------------- Weird 3 side triangle things ---------------------- */
    // Top
    board[1][5] = 3;
    board[1][9] = 3;
    board[2][6] = 2;
    board[2][8] = 2;
    board[3][7] = 2;
    // Bottom
    board[board.length - 2][5] = 3;
    board[board.length - 2][9] = 3;
    board[board.length - 3][6] = 2;
    board[board.length - 3][8] = 2;
    board[board.length - 4][7] = 2;
    // Left
    board[5][1] = 3;
    board[9][1] = 3;
    board[6][2] = 2;
    board[8][2] = 2;
    board[7][3] = 2;
    // Right
    board[5][board.length - 2] = 3;
    board[9][board.length - 2] = 3;
    board[6][board.length - 3] = 2;
    board[8][board.length - 3] = 2;
    board[7][board.length - 4] = 2;
}
class Game {
    constructor() {
        /* ------------------------ Setting up initial board ------------------------ */
        const boardSize = 15;
        if (!(boardSize % 2))
            throw new Error(`Board size (${boardSize}) has to be an odd number!`);
        this.boardCenter = { x: (boardSize - 1) / 2, y: (boardSize - 1) / 2 };
        this.board = [...Array(boardSize)].map(() => [...Array(boardSize)].map(() => "empty"));
        this.board[this.boardCenter.y][this.boardCenter.x] = "center";
        initBoard(this.board);
        /* ------------------------------- Multiplayer ------------------------------ */
        this.latency = 0;
    }
    get coloredBoard() {
        return this.board.map(row => row.map(piece => Colors[piece]));
    }
    multiplierToWord(location) {
        const multiplier = this.board[location.y][location.x];
        if (multiplier === "center" || multiplier === "empty")
            return null;
        switch (multiplier) {
            case 2:
                return "Double";
            case 3:
                return "Triple";
            default:
                return null;
        }
    }
    /**
     * Logs board to console
     */
    log() {
        console.log(this.board.map(row => row.map(piece => (piece === "empty") ? "" : (piece === "center") ? "c" : piece)));
    }
}
const gameWritable = writable(new Game());
export { Game, gameWritable };
//# sourceMappingURL=game.js.map