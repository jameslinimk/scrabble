<script lang="ts">
    import { ioWritable } from "./io";

    let io = $ioWritable;

    let newUsername: string;
    function changeUsername() {
        if (!newUsername) return;
        io.emit("setUsername", newUsername, (error) => {
            console.log(error);
        });
    }

    function joinTest() {
        io.emit("joinRoom", "", (error) => {
            console.log(error);
        });
    }
</script>

<div>
    <input bind:value={newUsername} placeholder="New username" />
    <button on:click={changeUsername}> Change username </button>
    <br />
    <button on:click={joinTest}> Join Test </button>
</div>

<style>
</style>
