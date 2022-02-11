<script lang="ts">
    import { gameWritable } from "./game";
    import { ioWritable } from "./io";

    let io = $ioWritable;

    io.on("userJoin", (username) => {
        console.log("userJoin", username);
    });

    io.on("userLeft", (username) => {
        console.log("userLeft", username);
    });

    io.on("gameData", (exportedData) => {
        console.log("gameData", exportedData);
    });

    let newUsername: string;
    function changeUsername() {
        if (!newUsername) return;
        io.emit("setUsername", newUsername, (error) => {
            if (error) return console.error(error);
            console.log("set username to", newUsername);
            $gameWritable.username = newUsername;
        });
    }

    function joinTest() {
        io.emit("joinRoom", "", (error, exportedGame) => {
            if (error) return console.error(error);
            console.log("joined game", exportedGame);
            $gameWritable.gameId = exportedGame.id;
        });
    }
</script>

<div>
    Latency: {$gameWritable.latency}
    <br />
    <input bind:value={newUsername} placeholder="New username" />
    <button on:click={changeUsername}> Change username </button>
    Username: {$gameWritable.username}
    <br />
    <button on:click={joinTest}> Join Test </button>
    Game: {$gameWritable.gameId}
</div>

<style>
</style>
